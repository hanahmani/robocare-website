import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { SolutionsView } from '@/sections/solutions/SolutionsView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.solutions.meta.title,
    description: d.solutions.meta.description,
    alternates: { canonical: '/solutions' },
  };
}

export default function Page() {
  return <SolutionsView />;
}
