'use client';

import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';

/** Page « Durabilité » — contenu à venir. */
export function SustainabilityView() {
  const { t } = useTranslation();

  return (
    <PageHero
      eyebrow={t('sustainability.hero.eyebrow')}
      title={t('sustainability.hero.title')}
      intro={t('sustainability.hero.intro')}
      image="/hero/platforme.png"
      imageAlt={t('sustainability.hero.imageAlt')}
      crumbs={[{ labelKey: 'nav.sustainability' }]}
    />
  );
}
