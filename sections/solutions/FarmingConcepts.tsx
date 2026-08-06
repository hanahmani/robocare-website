'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckRow, IconChip } from '@/components/ui/Card';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { cn, pad2 } from '@/lib/utils';
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

      <Stagger className="mt-8 grid gap-[18px] lg:mt-14 lg:grid-cols-2">
        {SOLUTION_CONCEPTS.map(({ id, icon: Icon, ...concept }, index) => {
          const ocre = 'tone' in concept && concept.tone === 'ocre';
          const copy = items[id];

          return (
            <StaggerItem key={id}>
              <article
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-card border bg-white p-7 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:shadow-hover sm:p-9',
                  ocre ? 'border-forest-950/[0.08] hover:border-ocre-400/40' : 'border-forest-950/[0.08] hover:border-leaf-500/40',
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -start-10 -top-10 h-[220px] w-[220px] rounded-full blur-[70px] transition-opacity duration-500 ease-premium',
                    ocre ? 'bg-ocre-400/[0.08]' : 'bg-leaf-500/[0.08]',
                  )}
                />

                <span className="absolute end-7 top-7 font-mono text-[11px] tracking-[0.14em] text-ink-300 sm:end-9 sm:top-9">
                  {pad2(index)}
                </span>

                <header className="relative flex items-center gap-4">
                  <IconChip
                    tone={ocre ? 'ocre' : 'leaf'}
                    className={cn(
                      'h-14 w-14 rounded-[16px] ring-1 transition-transform duration-500 ease-premium group-hover:scale-105',
                      ocre ? 'ring-ocre-400/20' : 'ring-leaf-500/20',
                    )}
                  >
                    <Icon size={25} aria-hidden />
                  </IconChip>
                  <h3 className="pe-8 text-[21px] tracking-[-0.025em] lg:text-[24px]">{copy.title}</h3>
                </header>

                <p className="relative mt-5 text-[15px] leading-[1.7] text-ink-500">{copy.text}</p>
                <p className="relative mt-3.5 flex-1 text-[15px] leading-[1.7] text-ink-500">
                  {copy.text2}
                </p>

                <div
                  className={cn(
                    'relative mt-6 h-px bg-gradient-to-r to-transparent',
                    ocre ? 'from-ocre-400/25' : 'from-leaf-500/25',
                  )}
                />

                <ul className="relative mt-6 flex flex-col gap-2.5">
                  {copy.points.map((point) => (
                    <CheckRow key={point} tone={ocre ? 'ocre' : 'leaf'}>
                      {point}
                    </CheckRow>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
