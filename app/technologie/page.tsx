import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { TechnologyView } from '@/sections/technology/TechnologyView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo/schema';

const PATH = '/technologie';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.technology.meta.title,
    description: d.technology.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-technologie',
    ogImageAlt: d.technology.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.technology.meta.title,
            description: d.technology.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.technology, path: PATH },
          ]),
        )}
      />
      <TechnologyView />
    </>
  );
}
