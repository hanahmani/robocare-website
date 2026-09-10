'use client';

import { motion } from 'framer-motion';
import { Droplet, Leaf } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn, pad2 } from '@/lib/utils';
import { WATER_STEPS } from '@/lib/data/sustainability';

const MORPH_TIMES = [0, 0.36, 0.5, 0.86, 1] as const;

/** L'eau : texte d'intro puis chaîne de décision en 4 étapes, avec un pictogramme goutte → feuille. */
export function WaterSection() {
  const { t, d } = useTranslation();
  const steps = d.sustainability.water.steps;
  const reduced = usePrefersReducedMotion();

  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <Reveal className="min-w-0">
          <p className="eyebrow text-leaf-600">{t('sustainability.water.eyebrow')}</p>
          <h2 className="mt-4 text-h2-alt">{t('sustainability.water.title')}</h2>
          <p className="mt-5 text-body text-ink-500">{t('sustainability.water.lead1')}</p>
          <p className="mt-3.5 text-body text-ink-500">{t('sustainability.water.lead2')}</p>
        </Reveal>

        <Reveal from="right" className="min-w-0">
          <div className="flex flex-col gap-5 rounded-panel border border-forest-950/[0.08] bg-sage-50 p-7 sm:p-9">
            <div aria-hidden className="relative flex h-24 items-center justify-center">
              {reduced ? (
                <Droplet size={60} strokeWidth={1.4} className="text-leaf-500" />
              ) : (
                <>
                  <motion.div
                    className="absolute"
                    animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1, 0.86, 0.86, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: MORPH_TIMES }}
                  >
                    <Droplet size={60} strokeWidth={1.4} className="text-leaf-500" />
                  </motion.div>
                  <motion.div
                    className="absolute"
                    animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.86, 0.86, 1, 1, 0.86] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: MORPH_TIMES }}
                  >
                    <Leaf size={60} strokeWidth={1.4} className="text-leaf-600" />
                  </motion.div>
                </>
              )}
            </div>

            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {WATER_STEPS.map(({ id, featured }, index) => (
                <li
                  key={id}
                  className={cn(
                    'flex items-center gap-4 rounded-field px-4 py-4 text-[14.5px] leading-[1.4]',
                    featured
                      ? 'bg-forest-900 text-white'
                      : 'border border-forest-950/[0.06] bg-white text-ink-700',
                  )}
                >
                  <span
                    dir="ltr"
                    className={cn(
                      'font-mono text-[11px] tracking-[0.08em] tabular-nums',
                      featured ? 'text-lime-500' : 'text-leaf-600',
                    )}
                  >
                    {pad2(index)}
                  </span>
                  <span className={featured ? 'font-semibold' : undefined}>{steps[id]}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
