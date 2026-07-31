import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { ImpactView } from '@/sections/impact/ImpactView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo/schema';

const PATH = '/impact';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.impact.meta.title,
    description: d.impact.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-impact',
    ogImageAlt: d.impact.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.impact.meta.title,
            description: d.impact.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.impact, path: PATH },
          ]),
        )}
      />
      <ImpactView />
    </>
  );
}
