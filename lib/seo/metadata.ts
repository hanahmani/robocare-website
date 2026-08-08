import type { Metadata } from 'next';
import { LOCALES, LOCALE_META, type Locale } from '@/i18n/config';
import { SITE } from '@/lib/data/site';

/**
 * Construction des métadonnées d'une page.
 *
 * Chaque langue vit sur sa propre URL (`/fr/…`, `/en/…`, `/ar/…`) : canonical
 * et `hreflang` pointent donc vers de vraies pages distinctes, pas vers des
 * variantes hypothétiques. `x-default` renvoie vers le français, la langue
 * par défaut du site.
 */

/** Chemin localisé, ex. `localizedPath('en', '/solutions')` → `/en/solutions`. */
function localizedPath(locale: Locale, path: string): string {
  return `/${locale}${path === '/' ? '' : path}`;
}

/**
 * Carte `hreflang → URL absolue` pour un chemin donné, prête pour
 * `alternates.languages` (Metadata API) — génère aussi `x-default`.
 */
export function languageAlternates(path: string): Record<string, string> {
  const entries = LOCALES.map((locale) => [
    LOCALE_META[locale].htmlLang,
    `${SITE.url}${localizedPath(locale, path)}`,
  ]);
  return {
    ...Object.fromEntries(entries),
    'x-default': `${SITE.url}${localizedPath('fr', path)}`,
  };
}

export type PageMetaInput = {
  /** Titre de la page — le template `%s · RoboCare` est appliqué par le layout. */
  title: string;
  description: string;
  /** Chemin absolu de la page, sans préfixe de langue, ex. `/solutions`. */
  path: string;
  locale: Locale;
  /** Nom de fichier dans `/public/og`, sans extension. */
  ogImage?: string;
  /** Texte alternatif de l'image sociale. */
  ogImageAlt: string;
  /** Titre complet pour les réseaux (sinon `title`). */
  socialTitle?: string;
  /**
   * Ignore le gabarit `%s · RoboCare` du layout.
   * Nécessaire sur l'accueil, dont le titre contient déjà la marque.
   */
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  ogImage = 'og-default',
  ogImageAlt,
  socialTitle,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const canonicalPath = localizedPath(locale, path);
  const url = `${SITE.url}${canonicalPath}`;
  const heading = socialTitle ?? title;
  const image = {
    url: `/og/${ogImage}.jpg`,
    width: 1200,
    height: 630,
    alt: ogImageAlt,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      title: heading,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: heading,
      description,
      images: [image.url],
    },
  };
}
