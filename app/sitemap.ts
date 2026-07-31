import type { MetadataRoute } from 'next';
import { NAV_ITEMS, SITE } from '@/lib/data/site';

/** Plan du site généré à partir de la navigation principale. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return NAV_ITEMS.map((item) => ({
    url: `${SITE.url}${item.href === '/' ? '' : item.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.8,
  }));
}
