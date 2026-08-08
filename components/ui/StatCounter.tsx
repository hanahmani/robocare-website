'use client';

import { useTranslation } from '@/i18n';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';
import type { StatView } from '@/types';

type Props = StatView & {
  /** Taille du chiffre : `lg` sur les pages, `sm` dans les cartes du hero. */
  size?: 'sm' | 'lg';
  className?: string;
};

/** Cellule de statistique : compteur animé + libellé + note optionnelle. */
export function StatCounter({
  value,
  prefix,
  suffix,
  grouped,
  label,
  note,
  featured,
  size = 'lg',
  className,
}: Props) {
  const { t } = useTranslation();
  // Le séparateur de milliers suit la langue : « 100 000 » en FR, « 100,000 » en EN.
  const separator = grouped ? t('common.thousandsSeparator') : '';

  const { ref, display } = useCountUp<HTMLDivElement>({
    target: value,
    prefix,
    suffix,
    separator,
  });

  return (
    <div
      className={cn(
        'group relative overflow-hidden bg-forest-950 px-6 py-7 transition-colors duration-300 ease-premium hover:bg-white/[0.06]',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-center scale-x-0 bg-lime-500 transition-transform duration-300 ease-premium group-hover:scale-x-100"
      />
      <div
        ref={ref}
        dir="ltr"
        className={cn(
          'font-display font-semibold leading-none tracking-display tabular-nums transition-colors duration-300 ease-premium rtl:text-right',
          size === 'lg' ? 'text-[32px] lg:text-[44px]' : 'text-[30px]',
          featured ? 'text-lime-500' : 'text-white group-hover:text-lime-400',
        )}
      >
        {display}
      </div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 transition-colors duration-300 ease-premium group-hover:text-white/70">
        {label}
      </div>
      {note ? <div className="mt-1.5 text-[13px] text-white/40">{note}</div> : null}
    </div>
  );
}
