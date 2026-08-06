'use client';

import type { LucideIcon } from 'lucide-react';
import { IconChip } from '@/components/ui/Card';
import { cn, pad2 } from '@/lib/utils';

type ConceptTone = 'leaf' | 'ocre';

type ConceptCopy = {
  title: string;
  text: string;
  text2: string;
  points: string[];
};

const TONE: Record<
  ConceptTone,
  { ring: string; border: string; accent: string; glow: string; check: string }
> = {
  leaf: {
    ring: 'ring-leaf-500/20',
    border: 'hover:border-leaf-600/30',
    accent: 'group-hover:text-leaf-600',
    glow: 'bg-leaf-500/[0.08]',
    check: '#2F7D32',
  },
  ocre: {
    ring: 'ring-ocre-400/20',
    border: 'hover:border-ocre-600/30',
    accent: 'group-hover:text-ocre-600',
    glow: 'bg-ocre-400/[0.08]',
    check: '#B87514',
  },
};

type Props = {
  icon: LucideIcon;
  tone: ConceptTone;
  index: number;
  copy: ConceptCopy;
};

/** Carte d'une brique agronomique / technique — bloc « Les fondamentaux » de la page Solutions. */
export function ConceptCard({ icon: Icon, tone, index, copy }: Props) {
  const palette = TONE[tone];

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:shadow-hover motion-reduce:hover:translate-y-0 sm:p-9',
        palette.border,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -start-10 -top-10 h-[220px] w-[220px] rounded-full blur-[70px]',
          palette.glow,
        )}
      />

      <header className="relative flex items-start gap-4">
        <IconChip
          tone={tone}
          className={cn(
            'h-14 w-14 shrink-0 rounded-[16px] ring-1 transition-transform duration-500 ease-premium group-hover:scale-105',
            palette.ring,
          )}
        >
          <Icon size={25} aria-hidden />
        </IconChip>
        <h3 className="pt-1.5 text-[21px] tracking-[-0.025em] lg:text-[24px]">{copy.title}</h3>
        <span
          className={cn(
            'ms-auto shrink-0 pt-1.5 font-mono text-[11px] tracking-[0.16em] text-ink-300 transition-colors duration-300',
            palette.accent,
          )}
        >
          {pad2(index)}
        </span>
      </header>

      <p className="relative mt-5 max-w-[62ch] text-[15.5px] leading-[1.75] text-ink-500">{copy.text}</p>
      <p className="relative mt-3 max-w-[62ch] flex-1 text-[14.5px] leading-[1.75] text-ink-400">
        {copy.text2}
      </p>

      <div className="relative mt-6 border-t border-forest-950/[0.06] pt-6">
        <ul className="flex flex-col gap-2.5">
          {copy.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={palette.check}
                strokeWidth="2"
                strokeLinecap="round"
                className="mt-[3px] h-[14px] w-[14px] shrink-0"
                aria-hidden
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
