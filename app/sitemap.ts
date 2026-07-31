import type { MetadataRoute } from 'next';
import { NAV_ITEMS, SITE } from '@/lib/data/site';

/** Image sociale associée à chaque page (voir `/public/og`). */
const OG_IMAGES: Record<string, string> = {
  '/': 'og-default',
  '/solutions': 'og-solutions',
  '/plateforme': 'og-plateforme',
  '/technologie': 'og-technologie',
  '/about': 'og-about',
  '/impact': 'og-impact',
  '/contact': 'og-contact',
};

/**
 * Plan du site généré à partir de la navigation principale.
 *
 * Une seule URL par page : les trois langues sont servies sur la même adresse
 * (cookie de langue), il n'y a donc pas d'alternative `hreflang` à déclarer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return NAV_ITEMS.map((item) => {
    const home = item.href === '/';
    const image = OG_IMAGES[item.href];

    return {
      url: `${SITE.url}${home ? '' : item.href}`,
      lastModified: now,
      changeFrequency: home ? ('weekly' as const) : ('monthly' as const),
      priority: home ? 1 : 0.8,
      ...(image ? { images: [`${SITE.url}/og/${image}.jpg`] } : {}),
    };
  });
}
