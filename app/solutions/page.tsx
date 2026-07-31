import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { SolutionsView } from '@/sections/solutions/SolutionsView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from '@/lib/seo/schema';
import { SOLUTIONS } from '@/lib/data/solutions';

const PATH = '/solutions';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.solutions.meta.title,
    description: d.solutions.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-solutions',
    ogImageAlt: d.solutions.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.solutions.meta.title,
            description: d.solutions.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.solutions, path: PATH },
          ]),
          // Une entité Service par culture suivie.
          ...SOLUTIONS.map((solution) =>
            serviceSchema({
              slug: solution.slug,
              name: d.solutions.items[solution.slug].brand,
              description: d.solutions.items[solution.slug].short,
            }),
          ),
        )}
      />
      <SolutionsView />
    </>
  );
}
