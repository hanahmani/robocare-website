'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SOLUTIONS } from '@/lib/data/solutions';
import { cn } from '@/lib/utils';

/** Un accent de couleur par colonne — décoratif, propre à ce tableau. */
const COLUMN_ACCENTS = ['#4D9E2F', '#3F9C4A', '#1F8F7A', '#1C7A3C'];

/** Comparatif synthétique des quatre solutions, en tableau filaire à quatre colonnes. */
export function SolutionsComparison() {
  const { t, d } = useTranslation();
  const items = d.solutions.items;
  const reduced = usePrefersReducedMotion();

  return (
    <Section>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 className="max-w-[16ch] text-h2">{t('solutions.comparison.title')}</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="max-w-[46ch] text-[15px] leading-[1.6] text-ink-500 lg:text-end">
            Quatre cultures, quatre priorités de mesure. Le chiffre en tête de colonne indique
            l&apos;évolution mesurée par la solution correspondante.
          </p>
        </Reveal>
      </div>

      {/* Quatre colonnes tiennent à partir de `sm`. En dessous, elles se
          replient en 2 x 2 plutôt que d'imposer un défilement horizontal de
          760px sur un écran de 320. */}
      <div className="mt-10">
        <Stagger className="grid grid-cols-2 gap-0 sm:grid-cols-4">
          {SOLUTIONS.map((solution, index) => {
            const copy = items[solution.slug];
            const accent = COLUMN_ACCENTS[index % COLUMN_ACCENTS.length];
            return (
              <StaggerItem
                key={solution.slug}
                className={cn(
                  'group min-w-0',
                  // Séparateurs de la grille repliée : filet vertical sur la
                  // colonne de droite, filet horizontal sur la seconde rangée.
                  index % 2 === 1 && 'border-s border-s-forest-950/[0.08]',
                  index >= 2 && 'border-t border-t-forest-950/[0.08] sm:border-t-0',
                  index > 0 && 'sm:border-s sm:border-s-forest-950/[0.08]',
                )}
              >
                <div className="relative px-3.5 py-5 transition-transform duration-slow ease-premium group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 sm:px-5 sm:py-6">
                  <span aria-hidden className="absolute inset-x-0 top-0 block h-[2px] overflow-hidden">
                    <motion.span
                      className="block h-full origin-left"
                      style={{ background: accent }}
                      initial={reduced ? undefined : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
                    />
                  </span>

                  <p className="text-[16px] font-semibold text-ink-900">{copy.brand}</p>

                  <p
                    className="mt-4 font-display text-[26px] font-semibold tracking-[-0.02em] transition-colors duration-slow ease-premium sm:text-[32px]"
                    style={{ color: accent }}
                  >
                    {copy.metric}
                  </p>

                  <div className="mt-5 divide-y divide-forest-950/[0.08] border-t border-forest-950/[0.08]">
                    {copy.points.map((point) => (
                      <p key={point} className="py-3 text-[13.5px] leading-[1.55] text-ink-500">
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
        {t('solutions.comparison.note')}
      </p>
    </Section>
  );
}
