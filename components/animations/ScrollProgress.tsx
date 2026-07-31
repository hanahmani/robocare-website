'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Barre de progression de lecture, collée sous la navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="h-[3px] w-full origin-left bg-gradient-to-r from-leaf-700 via-leaf-500 to-lime-500 rtl:origin-right rtl:bg-gradient-to-l"
    />
  );
}
