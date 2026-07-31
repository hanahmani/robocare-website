import type { Metadata } from 'next';
import { getTranslation } from '@/i18n/getDictionary';
import { PlatformView } from '@/sections/platform/PlatformView';

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getTranslation();
  return {
    title: d.platform.meta.title,
    description: d.platform.meta.description,
    alternates: { canonical: '/plateforme' },
  };
}

export default function Page() {
  return <PlatformView />;
}
