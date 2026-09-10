'use client';

import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

type Props = {
  icon: LucideIcon;
  /** `undefined` tant que la donnée consolidée n'existe pas : affiche `--` sans compteur. */
  value?: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  text: string;
  className?: string;
};

/**
 * Tuile de tableau de bord : icône, valeur (comptée à l'entrée dans le
 * viewport une fois connue) ou placeholder, libellé et note. Le hook de
 * comptage est toujours appelé — la règle des hooks l'exige — mais sa
 * référence n'est attachée à aucun élément tant que `value` est absent, ce
 * qui le neutralise sans conditionner son appel.
 */
export function SustainabilityMetric({
  icon: Icon,
  value,
  unit,
  prefix,
  suffix,
  label,
  text,
  className,
}: Props) {
  const known = value !== undefined;
  const { ref, display } = useCountUp<HTMLSpanElement>({
    target: value ?? 0,
    prefix,
    suffix,
  });

  return (
    <article
      className={cn(
        'group rounded-tile border border-white/10 bg-white/[0.05] p-[26px] backdrop-blur-xl',
        'transition-[transform,border-color] duration-slow ease-premium',
        'hover:-translate-y-1 hover:border-lime-500/30 motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-field border border-white/10 bg-white/[0.06] text-lime-400">
        <Icon size={19} aria-hidden />
      </span>

      <p
        dir="ltr"
        className="mt-[18px] flex items-baseline gap-1.5 whitespace-nowrap font-display text-[34px] font-semibold leading-none text-lime-500 rtl:justify-end"
      >
        {known ? <span ref={ref}>{display}</span> : <span aria-hidden="false">--</span>}
        {unit ? <span className="text-[18px] font-semibold text-white/60">{unit}</span> : null}
      </p>

      <p className="mt-3 font-mono text-[10.5px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/50">
        {label}
      </p>
      <p className="mt-2 text-[13.5px] leading-[1.65] text-white/70">{text}</p>
    </article>
  );
}
