import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { PlatformView } from '@/sections/platform/PlatformView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, softwareApplicationSchema, webPageSchema } from '@/lib/seo/schema';

const PATH = '/plateforme';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.platform.meta.title,
    description: d.platform.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-plateforme',
    ogImageAlt: d.platform.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.platform.meta.title,
            description: d.platform.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.platform, path: PATH },
          ]),
          softwareApplicationSchema(d),
        )}
      />
      <PlatformView />
    </>
  );
}
