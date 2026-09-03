'use client';

import { usePathname } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
};

/**
 * Transition légère entre les pages : fondu + glissade discrète à l'arrivée
 * sur une nouvelle route. Pas d'animation de sortie — la navigation reste
 * immédiate, seule l'entrée de la page suivante est animée.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div key={pathname} variants={VARIANTS} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}
