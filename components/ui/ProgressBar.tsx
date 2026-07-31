'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = {
  /** Libellé affiché à gauche. */
  label: string;
  /** Valeur en pourcentage (0–100) : largeur de la barre et chiffre affiché. */
  value: number;
  /** Précision affichée sous le libellé. */
  note?: string;
  /** Texte préfixant la valeur, ex. « − ». */
  prefix?: string;
  /** Met la ligne en avant (teinte lime). */
  featured?: boolean;
  /** Décalage d'entrée, pour l'effet de cascade. */
  delay?: number;
  /** Sur fond sombre. */
  invert?: boolean;
};

/**
 * Barre de progression animée au scroll.
 *
 * Le remplissage part de zéro à l'entrée dans le viewport et joue une seule
 * fois, comme les autres reveals du site. `prefers-reduced-motion` affiche
 * directement la valeur finale.
 */
export function ProgressBar({
  label,
  value,
  note,
  prefix,
  featured = false,
  delay = 0,
  invert = false,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p
            className={cn(
              'text-[15px] font-semibold',
              invert ? 'text-white' : 'text-ink-900',
            )}
          >
            {label}
          </p>
          {note ? (
            <p className={cn('mt-1 text-[13px]', invert ? 'text-white/45' : 'text-ink-400')}>
              {note}
            </p>
          ) : null}
        </div>
        <p
          dir="ltr"
          className={cn(
            'shrink-0 font-display text-[24px] font-semibold leading-none tracking-display tabular-nums lg:text-[28px]',
            featured ? 'text-leaf-600' : invert ? 'text-white' : 'text-ink-700',
          )}
        >
          {prefix}
          {value} %
        </p>
      </div>

      <div
        role="img"
        aria-label={`${label} : ${prefix ?? ''}${value} %`}
        className={cn(
          'mt-3 h-2 w-full overflow-hidden rounded-full',
          invert ? 'bg-white/10' : 'bg-sage-200',
        )}
      >
        <motion.div
          className={cn(
            'h-full rounded-full',
            featured
              ? 'bg-[linear-gradient(90deg,#4D9E2F,#9ED84B)]'
              : invert
                ? 'bg-white/40'
                : 'bg-leaf-500/70',
          )}
          initial={reduceMotion ? { width: `${value}%` } : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, delay, ease: EASE }}
        />
      </div>
    </div>
  );
}
