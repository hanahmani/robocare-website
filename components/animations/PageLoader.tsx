'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/** Durée d'affichage : perceptible, jamais bloquante. */
const HOLD_MS = 550;

/**
 * Écran de chargement initial : logo RoboCare + barre de progression.
 *
 * Monté une seule fois dans le layout — les navigations internes ne
 * remontent pas ce composant (le layout persiste), donc il n'apparaît qu'au
 * premier chargement de l'application, jamais entre deux pages.
 */
export function PageLoader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduced ? 0 : HOLD_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-forest-950"
        >
          <Image
            src="/brand/logo-robocare.png"
            alt=""
            width={152}
            height={38}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_MS / 1000, ease: EASE }}
              className="h-full w-full origin-left bg-index-scale rtl:origin-right"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
