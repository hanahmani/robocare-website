import type { Variants } from 'framer-motion';

/** Courbe d'accélération unique du site (identique au CSS `ease-premium`). */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Fade + montée : animation de base du scroll reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Fade simple, pour les éléments discrets (badges, mentions). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Entrée latérale. `slideInEnd` part du côté « fin de ligne » : à droite en LTR,
 * à gauche en RTL. Les composants passent par `<Reveal from="left|right">`,
 * qui inverse automatiquement selon la direction.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Léger zoom, réservé aux bandeaux CTA. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/** Conteneur qui décale l'entrée de ses enfants. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Trait horizontal qui se dessine (lignes de liaison, dégradé d'indices). */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
};

/** Marge de déclenchement commune des reveals. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
