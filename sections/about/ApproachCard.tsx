'use client';

import type { LucideIcon } from 'lucide-react';
import { IconChip } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type Tone = 'leaf' | 'ocre';

const TONE: Record<Tone, { border: string }> = {
  leaf: { border: 'hover:border-leaf-600/30' },
  ocre: { border: 'hover:border-ocre-600/30' },
};

type Props = {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  text: string;
};

/** Un des quatre piliers de méthode (approche, méthodologie, expertise, innovation). */
export function ApproachCard({ icon: Icon, tone, title, text }: Props) {
  const palette = TONE[tone];

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1 hover:shadow-hover motion-reduce:hover:translate-y-0 lg:p-8',
        palette.border,
      )}
    >
      <div className="flex items-center gap-4">
        <IconChip tone={tone} className="h-11 w-11 shrink-0 rounded-[14px]">
          <Icon size={21} aria-hidden />
        </IconChip>
        <h3 className="text-[20px] tracking-[-0.02em] text-ink-900 lg:text-[22px]">{title}</h3>
      </div>
      <p className="mt-4 max-w-[58ch] flex-1 text-[15px] leading-[1.75] text-ink-500">{text}</p>
    </article>
  );
}
