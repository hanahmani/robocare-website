'use client';

import { cn, pad2 } from '@/lib/utils';

type Props = {
  index: number;
  title: string;
  text: string;
};

/** Un argument de la liste « Pourquoi choisir RoboCare ». */
export function ReasonItem({ index, title, text }: Props) {
  return (
    <li className={cn('flex gap-4', index > 0 && 'border-t border-forest-950/[0.06] pt-6')}>
      <span
        dir="ltr"
        className="w-8 shrink-0 pt-0.5 font-mono text-[11px] tracking-[0.16em] text-ink-300 tabular-nums"
      >
        {pad2(index)}
      </span>
      <div>
        <p className="text-[17px] font-semibold text-ink-900">{title}</p>
        <p className="mt-1.5 text-[14.5px] leading-[1.7] text-ink-500">{text}</p>
      </div>
    </li>
  );
}
