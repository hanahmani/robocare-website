import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { AboutView } from '@/sections/about/AboutView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo/schema';

const PATH = '/about';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.about.meta.title,
    description: d.about.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-about',
    ogImageAlt: d.about.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.about.meta.title,
            description: d.about.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.about, path: PATH },
          ]),
        )}
      />
      <AboutView />
    </>
  );
}
