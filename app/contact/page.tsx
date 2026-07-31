import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { ContactView } from '@/sections/contact/ContactView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/seo/schema';
import { CONTACT_FAQ } from '@/lib/data/about';

const PATH = '/contact';

export async function generateMetadata(): Promise<Metadata> {
  const { d, locale } = await getTranslation();
  return buildPageMetadata({
    title: d.contact.meta.title,
    description: d.contact.meta.description,
    path: PATH,
    locale,
    ogImage: 'og-contact',
    ogImageAlt: d.contact.hero.imageAlt,
  });
}

export default async function Page() {
  const { d, locale } = await getTranslation();

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
            }),
            '@type': 'ContactPage',
          },
          breadcrumbSchema([
            { name: d.nav.home, path: '/' },
            { name: d.nav.contact, path: PATH },
          ]),
          faqSchema(faq),
        )}
      />
      <ContactView />
    </>
  );
}
