'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { ConceptCard } from '@/sections/solutions/ConceptCard';
import { SOLUTION_CONCEPTS } from '@/lib/data/solutions';

/**
 * « Les fondamentaux » — bloc pédagogique de la page Solutions.
 *
 * Explique les briques agronomiques et techniques sur lesquelles reposent les
 * quatre solutions présentées plus haut : agriculture de précision, satellite,
 * IoT, drone, IA et irrigation intelligente.
 */
export function FarmingConcepts() {
  const { t, d } = useTranslation();
  const items = d.solutions.concepts.items;

  return (
    <Section tone="cream" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-32 top-0 h-[420px] w-[420px] rounded-full bg-lime-500/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 bottom-0 h-[320px] w-[320px] rounded-full bg-leaf-500/[0.06] blur-[110px]"
      />

      <SectionHeading
        eyebrow={t('solutions.concepts.eyebrow')}
        title={t('solutions.concepts.title')}
        subtitle={t('solutions.concepts.lead')}
      />

      <div className="relative mt-12 lg:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-forest-950/[0.08] lg:block"
        />
        <Stagger className="grid gap-6 sm:gap-7 lg:grid-cols-2 lg:items-stretch">
          {SOLUTION_CONCEPTS.map(({ id, icon, ...concept }, index) => {
            const tone = 'tone' in concept && concept.tone === 'ocre' ? 'ocre' : 'leaf';
            return (
              <StaggerItem key={id} className="h-full">
                <ConceptCard icon={icon} tone={tone} index={index} copy={items[id]} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
