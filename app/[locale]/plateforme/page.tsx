import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getTranslation } from '@/i18n/getDictionary';
import { PlatformView } from '@/sections/platform/PlatformView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, graph, softwareApplicationSchema, webPageSchema } from '@/lib/seo/schema';

const PATH = '/plateforme';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { d } = getTranslation(raw);
  return buildPageMetadata({
    title: d.platform.meta.title,
    description: d.platform.meta.description,
    path: PATH,
    locale: raw,
    ogImage: 'og-plateforme',
    ogImageAlt: d.platform.hero.imageAlt,
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
          webPageSchema({
            title: d.platform.meta.title,
            description: d.platform.meta.description,
            path: PATH,
            locale,
          }),
          breadcrumbSchema(locale, [
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
