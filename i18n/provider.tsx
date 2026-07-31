'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  getDirection,
  resolveLocale,
  type Direction,
  type Locale,
} from '@/i18n/config';
import { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
import { createTranslator, type Translator } from '@/i18n/translate';

type I18nContextValue = {
  /** Langue active. */
  locale: Locale;
  /** Change la langue : contenu, direction et `<html>` sont mis à jour sans rechargement. */
  setLocale: (locale: Locale) => void;
  /** Sens de lecture de la langue active. */
  dir: Direction;
  /** Raccourci `dir === 'rtl'`, utile pour inverser les animations. */
  isRtl: boolean;
  /** Dictionnaire complet et typé : `d.nav.home`. */
  d: Dictionary;
  /** Traduction par chemin : `t('nav.home')`, `t('footer.rights', { year })`. */
  t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/** Écrit la langue dans un cookie pour que le SSR rende le bon `lang` / `dir`. */
function persistCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}

/** Applique la langue à l'élément `<html>` (SEO, sélecteurs CSS, variantes `rtl:`). */
function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = LOCALE_META[locale].htmlLang;
  root.dir = getDirection(locale);
}

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  /** Langue résolue côté serveur : garantit un HTML initial déjà traduit. */
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Première hydratation : le choix mémorisé dans localStorage fait autorité.
  useEffect(() => {
    const stored = resolveLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
    if (stored !== initialLocale) {
      setLocaleState(stored);
      persistCookie(stored);
    }
    applyDocumentLocale(stored);
    // Volontairement exécuté une seule fois, au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState((current) => {
      if (current === next) return current;
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      persistCookie(next);
      applyDocumentLocale(next);
      return next;
    });
  }, []);

  // Synchronise les autres onglets ouverts sur le même site.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCALE_STORAGE_KEY) return;
      const next = resolveLocale(event.newValue);
      setLocaleState(next);
      applyDocumentLocale(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dir = getDirection(locale);
    return {
      locale,
      setLocale,
      dir,
      isRtl: dir === 'rtl',
      d: DICTIONARIES[locale],
      t: createTranslator(locale),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Accès aux traductions depuis n'importe quel Client Component. */
export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation() doit être utilisé à l’intérieur de <I18nProvider>.');
  }
  return context;
}

/** Variante allégée quand seule la direction est nécessaire. */
export function useDirection(): { dir: Direction; isRtl: boolean } {
  const { dir, isRtl } = useTranslation();
  return { dir, isRtl };
}
