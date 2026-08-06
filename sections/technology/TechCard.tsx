'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn, pad2 } from '@/lib/utils';

type Tone = 'leaf' | 'ocre';

const TONE: Record<Tone, { border: string; dot: string }> = {
  leaf: { border: 'hover:border-leaf-600/30', dot: 'bg-leaf-600' },
  ocre: { border: 'hover:border-ocre-600/30', dot: 'bg-ocre-600' },
};

type Props = {
  icon: LucideIcon;
  tone: Tone;
  index: number;
  title: string;
  text: string;
  points: string[];
  /** Badge ou barre d'échelle NDVI, selon la donnée — rendu dans un slot normalisé. */
  extra?: ReactNode;
};

/** Une brique technologique (IA, satellite, IoT, drone). */
export function TechCard({ icon: Icon, tone, index, title, text, points, extra }: Props) {
  const palette = TONE[tone];

  return (
    <article
      className={cn(
        'rounded-card border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:shadow-hover motion-reduce:hover:translate-y-0 sm:p-7 lg:p-9',
        palette.border,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-forest-900 text-lime-500">
              <Icon size={21} aria-hidden />
            </span>
            <h2 className="text-[24px] tracking-[-0.02em] text-ink-900 lg:text-[26px]">{title}</h2>
            <span className="ms-auto shrink-0 font-mono text-[11px] tracking-[0.16em] text-ink-300">
              {pad2(index)}
            </span>
          </div>

          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-ink-500">{text}</p>

          {extra ? <div className="mt-7 border-t border-forest-950/[0.06] pt-5">{extra}</div> : null}
        </div>

        <ul className="flex flex-col gap-3.5 lg:col-span-5 lg:border-s lg:border-forest-950/[0.06] lg:ps-10">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] leading-[1.7] text-ink-500">
              <span aria-hidden className={cn('mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full', palette.dot)} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
