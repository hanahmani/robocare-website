import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getTranslation } from '@/i18n/getDictionary';
import { AboutView } from '@/sections/about/AboutView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo/schema';

const PATH = '/about';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { d } = getTranslation(raw);
  return buildPageMetadata({
    title: d.about.meta.title,
    description: d.about.meta.description,
    path: PATH,
    locale: raw,
    ogImage: 'og-about',
    ogImageAlt: d.about.hero.imageAlt,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { d } = getTranslation(locale);

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              title: d.about.meta.title,
              description: d.about.meta.description,
              path: PATH,
              locale,
            }),
            '@type': 'AboutPage',
          },
          breadcrumbSchema(locale, [
            { name: d.nav.home, path: '/' },
            { name: d.nav.about, path: PATH },
          ]),
        )}
      />
      <AboutView />
    </>
  );
}
