'use client';

import { motion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, staggerContainer, VIEWPORT } from '@/lib/motion';

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Décalage entre chaque enfant, en secondes. */
  stagger?: number;
  delay?: number;
  /** Balise rendue (ul, ol, section…). */
  as?: ElementType;
};

/** Conteneur d'entrée en cascade. Les enfants sont enveloppés dans <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}: StaggerProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/** Enfant animé d'un <Stagger>. */
export function StaggerItem({
  children,
  className,
  as = 'div',
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag id={id} variants={fadeUp} className={className}>
      {children}
    </MotionTag>
  );
}
