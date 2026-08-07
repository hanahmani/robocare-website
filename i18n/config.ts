/**
 * Configuration i18n — source de vérité unique des langues du site.
 * Ajouter une langue = ajouter une entrée ici + un fichier dans `/messages`.
 */

export const LOCALES = ['fr', 'en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = 'ltr' | 'rtl';

/** Langue servie quand l'URL ne permet pas de trancher (`/`, chemins hérités). */
export const DEFAULT_LOCALE: Locale = 'fr';

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
 * Normalise une valeur quelconque (segment d'URL, `navigator.language`…)
 * en langue supportée. Retombe sur la langue par défaut.
 */
export function resolveLocale(value: string | null | undefined): Locale {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase().split('-')[0];
  return isLocale(normalized) ? normalized : DEFAULT_LOCALE;
}

/**
 * Préfixe un chemin interne par la langue courante (`/solutions` → `/fr/solutions`).
 * Laisse intacts les ancres (`#etudes`), les liens externes et `mailto:`/`tel:` :
 * l'URL est la seule source de vérité de la langue, ce préfixe est donc la
 * seule opération qui la fait exister dans un `href`.
 */
export function localizePath(locale: Locale, href: string): string {
  if (/^(#|[a-z][a-z0-9+.-]*:)/i.test(href)) return href;
  if (!href.startsWith('/')) return href;
  return `/${locale}${href === '/' ? '' : href}`;
}

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`);

/**
 * Opération inverse : retire le préfixe de langue d'un chemin
 * (`/fr/solutions` → `/solutions`). Sert à comparer `usePathname()` — qui
 * inclut toujours la langue — à des `href` de données qui n'en ont pas
 * (lien actif de la nav, sélecteur de langue).
 */
export function stripLocale(pathname: string): string {
  const rest = pathname.replace(LOCALE_PREFIX, '');
  return rest === '' ? '/' : rest;
}
