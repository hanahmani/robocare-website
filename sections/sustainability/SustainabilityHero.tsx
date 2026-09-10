'use client';

import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { SUSTAINABILITY_HERO_CHIPS } from '@/lib/data/sustainability';

/**
 * Hero de la page Durabilité : image satellite, titre, deux actions et une
 * liste d'indicateurs techniques suivis par la plateforme.
 */
export function SustainabilityHero() {
  const { t, d } = useTranslation();
  const chips = d.sustainability.hero.chips;

  return (
    <PageHero
      eyebrow={t('sustainability.hero.eyebrow')}
      title={t('sustainability.hero.title')}
      intro={t('sustainability.hero.intro')}
      image="/hero/durabilite.jpg"
      imageAlt={t('sustainability.hero.imageAlt')}
      crumbs={[{ labelKey: 'nav.sustainability' }]}
      actions={
        <>
          <Button href="#approche" variant="lime" size="lg">
            {t('sustainability.hero.ctaApproach')}
          </Button>
          <Button href="/about" variant="outline-light" size="lg">
            {t('sustainability.hero.ctaAbout')}
          </Button>
        </>
      }
    >
      <Stagger as="ul" stagger={0.05} className="m-0 flex list-none flex-wrap gap-2.5 p-0">
        {SUSTAINABILITY_HERO_CHIPS.map((id) => (
          <StaggerItem
            key={id}
            as="li"
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/80"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
            {chips[id]}
          </StaggerItem>
        ))}
      </Stagger>
    </PageHero>
  );
}
