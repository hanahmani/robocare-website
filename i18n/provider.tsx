'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { getDirection, type Direction, type Locale } from '@/i18n/config';
import { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
import { createTranslator, type Translator } from '@/i18n/translate';

type I18nContextValue = {
  /** Langue active — dérivée de l'URL, jamais mutée côté client. */
  locale: Locale;
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

/**
 * Fournit la traduction à tout l'arbre client, à partir de la langue résolue
 * côté serveur par `app/[locale]/layout.tsx`.
 *
 * Changer de langue est désormais une navigation (`<Link href="/en/...">`),
 * pas une mutation d'état : ce provider n'a donc plus de `setLocale`. Il se
 * remonte simplement avec la nouvelle valeur quand l'URL change.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nContextValue>(() => {
    const dir = getDirection(locale);
    return {
      locale,
      dir,
      isRtl: dir === 'rtl',
      d: DICTIONARIES[locale],
      t: createTranslator(locale),
    };
  }, [locale]);

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
