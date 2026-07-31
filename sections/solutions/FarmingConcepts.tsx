'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckRow, IconChip } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
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
    <Section tone="cream">
      <SectionHeading
        eyebrow={t('solutions.concepts.eyebrow')}
        title={t('solutions.concepts.title')}
        subtitle={t('solutions.concepts.lead')}
      />

      <div className="mt-8 grid gap-[18px] lg:mt-14 lg:grid-cols-2">
        {SOLUTION_CONCEPTS.map(({ id, icon: Icon, ...concept }, index) => {
          const ocre = 'tone' in concept && concept.tone === 'ocre';
          const copy = items[id];

          return (
            <Reveal key={id} delay={(index % 2) * 0.08}>
              <article className="flex h-full flex-col rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:shadow-hover sm:p-9">
                <header className="flex items-start gap-4">
                  <IconChip tone={ocre ? 'ocre' : 'leaf'} className="h-12 w-12">
                    <Icon size={23} aria-hidden />
                  </IconChip>
                  <h3 className="mt-1.5 text-[21px] tracking-[-0.025em] lg:text-[24px]">
                    {copy.title}
                  </h3>
                </header>

                <p className="mt-5 text-[15px] leading-[1.7] text-ink-500">{copy.text}</p>
                <p className="mt-3.5 flex-1 text-[15px] leading-[1.7] text-ink-500">
                  {copy.text2}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {copy.points.map((point) => (
                    <CheckRow key={point} tone={ocre ? 'ocre' : 'leaf'}>
                      {point}
                    </CheckRow>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
