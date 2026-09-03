import type { Variants } from 'framer-motion';

/** Courbe d'accélération unique du site (identique au CSS `ease-premium`). */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

/**
 * Échelle de durées, en secondes. Elle double l'échelle CSS de
 * `tailwind.config.ts` (`duration-fast|base|slow|reveal`) pour que les
 * animations JS et CSS parlent le même langage.
 */
export const DURATION = {
  fast: 0.18,
  base: 0.26,
  slow: 0.38,
  reveal: 0.55,
} as const;

/** Amplitude d'entrée : assez pour être perçue, trop peu pour être remarquée. */
const OFFSET = 22;

/**
 * Construit la transition d'un variant d'entrée.
 *
 * `delay` n'est ajouté que s'il est non nul, et c'est volontaire. Framer résout
 * chaque valeur avec `{ delay, ...getValueTransition(transition) }` : une clé
 * `delay` présente dans la transition du variant écrase le décalage calculé par
 * `staggerChildren`. Comme `fadeUp` sert aussi de variant aux enfants de
 * <Stagger>, y écrire `delay: 0` neutraliserait toutes les cascades du site.
 */
const enter = (delay: number, duration: number = DURATION.reveal) => ({
  duration,
  ease: EASE,
  ...(delay ? { delay } : {}),
});

/**
 * Les variants d'entrée sont des fonctions : leur délai arrive par la prop
 * `custom` du composant motion. La prop `transition` ne peut pas jouer ce rôle
 * — un variant qui définit sa propre transition l'écrase entièrement.
 */

/** Fade + montée : animation de base du scroll reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: enter(delay) }),
};

/** Fade simple, pour les éléments discrets (badges, mentions). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: enter(delay, 0.6) }),
};

/**
 * Entrée latérale. `slideInRight` part du côté « fin de ligne » : à droite en
 * LTR, à gauche en RTL. Les composants passent par `<Reveal from="left|right">`,
 * qui inverse automatiquement selon la direction.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: OFFSET },
  show: (delay = 0) => ({ opacity: 1, x: 0, transition: enter(delay) }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -OFFSET },
  show: (delay = 0) => ({ opacity: 1, x: 0, transition: enter(delay) }),
};

/** Léger zoom, réservé aux bandeaux CTA et aux blocs pleine largeur. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.975 },
  show: (delay = 0) => ({ opacity: 1, scale: 1, transition: enter(delay, 0.6) }),
};

/** Conteneur qui décale l'entrée de ses enfants. */
export const staggerContainer = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Trait horizontal qui se dessine (lignes de liaison, dégradé d'indices). */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: (delay = 0) => ({ scaleX: 1, transition: enter(delay, 0.9) }),
};

/**
 * Marge de déclenchement commune des reveals. `margin` fait démarrer
 * l'animation un peu avant que l'élément soit visible : à l'arrivée dans le
 * champ de vision, elle est déjà lancée plutôt que déclenchée sous les yeux.
 */
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;
