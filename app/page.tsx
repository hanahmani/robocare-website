import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { HomeView } from '@/sections/home/HomeView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqSchema, graph, softwareApplicationSchema, webPageSchema } from '@/lib/seo/schema';
import { HOME_FAQ } from '@/lib/data/home';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.home.meta.title,
    description: d.home.meta.description,
    path: '/',
    locale,
    ogImage: 'og-default',
    ogImageAlt: d.home.hero.titleLead,
    // Le titre d'accueil contient déjà « RoboCare » : on neutralise le gabarit.
    absoluteTitle: true,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

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
          }),
          softwareApplicationSchema(d),
          // La FAQ est réellement affichée sur la page : le balisage la reflète.
          faqSchema(faq),
        )}
      />
      <HomeView />
    </>
  );
}
