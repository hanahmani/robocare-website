'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

export type ReasonVariant = 'default' | 'soil' | 'cta';

export type Reason = {
  id: string;
  title: string;
  text: string;
  /** `soil` ne change que la couleur du filet d'accent ; `cta` bascule le panneau en carte sombre liée à `href`. */
  variant?: ReasonVariant;
  href?: string;
};

/** Contenu FR par défaut — permet de tester le composant seul, hors page. */
const DEFAULT_REASONS: Reason[] = [
  {
    id: 'reversible',
    title: 'Vous intervenez pendant que la perte est réversible',
    text: 'Le déficit hydrique modifie la réflectance du couvert bien avant que la feuille ne change de couleur.',
  },
  {
    id: 'no-hardware',
    title: 'Rien à installer pour démarrer',
    text: "Vous dessinez un contour, la première analyse arrive en 24 h. Capteurs et drone ne viennent qu'ensuite.",
  },
  {
    id: 'instruction',
    title: 'Une consigne, pas un tableau de plus',
    text: "Quelle zone, quelle dose, quel créneau. L'indice reste consultable, jamais le livrable final.",
    variant: 'soil',
  },
  {
    id: 'traceability',
    title: 'Une traçabilité exportable',
    text: 'Historique horodaté par parcelle, export PDF pour la coopérative, le certificateur ou un dossier de financement.',
  },
  {
    id: 'languages',
    title: 'Trois langues, trois canaux',
    text: 'FR, EN et AR, par e-mail, SMS ou WhatsApp. Une consigne non lue ne sert à rien.',
  },
  {
    id: 'try-it',
    title: 'Essayer sur une de vos parcelles',
    text: 'Envoyez un contour, recevez une première analyse sous 24 h. Sans matériel ni engagement.',
    variant: 'cta',
    href: '/contact',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (duration: number) => ({ opacity: 1, y: 0, transition: { duration, ease: EASE } }),
};

/** Fond + bordure du panneau : `cta` reste une carte sombre distincte, actif ou non. */
function panelToneClass(variant: ReasonVariant, active: boolean): string {
  if (variant === 'cta') {
    return active
      ? 'border border-transparent bg-[#1B5533] shadow-[0_1px_2px_rgba(14,32,24,.04),0_12px_32px_-16px_rgba(14,32,24,.18)]'
      : 'border border-transparent bg-[#123B24]';
  }
  return active
    ? 'border border-[#C3DCC8] bg-[#EDF4EC] shadow-[0_1px_2px_rgba(14,32,24,.04),0_12px_32px_-16px_rgba(14,32,24,.18)]'
    : 'border border-[#E4E9DF] bg-[#F5F7F3]';
}

function accentToneClass(variant: ReasonVariant): string {
  if (variant === 'cta') return 'bg-[#9FDCB4]';
  if (variant === 'soil') return 'bg-[#B4632A]';
  return 'bg-[#1F7A3A]';
}

function titleToneClass(variant: ReasonVariant): string {
  return variant === 'cta' ? 'text-white' : 'text-[#0E2018]';
}

function textToneClass(variant: ReasonVariant): string {
  return variant === 'cta' ? 'text-[rgba(238,243,234,.8)]' : 'text-[#54665C]';
}

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1F7A3A] focus-visible:outline-offset-[3px]';

// `motion.create` (plutôt que `motion(Link)`, dépréciée) : le panneau CTA déjà
// ouvert doit rester un composant motion pour hériter la cascade d'entrée du
// conteneur, au même titre que les `motion.button` des autres panneaux.
const MotionLink = motion.create(Link);

type ReasonsPanelsProps = {
  reasons?: Reason[];
};

/**
 * Rangée de panneaux extensibles (six arguments) : le panneau actif s'élargit
 * et révèle son texte, les autres restent réduits à leur titre. Ouverture au
 * survol (pointeur fin uniquement), au clic ou au focus clavier ; un seul
 * panneau ouvert à la fois, le premier par défaut.
 */
export function ReasonsPanels({ reasons = DEFAULT_REASONS }: ReasonsPanelsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const hoverCapable = useMediaQuery('(hover: hover)');
  const prefersReducedMotion = useReducedMotion();
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    panelRefs.current = panelRefs.current.slice(0, reasons.length);
  }, [reasons.length]);

  const activate = (index: number) => setActiveIndex(index);

  const focusNeighbour = (fromIndex: number, key: string) => {
    const count = reasons.length;
    const dir =
      typeof document !== 'undefined'
        ? document.dir || getComputedStyle(document.documentElement).direction
        : 'ltr';
    const isRtl = dir === 'rtl';

    let target: number | null = null;
    if (key === 'ArrowRight') target = isRtl ? fromIndex - 1 : fromIndex + 1;
    else if (key === 'ArrowLeft') target = isRtl ? fromIndex + 1 : fromIndex - 1;
    else if (key === 'Home') target = 0;
    else if (key === 'End') target = count - 1;

    if (target === null) return;
    const clamped = ((target % count) + count) % count;
    activate(clamped);
    panelRefs.current[clamped]?.focus();
  };

  const handleKeyDown = (event: ReactKeyboardEvent, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    focusNeighbour(index, event.key);
  };

  return (
    <motion.div
      className="flex flex-col gap-3 lg:h-[clamp(240px,30vh,340px)] lg:flex-row"
      variants={containerVariants}
      custom={prefersReducedMotion ? 0 : 0.06}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {reasons.map((reason, index) => {
        const variant = reason.variant ?? 'default';
        const active = index === activeIndex;

        return (
          <Panel
            key={reason.id}
            reason={reason}
            variant={variant}
            active={active}
            isDesktop={isDesktop}
            reduced={prefersReducedMotion ?? false}
            registerRef={(el) => {
              panelRefs.current[index] = el;
            }}
            onActivate={() => activate(index)}
            onHoverActivate={() => {
              if (hoverCapable) activate(index);
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        );
      })}
    </motion.div>
  );
}

function Panel({
  reason,
  variant,
  active,
  isDesktop,
  reduced,
  registerRef,
  onActivate,
  onHoverActivate,
  onKeyDown,
}: {
  reason: Reason;
  variant: ReasonVariant;
  active: boolean;
  isDesktop: boolean;
  reduced: boolean;
  registerRef: (el: HTMLElement | null) => void;
  onActivate: () => void;
  onHoverActivate: () => void;
  onKeyDown: (event: ReactKeyboardEvent) => void;
}) {
  const sharedClassName = cn(
    'relative flex min-h-11 flex-1 shrink-0 basis-0 flex-col rounded-[0.9rem] p-[clamp(0.9rem,0.6rem+0.8vw,1.4rem)] text-start',
    'transition-[background-color,border-color,box-shadow] duration-300 ease-out',
    FOCUS_RING,
    panelToneClass(variant, active),
  );

  const flexStyle = {
    flexGrow: isDesktop ? (active ? 2.8 : 1) : undefined,
    transition:
      isDesktop && !reduced ? 'flex-grow 550ms cubic-bezier(.22,1,.36,1)' : isDesktop ? 'flex-grow 0ms' : undefined,
  };

  const content: ReactNode = (
    <>
      <span aria-hidden className={cn('h-[2px] w-[22px] shrink-0 rounded-full', accentToneClass(variant))} />
      <span className="flex-1" />
      <div className="mt-auto">
        <h3
          className={cn(
            'text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)] font-semibold leading-[1.18] tracking-[-0.01em]',
            'font-display text-balance',
            titleToneClass(variant),
          )}
        >
          {reason.title}
        </h3>

        <div
          className="grid"
          style={{
            gridTemplateRows: active ? '1fr' : '0fr',
            transition: reduced ? 'grid-template-rows 0ms' : 'grid-template-rows 420ms cubic-bezier(.22,1,.36,1)',
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <p
              className={cn('mt-2 text-[0.88rem] leading-[1.55]', textToneClass(variant))}
              style={{
                opacity: active ? 1 : 0,
                transition: reduced
                  ? 'opacity 0ms'
                  : `opacity 320ms cubic-bezier(.22,1,.36,1) ${active ? '100ms' : '0ms'}`,
              }}
            >
              {reason.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const entryDuration = reduced ? 0 : 0.5;

  // Le panneau CTA déjà ouvert devient un vrai lien (jamais un <a> imbriqué
  // dans un <button>) : le clic navigue directement vers `reason.href`. Les
  // deux branches restent des composants motion pour hériter la cascade
  // d'entrée du conteneur (`variants` + `custom`, sans `initial`/`animate`
  // propres qui la court-circuiteraient).
  if (variant === 'cta' && active && reason.href) {
    return (
      <MotionLink
        href={reason.href}
        ref={registerRef as never}
        variants={itemVariants}
        custom={entryDuration}
        aria-expanded={active}
        onMouseEnter={onHoverActivate}
        onFocus={onActivate}
        onKeyDown={onKeyDown}
        style={flexStyle}
        className={sharedClassName}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      ref={registerRef as never}
      variants={itemVariants}
      custom={entryDuration}
      aria-expanded={active}
      onClick={onActivate}
      onMouseEnter={onHoverActivate}
      onFocus={onActivate}
      onKeyDown={onKeyDown}
      style={flexStyle}
      className={sharedClassName}
    >
      {content}
    </motion.button>
  );
}
