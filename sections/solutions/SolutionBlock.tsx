'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { CheckRow, Pill } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
import { cn, pad2 } from '@/lib/utils';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Solution } from '@/types';

type Tone = 'white' | 'sage' | 'cream';

const BG_CYCLE: readonly Tone[] = ['white', 'sage', 'cream', 'sage'];

type Props = {
  solution: Solution;
  copy: Dictionary['solutions']['items'][Solution['slug']];
  index: number;
  total: number;
};

/**
 * Une solution par culture : visuel + article, avec un rythme qui varie
 * selon l'index (fond, poids du visuel, côté) plutôt qu'une alternance
 * mécanique identique à chaque bloc.
 */
export function SolutionBlock({ solution, copy, index, total }: Props) {
  const { t } = useTranslation();
  const ocre = solution.tone === 'ocre';
  const reversed = index % 2 === 1;
  const imageLarge = index % 2 === 0;
  const tone = BG_CYCLE[index % BG_CYCLE.length];

  const visual = (
    <Reveal from={reversed ? 'right' : 'left'} className={cn(imageLarge ? 'lg:col-span-7' : 'lg:col-span-5')}>
      <div className="group relative overflow-hidden rounded-[28px] shadow-hover">
        <Image
          src={solution.image}
          alt={copy.imageAlt}
          width={720}
          height={480}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 640px"
          className="h-[280px] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 lg:h-[420px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,18,12,.5))]"
        />
        <span className="absolute start-5 top-5 rounded-full border border-white/20 bg-forest-950/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-lime-500 backdrop-blur-md">
          {copy.brand}
        </span>
      </div>
    </Reveal>
  );

  const article = (
    <Reveal className={cn(imageLarge ? 'lg:col-span-5' : 'lg:col-span-7')}>
      <p className="font-mono text-[12px] tracking-[0.16em] text-ink-300">
        {pad2(index)} <span className="text-ink-300/60">/ {String(total).padStart(2, '0')}</span>
      </p>
      <p className={cn('eyebrow mt-4', ocre ? 'text-ocre-600' : 'text-leaf-600')}>{copy.name}</p>
      <h2 className="mt-4 text-[28px] leading-[1.06] sm:text-[34px] lg:text-[40px]">{copy.brand}</h2>
      <p className="mt-[18px] max-w-[52ch] text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
        {copy.description}
      </p>

      <h3 className="mt-8 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
        {t('solutions.labels.whatYouTrack')}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {copy.points.map((point) => (
          <CheckRow key={point} tone={solution.tone} onSage={tone !== 'white'}>
            {point}
          </CheckRow>
        ))}
      </ul>

      <h3 className="mt-7 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
        {t('solutions.labels.expectedOutcomes')}
      </h3>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {copy.outcomes.map((outcome) => (
          <Pill key={outcome} tone={solution.tone}>
            {outcome}
          </Pill>
        ))}
      </div>

      <div className="mt-7 border-t border-forest-950/[0.08] pt-6">
        <span
          className={cn(
            'font-display text-[34px] leading-none tracking-[-0.02em] sm:text-[40px]',
            ocre ? 'text-ocre-600' : 'text-leaf-600',
          )}
        >
          {copy.metric}
        </span>
      </div>
    </Reveal>
  );

  return (
    <Section
      id={solution.slug}
      tone={tone}
      className={cn('overflow-hidden scroll-mt-24', index > 0 && 'border-t border-forest-950/[0.06]')}
    >
      {tone !== 'white' ? (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-3xl',
            ocre ? 'bg-ocre-400/10' : 'bg-lime-500/10',
            reversed ? 'start-[-140px]' : 'end-[-140px]',
          )}
        />
      ) : null}
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
        {reversed ? (
          <>
            {article}
            {visual}
          </>
        ) : (
          <>
            {visual}
            {article}
          </>
        )}
      </div>
    </Section>
  );
}
