'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = {
  index: number;
  label: string;
  note: string;
  value: number;
  /** Plus grande valeur absolue de la série — la largeur de la barre lui est relative. */
  max: number;
  prefix?: string;
  delay?: number;
};

/** Une ligne « réduction moyenne constatée » : la largeur de la barre est proportionnelle à `value / max`. */
export function ReductionRow({ index, label, note, value, max, prefix, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const width = (Math.abs(value) / max) * 100;

  return (
    <div className={cn('flex flex-col', index > 0 && 'border-t border-forest-950/[0.06] pt-6')}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[15.5px] font-semibold text-ink-900">{label}</p>
        <p
          dir="ltr"
          className="shrink-0 font-display text-[26px] font-semibold leading-none tracking-display tabular-nums text-leaf-600"
        >
          {prefix}
          {value} %
        </p>
      </div>
      <p className="mt-1 text-[13px] leading-[1.6] text-ink-400">{note}</p>

      <div
        role="img"
        aria-label={`${label} : ${prefix ?? ''}${value} %`}
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-forest-950/[0.06]"
      >
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#2F7D32,#9ED84B)]"
          initial={reduceMotion ? { width: `${width}%` } : { width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay, ease: EASE }}
        />
      </div>
    </div>
  );
}
