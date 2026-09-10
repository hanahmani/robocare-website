'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { TechnologyCard } from '@/components/ui/TechnologyCard';
import { VALUE_CHAIN_CARDS } from '@/lib/data/sustainability';

/** Chaîne de valeur agroalimentaire : quatre profils reliés par un filet de données. */
export function ValueChainSection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.valueChain.cards;

  return (
    <Section tone="sage">
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.valueChain.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.valueChain.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.valueChain.lead')}</p>
      </Reveal>

      <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_CHAIN_CARDS.map(({ id, icon }, index) => (
          <StaggerItem key={id} className="h-full">
            <TechnologyCard
              icon={icon}
              index={index}
              tone="light"
              title={cards[id].title}
              text={cards[id].text}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
