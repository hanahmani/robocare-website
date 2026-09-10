'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Card, IconChip } from '@/components/ui/Card';
import { WHY_SUSTAINABILITY_CARDS } from '@/lib/data/sustainability';

/** Contexte : pourquoi la durabilité compte pour l'agriculture, puis quatre piliers. */
export function WhySustainability() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.why.cards;

  return (
    <Section>
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.why.eyebrow')}</p>
        <h2 className="mt-4 text-h2">{t('sustainability.why.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.why.lead1')}</p>
        <p className="mt-3.5 text-body text-ink-500">{t('sustainability.why.lead2')}</p>
      </Reveal>

      <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_SUSTAINABILITY_CARDS.map(({ id, icon: Icon, tone }) => (
          <StaggerItem key={id} className="h-full">
            <Card interactive>
              <IconChip tone={tone}>
                <Icon size={22} aria-hidden />
              </IconChip>
              <h3 className="mt-5 text-[18px]">{cards[id].title}</h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-ink-400">{cards[id].text}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
