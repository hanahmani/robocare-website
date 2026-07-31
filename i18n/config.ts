/**
 * Configuration i18n — source de vérité unique des langues du site.
 * Ajouter une langue = ajouter une entrée ici + un fichier dans `/messages`.
 */

export const LOCALES = ['fr', 'en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = 'ltr' | 'rtl';

/** Langue servie par défaut (première visite, cookie absent). */
export const DEFAULT_LOCALE: Locale = 'fr';

/** Cookie lu côté serveur pour rendre `<html lang dir>` correctement dès le SSR. */
export const LOCALE_COOKIE = 'robocare_locale';

/** Clé localStorage : mémorise le choix de l'utilisateur d'une visite à l'autre. */
export const LOCALE_STORAGE_KEY = 'robocare.locale';

/** Durée de vie du cookie de langue (1 an, en secondes). */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleMeta = {
  /** Libellé court affiché dans le sélecteur. */
  code: string;
  /** Nom natif de la langue (aria-label, menu mobile). */
  name: string;
  /** Sens de lecture. */
  dir: Direction;
  /** Valeur de l'attribut `lang` / `hreflang`. */
  htmlLang: string;
  /** Locale Open Graph. */
  ogLocale: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fr: { code: 'FR', name: 'Français', dir: 'ltr', htmlLang: 'fr', ogLocale: 'fr_TN' },
  en: { code: 'EN', name: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  ar: { code: 'AR', name: 'العربية', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_TN' },
};

/** Garde de type : vrai uniquement pour une langue supportée. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Sens de lecture associé à une langue. */
export function getDirection(locale: Locale): Direction {
  return LOCALE_META[locale].dir;
}

/** Vrai si la langue s'écrit de droite à gauche. */
export function isRtlLocale(locale: Locale): boolean {
  return getDirection(locale) === 'rtl';
}

/**
 * Normalise une valeur quelconque (cookie, localStorage, `navigator.language`)
 * en langue supportée. Retombe sur la langue par défaut.
 */
export function resolveLocale(value: string | null | undefined): Locale {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase().split('-')[0];
  return isLocale(normalized) ? normalized : DEFAULT_LOCALE;
}
