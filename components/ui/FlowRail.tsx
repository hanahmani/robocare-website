'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type Props = {
  /** Décale le départ du point : évite que des filets voisins pulsent à l'unisson. */
  delay?: number;
  /** Teinte du filet — `dark` sur fond clair, `light` sur fond sombre. */
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Filet 2px surmonté d'un point qui le traverse en boucle — matérialise une
 * « ligne de donnée » au-dessus d'une carte reliée à sa voisine. Décoratif :
 * masqué du lecteur d'écran et absent quand l'utilisateur réduit les animations.
 */
export function FlowRail({ delay = 0, tone = 'dark', className }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        'relative h-0.5 overflow-hidden rounded-full',
        tone === 'dark' ? 'bg-sage-300' : 'bg-white/15',
        className,
      )}
    >
      {reduced ? null : (
        <motion.span
          className={cn(
            'absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full',
            tone === 'dark' ? 'bg-leaf-500' : 'bg-lime-400',
          )}
          // `insetInlineStart` plutôt que `left` : la propriété suit le sens de
          // lecture, donc le point voyage naturellement en miroir en arabe.
          initial={{ insetInlineStart: '-6%', opacity: 0 }}
          animate={{ insetInlineStart: ['-6%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay, times: [0, 0.12, 0.82, 1] }}
        />
      )}
    </div>
  );
}
