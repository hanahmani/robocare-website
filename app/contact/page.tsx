import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { ContactView } from '@/sections/contact/ContactView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.contact.meta.title,
    description: d.contact.meta.description,
    alternates: { canonical: '/contact' },
  };
}

export default function Page() {
  return <ContactView />;
}
