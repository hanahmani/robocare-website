import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { TechnologyView } from '@/sections/technology/TechnologyView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.technology.meta.title,
    description: d.technology.meta.description,
    alternates: { canonical: '/technologie' },
  };
}

export default function Page() {
  return <TechnologyView />;
}
