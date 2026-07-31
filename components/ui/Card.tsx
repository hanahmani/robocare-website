import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'white' | 'sage' | 'dark';

const TONES: Record<Tone, string> = {
  white: 'border-forest-950/[0.08] bg-white shadow-soft',
  sage: 'border-forest-950/[0.08] bg-sage-50',
  dark: 'border-lime-500/20 bg-[linear-gradient(165deg,#0B2015,#06120C_60%)] text-white shadow-glass',
};

type CardProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Ajoute l'élévation + la bordure verte au survol. */
  interactive?: boolean;
};

/** Carte de base : rayon 22px, bordure fine, ombre douce. */
export function Card({ children, tone = 'white', className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-tile border p-7 transition-all duration-[350ms] ease-premium',
        TONES[tone],
        interactive &&
          'hover:-translate-y-2 hover:border-leaf-500/40 hover:shadow-lift motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Pastille d'icône colorée (46 × 46). */
export function IconChip({
  children,
  tone = 'leaf',
  className,
}: {
  children: ReactNode;
  tone?: 'leaf' | 'ocre' | 'dark' | 'light';
  className?: string;
}) {
  const tones = {
    leaf: 'bg-sage-100 text-leaf-600',
    ocre: 'bg-[#FDF3E3] text-ocre-600',
    dark: 'bg-forest-900 text-white',
    light: 'bg-white text-leaf-600',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px]',
        tones[tone],
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

/** Étiquette pilule (résultats attendus, tags de culture). */
export function Pill({
  children,
  tone = 'leaf',
  className,
}: {
  children: ReactNode;
  tone?: 'leaf' | 'ocre' | 'dark' | 'muted';
  className?: string;
}) {
  const tones = {
    leaf: 'bg-sage-100 text-leaf-600',
    ocre: 'bg-[#FDF3E3] text-ocre-600',
    dark: 'bg-forest-900 font-mono text-[11.5px] tracking-[0.06em] text-lime-100',
    muted: 'bg-sage-50 text-ink-400',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Ligne d'information avec coche verte (listes « ce que vous suivez »). */
export function CheckRow({
  children,
  tone = 'leaf',
  onSage = false,
}: {
  children: ReactNode;
  tone?: 'leaf' | 'ocre';
  onSage?: boolean;
}) {
  return (
    <li
      className={cn(
        'flex gap-3 rounded-field px-4 py-3.5 text-[14.5px] leading-[1.55] text-ink-700 transition-all duration-300 hover:translate-x-1 rtl:hover:-translate-x-1',
        onSage ? 'bg-white hover:bg-sage-200' : 'bg-sage-50 hover:bg-sage-200',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={tone === 'ocre' ? '#B87514' : '#4D9E2F'}
        strokeWidth="2"
        strokeLinecap="round"
        className="mt-[3px] h-[17px] w-[17px] shrink-0"
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
