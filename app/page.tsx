import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { HomeView } from '@/sections/home/HomeView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.home.meta.title,
    description: d.home.meta.description,
    alternates: { canonical: '/' },
  };
}

export default function Page() {
  return <HomeView />;
}
