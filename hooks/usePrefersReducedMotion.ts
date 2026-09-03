'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * `true` quand l'utilisateur demande moins d'animation.
 *
 * À réserver aux cas que `MotionProvider` ne couvre pas : les boucles
 * décoratives infinies (particules, parallaxe), qu'il faut ne pas monter du
 * tout plutôt que ralentir.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
