import type { Metadata } from 'next';
import { LOCALE_META, type Locale } from '@/i18n/config';
import { SITE } from '@/lib/data/site';

/**
 * Construction des métadonnées d'une page.
 *
 * Le site sert les trois langues sur la **même URL** (la langue vient d'un
 * cookie, pas du chemin) : on ne déclare donc pas de `hreflang`, qui exigerait
 * une URL distincte par langue. On déclare en revanche la locale Open Graph
 * réellement rendue, le canonical et une image sociale par page.
 */

export type PageMetaInput = {
  /** Titre de la page — le template `%s · RoboCare` est appliqué par le layout. */
  title: string;
  description: string;
  /** Chemin absolu de la page, ex. `/solutions`. */
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
  const url = `${SITE.url}${path === '/' ? '' : path}`;
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
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      locale: LOCALE_META[locale].ogLocale,
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
