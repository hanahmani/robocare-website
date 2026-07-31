'use client';

import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { useDirection } from '@/i18n';
import { fadeUp, slideInLeft, slideInRight, scaleIn, VIEWPORT } from '@/lib/motion';

const PRESETS = {
  up: fadeUp,
  left: slideInLeft,
  right: slideInRight,
  scale: scaleIn,
} satisfies Record<string, Variants>;

type Preset = keyof typeof PRESETS;

type RevealProps = {
  children: ReactNode;
  /** Direction / type d'entrée. `left` et `right` sont inversés en RTL. */
  from?: Preset;
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

/** Miroir horizontal des entrées latérales quand la page est en RTL. */
function mirror(from: Preset, isRtl: boolean): Preset {
  if (!isRtl) return from;
  if (from === 'left') return 'right';
  if (from === 'right') return 'left';
  return from;
}

/**
 * Scroll reveal réutilisable : joue l'animation une seule fois,
 * quand l'élément entre dans le viewport.
 */
export function Reveal({ children, from = 'up', delay = 0, className, as = 'div', id }: RevealProps) {
  const { isRtl } = useDirection();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      variants={PRESETS[mirror(from, isRtl)]}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
