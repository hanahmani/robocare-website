import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { getTranslation } from '@/i18n/getDictionary';
import { ContactView } from '@/sections/contact/ContactView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/seo/schema';
import { CONTACT_FAQ } from '@/lib/data/about';

const PATH = '/contact';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { d } = getTranslation(raw);
  return buildPageMetadata({
    title: d.contact.meta.title,
    description: d.contact.meta.description,
    path: PATH,
    locale: raw,
    ogImage: 'og-contact',
    ogImageAlt: d.contact.hero.imageAlt,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const { d } = getTranslation(locale);

  const faq = CONTACT_FAQ.map((id) => ({
    question: d.contact.faq.items[id].question,
    answer: d.contact.faq.items[id].answer,
  }));

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              title: d.contact.meta.title,
              description: d.contact.meta.description,
              path: PATH,
              locale,
              hasFaq: true,
            }),
            '@type': 'ContactPage',
          },
          breadcrumbSchema(locale, [
            { name: d.nav.home, path: '/' },
            { name: d.nav.contact, path: PATH },
          ]),
          faqSchema(locale, PATH, faq),
        )}
      />
      <ContactView />
    </>
  );
}
