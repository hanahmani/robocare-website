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
      <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#7D9B70]">
        <span dir="ltr" className="tabular-nums">
          {pad2(index)}
        </span>{' '}
        {label}
      </span>
      <div aria-hidden className="mb-3.5 mt-[9px] h-[2px] w-5 bg-[#7D9B70]" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
