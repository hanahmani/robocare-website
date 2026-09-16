import type { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';
import { languageAlternates } from '@/lib/seo/metadata';
import { NAV_ITEMS, SITE } from '@/lib/data/site';

/** Image sociale associée à chaque page (voir `/public/og`). */
const OG_IMAGES: Record<string, string> = {
  '/': 'og-default',
  '/solutions': 'og-solutions',
  '/technologie': 'og-technologie',
  '/about': 'og-about',
  '/impact': 'og-impact',
  '/contact': 'og-contact',
};

/**
 * Plan du site : une entrée par page **et par langue** (7 pages × 3 langues),
 * chacune portant ses propres `hreflang` (`alternates.languages`) vers les
 * deux autres versions — le pendant, côté sitemap, des balises `<link
 * rel="alternate">` posées dans le `<head>` de chaque page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return NAV_ITEMS.flatMap((item) => {
    const home = item.href === '/';
    const image = OG_IMAGES[item.href];
    const languages = languageAlternates(item.href);

    return LOCALES.map((locale) => ({
      url: `${SITE.url}/${locale}${home ? '' : item.href}`,
      lastModified: now,
      changeFrequency: home ? ('weekly' as const) : ('monthly' as const),
      priority: home ? 1 : 0.8,
      alternates: { languages },
      ...(image ? { images: [`${SITE.url}/og/${image}.jpg`] } : {}),
    }));
  });
}
