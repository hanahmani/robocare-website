'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Applique `prefers-reduced-motion` aux animations JavaScript.
 *
 * La règle CSS de `globals.css` ne neutralise que les keyframes et les
 * transitions CSS : framer-motion écrit ses transforms en style inline, hors de
 * portée du média query. `reducedMotion="user"` fait sauter instantanément les
 * valeurs de position (x, y, scale, rotate) tout en laissant les fondus
 * d'opacité, qui restent confortables et préservent la lisibilité des entrées.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
