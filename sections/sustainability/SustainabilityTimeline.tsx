'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Card } from '@/components/ui/Card';
import { cn, pad2 } from '@/lib/utils';
import { APPROACH_STEPS } from '@/lib/data/sustainability';

const STEP_COUNT = APPROACH_STEPS.length;

/**
 * Parcours en cinq étapes (observer → mesurer), relié par un rail qui se
 * remplit au fil du défilement — chaque segment se colore quand le lecteur
 * atteint l'étape correspondante, au lieu d'un simple fondu statique.
 */
export function SustainabilityTimeline() {
  const { t, d } = useTranslation();
  const steps = d.sustainability.approach.steps;
  const railRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.78', 'end 0.4'],
  });

  return (
    <Section id="approche" tone="sage" className="scroll-mt-24">
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.approach.eyebrow')}</p>
        <h2 className="mt-4 text-h2">{t('sustainability.approach.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.approach.lead')}</p>
      </Reveal>

      <ol ref={railRef} className="m-0 mt-section-gap list-none p-0">
        {APPROACH_STEPS.map(({ id }, index) => (
          <TimelineStep
            key={id}
            index={index}
            last={index === STEP_COUNT - 1}
            title={steps[id].title}
            text={steps[id].text}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </ol>
    </Section>
  );
}

function TimelineStep({
  index,
  last,
  title,
  text,
  scrollYProgress,
}: {
  index: number;
  last: boolean;
  title: string;
  text: string;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentStart = index / STEP_COUNT;
  const segmentEnd = (index + 1) / STEP_COUNT;
  const fill = useTransform(scrollYProgress, [segmentStart, segmentEnd], [0, 1]);

  return (
    <li className={cn('group relative flex gap-5 sm:gap-7', last ? 'pb-0' : 'pb-8 lg:pb-10')}>
      <div className="flex flex-col items-center">
        <span
          dir="ltr"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-leaf-500/30 bg-white font-mono text-[11px] tracking-[0.1em] text-leaf-600 tabular-nums shadow-soft"
        >
          {pad2(index)}
        </span>
        {!last ? (
          <span aria-hidden className="relative mt-1 w-0.5 flex-1 overflow-hidden rounded-full bg-sage-300">
            <motion.span
              className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-lime-500 to-leaf-600"
              style={{ scaleY: fill, height: '100%' }}
            />
          </span>
        ) : null}
      </div>

      <Card interactive className="mb-1 flex-1 p-6 sm:p-7">
        <h3 className="text-h3">{title}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.75] text-ink-500">{text}</p>
      </Card>
    </li>
  );
}
