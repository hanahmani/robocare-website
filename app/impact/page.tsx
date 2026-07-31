import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { ImpactView } from '@/sections/impact/ImpactView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.impact.meta.title,
    description: d.impact.meta.description,
    alternates: { canonical: '/impact' },
  };
}

export default function Page() {
  return <ImpactView />;
}
