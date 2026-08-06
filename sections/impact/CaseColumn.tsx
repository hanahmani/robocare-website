import type { ReactNode } from 'react';
import { cn, pad2 } from '@/lib/utils';

type Props = {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
};

/** Une des trois colonnes (Défi / Solution / Résultats) d'une étude de cas — habillage identique pour les trois. */
export function CaseColumn({ index, label, className, children }: Props) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-300">
        <span dir="ltr" className="tabular-nums">
          {pad2(index)}
        </span>
        <span>{label}</span>
      </div>
      <span aria-hidden className="mt-4 h-0.5 w-5 shrink-0 rounded-full bg-lime-500" />
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}
