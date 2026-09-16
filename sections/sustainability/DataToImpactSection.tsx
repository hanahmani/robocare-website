'use client';

import { useDirection, useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Pill } from '@/components/ui/Card';
import { DATA_TO_IMPACT_CHAIN } from '@/lib/data/sustainability';

/** Chaîne « de la donnée à l'impact » : une pilule par jalon, la dernière mise en avant. */
export function DataToImpactSection() {
  const { t, d } = useTranslation();
  const { isRtl } = useDirection();
  const chain = d.sustainability.dataToImpact.chain;
  const lastIndex = DATA_TO_IMPACT_CHAIN.length - 1;

  return (
    <Section tone="sage">
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.dataToImpact.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.dataToImpact.title')}</h2>
      </Reveal>

      <Stagger stagger={0.05} className="mt-section-gap flex flex-wrap items-center gap-2.5">
        {DATA_TO_IMPACT_CHAIN.map((id, index) => {
          const isLast = index === lastIndex;
          return (
            <StaggerItem key={id} className="flex items-center gap-2.5">
              {isLast ? (
                <span className="inline-flex items-center rounded-full border border-leaf-500/40 bg-forest-900 px-3.5 py-2 text-[13px] font-bold text-lime-500">
                  {chain[id]}
                </span>
              ) : (
                <Pill tone="muted">{chain[id]}</Pill>
              )}
              {!isLast ? (
                <span aria-hidden className="text-[15px] text-ink-300">
                  {isRtl ? '←' : '→'}
                </span>
              ) : null}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
