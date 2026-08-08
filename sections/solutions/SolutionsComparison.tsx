'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { SOLUTIONS } from '@/lib/data/solutions';
import { cn } from '@/lib/utils';

/** Comparatif synthétique des quatre solutions, en cartes indépendantes. */
export function SolutionsComparison() {
  const { t, d } = useTranslation();
  const items = d.solutions.items;

  return (
    <Section>
      <SectionHeading eyebrow={t('solutions.comparison.eyebrow')} title={t('solutions.comparison.title')} />

      <div className="mt-10 -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
        <Stagger className="flex snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {SOLUTIONS.map((solution, index) => {
            const copy = items[solution.slug];
            const dark = index === 0;
            return (
              <StaggerItem
                key={solution.slug}
                className={cn(
                  'min-w-[78%] shrink-0 snap-start rounded-card border p-6 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1 hover:shadow-hover hover:ring-1 hover:ring-lime-500/20 sm:min-w-0 sm:shrink',
                  dark ? 'border-lime-500/20 bg-forest-900' : 'border-forest-950/[0.08] bg-white',
                )}
              >
                <p
                  className={cn(
                    'font-mono text-[10.5px] uppercase tracking-[0.16em]',
                    dark ? 'text-lime-500' : solution.tone === 'ocre' ? 'text-ocre-600' : 'text-leaf-600',
                  )}
                >
                  {copy.brand}
                </p>
                <p className={cn('mt-3.5 text-[14.5px] leading-[1.6]', dark ? 'text-white/80' : 'text-ink-500')}>
                  {copy.points.slice(0, 3).join(' · ')}
                </p>
                <p className={cn('mt-4 font-display text-[26px]', dark ? 'text-lime-500' : 'text-leaf-600')}>
                  {copy.metric}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
        {t('solutions.comparison.note')}
      </p>
    </Section>
  );
}
