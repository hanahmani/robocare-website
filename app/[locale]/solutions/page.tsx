import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getTranslation } from '@/i18n/getDictionary';
import { SolutionsView } from '@/sections/solutions/SolutionsView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  softwareApplicationSchema,
  webPageSchema,
} from '@/lib/seo/schema';
import { SOLUTIONS, SOLUTIONS_FAQ } from '@/lib/data/solutions';

const PATH = '/solutions';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { d } = getTranslation(raw);
  return buildPageMetadata({
    title: d.solutions.meta.title,
    description: d.solutions.meta.description,
    path: PATH,
    locale: raw,
    ogImage: 'og-solutions',
    ogImageAlt: d.solutions.hero.imageAlt,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { d } = getTranslation(locale);

  const faq = SOLUTIONS_FAQ.map((id) => ({
    question: d.solutions.faq.items[id].question,
    answer: d.solutions.faq.items[id].answer,
  }));

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              title: d.solutions.meta.title,
              description: d.solutions.meta.description,
              path: PATH,
              locale,
              hasFaq: true,
            }),
            // Liste de fiches solutions : le type le plus précis pour cette page.
            '@type': 'CollectionPage',
          },
          breadcrumbSchema(locale, [
            { name: d.nav.home, path: '/' },
            { name: d.nav.solutions, path: PATH },
          ]),
          // Une entité Service par culture suivie.
          ...SOLUTIONS.map((solution) =>
            serviceSchema(d, locale, {
              slug: solution.slug,
              name: d.solutions.items[solution.slug].brand,
              description: d.solutions.items[solution.slug].short,
            }),
          ),
          // La FAQ est réellement affichée sur la page : le balisage la reflète.
          faqSchema(locale, PATH, faq),
          // La page présente aussi l'application (captures, modules, architecture).
          softwareApplicationSchema(d),
        )}
      />
      <SolutionsView />
    </>
  );
}
