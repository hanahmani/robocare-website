'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn, pad2 } from '@/lib/utils';
import { WATER_STEPS } from '@/lib/data/sustainability';

/** L'eau : introduction et parcours de décision en quatre étapes. */
export function WaterSection() {
  const { t, d } = useTranslation();
  const steps = d.sustainability.water.steps;
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(WATER_STEPS.length - 1);

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="min-w-0">
          <p className="eyebrow text-leaf-600">{t('sustainability.water.eyebrow')}</p>
          <h2 className="mt-4 max-w-[620px] text-h2-alt">{t('sustainability.water.title')}</h2>
          <div className="mt-5 max-w-[610px] space-y-3.5 text-body text-ink-500">
            <p>{t('sustainability.water.lead1')}</p>
            <p>{t('sustainability.water.lead2')}</p>
          </div>
        </Reveal>

        <Reveal from="right" className="min-w-0">
          <div className="rounded-panel border border-forest-950/[0.08] bg-sage-50 p-6 shadow-soft sm:p-8">
            <div aria-hidden className="flex h-20 items-center justify-center sm:h-24">
              <motion.div
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="grid h-14 w-14 place-items-center rounded-full border border-sage-200 bg-white"
              >
                <Droplet size={31} strokeWidth={1.6} className="text-leaf-500" />
              </motion.div>
            </div>

            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {WATER_STEPS.map(({ id }, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.li
                    key={id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.08, duration: 0.38, ease: 'easeOut' }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-field border px-4 py-4 text-left text-[14.5px] leading-[1.4] transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2',
                        isActive
                          ? 'border-forest-900 bg-forest-900 text-white shadow-soft'
                          : 'border-forest-950/[0.06] bg-white text-ink-700 hover:border-sage-300',
                      )}
                      whileHover={reduced ? undefined : { y: -2 }}
                      whileTap={reduced ? undefined : { scale: 0.995 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <span
                        dir="ltr"
                        className={cn(
                          'font-mono text-[11px] tracking-[0.08em] tabular-nums',
                          isActive ? 'text-lime-400' : 'text-leaf-600',
                        )}
                      >
                        {pad2(index + 1)}
                      </span>
                      <span className={isActive ? 'font-semibold' : 'font-medium'}>{steps[id]}</span>
                      {isActive ? (
                        <motion.span
                          layoutId="active-water-step"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-400"
                          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                        />
                      ) : null}
                    </motion.button>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
