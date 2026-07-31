import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { AboutView } from '@/sections/about/AboutView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.about.meta.title,
    description: d.about.meta.description,
    alternates: { canonical: '/about' },
  };
}

export default function Page() {
  return <AboutView />;
}
