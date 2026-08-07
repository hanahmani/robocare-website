import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getTranslation } from '@/i18n/getDictionary';
import { HomeView } from '@/sections/home/HomeView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema, graph, softwareApplicationSchema, webPageSchema } from '@/lib/seo/schema';
import { HOME_FAQ } from '@/lib/data/home';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { d } = getTranslation(raw);
  return buildPageMetadata({
    title: d.home.meta.title,
    description: d.home.meta.description,
    path: '/',
    locale: raw,
    ogImage: 'og-default',
    ogImageAlt: d.home.hero.titleLead,
    // Le titre d'accueil contient déjà « RoboCare » : on neutralise le gabarit.
    absoluteTitle: true,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { d } = getTranslation(locale);

  const faq = HOME_FAQ.map((id) => ({
    question: d.home.faq.items[id].question,
    answer: d.home.faq.items[id].answer,
  }));

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            title: d.home.meta.title,
            description: d.home.meta.description,
            path: '/',
            locale,
            // L'accueil n'a pas de fil d'Ariane, mais expose sa FAQ.
            hasBreadcrumb: false,
            hasFaq: true,
          }),
          softwareApplicationSchema(d),
          // La FAQ est réellement affichée sur la page : le balisage la reflète.
          faqSchema(locale, '/', faq),
        )}
      />
      <HomeView />
    </>
  );
}
