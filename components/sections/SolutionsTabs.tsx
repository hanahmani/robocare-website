'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import {
  DEFAULT_SOLUTIONS,
  type SolutionId,
  type SolutionResult,
  type SolutionTabContent,
} from '@/components/sections/solutions-content';

/** Un accent de couleur par culture — voir aussi `tailwind.config.ts` (`solutionOlive`…). */
const ACCENTS: Record<SolutionId, string> = {
  olive: '#8DBF4A',
  cereal: '#2E9E4F',
  citrus: '#13847A',
  greenhouse: '#0D4A2A',
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

/** DOM id compatible avec les anciennes ancres `#olive-care`, `#cereal-care`… */
function domId(id: SolutionId): string {
  return `${id}-care`;
}

function formatResult(result: SolutionResult): { sign: string; abs: number } {
  return { sign: result.value < 0 ? '−' : result.value > 0 ? '+' : '', abs: Math.abs(result.value) };
}

type SolutionsTabsProps = {
  solutions?: SolutionTabContent[];
};

/**
 * Bloc à onglets « Solutions par culture » : remplace les quatre sections
 * empilées (même gabarit répété quatre fois) par un seul panneau qui change
 * au clic, au clavier ou au survol d'un raccourci d'ancre existant.
 */
export function SolutionsTabs({ solutions = DEFAULT_SOLUTIONS }: SolutionsTabsProps) {
  const [activeId, setActiveId] = useState<SolutionId>(solutions[0].id);
  const reduced = useReducedMotion();
  const isWide = useMediaQuery('(min-width: 900px)');

  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = Math.max(
    0,
    solutions.findIndex((s) => s.id === activeId),
  );
  const accent = ACCENTS[activeId];

  const measure = useCallback(() => {
    const rail = railRef.current;
    const el = tabRefs.current[activeIndex];
    if (!rail || !el) return;
    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({ left: elRect.left - railRect.left, width: elRect.width });
  }, [activeIndex]);

  useEffect(() => {
    measure();
  }, [measure, isWide]);

  // La police d'affichage (Space Grotesk) remplace la police de secours après
  // chargement : les largeurs des onglets changent, il faut re-mesurer.
  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) return;
    document.fonts.ready.then(measure).catch(() => {});
  }, [measure]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(rail);
    return () => observer.disconnect();
  }, [measure]);

  // Compatibilité avec les raccourcis d'ancre existants (`#olive-care`…).
  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace('#', '');
      const match = solutions.find((s) => domId(s.id) === hash);
      if (match) setActiveId(match.id);
    }
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [solutions]);

  const goTo = (index: number) => {
    const count = solutions.length;
    const clamped = ((index % count) + count) % count;
    setActiveId(solutions[clamped].id);
    tabRefs.current[clamped]?.focus();
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent, index: number) => {
    const dir =
      typeof document !== 'undefined' ? document.dir || getComputedStyle(document.documentElement).direction : 'ltr';
    const isRtl = dir === 'rtl';

    let target: number | null = null;
    if (event.key === 'ArrowRight') target = isRtl ? index - 1 : index + 1;
    else if (event.key === 'ArrowLeft') target = isRtl ? index + 1 : index - 1;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = solutions.length - 1;

    if (target === null) return;
    event.preventDefault();
    goTo(target);
  };

  return (
    <div style={{ '--accent': accent } as CSSProperties}>
      <div
        ref={railRef}
        role="tablist"
        aria-label="Solutions par culture"
        className="relative grid grid-cols-1 border-b border-[rgba(21,32,26,.12)] min-[560px]:grid-cols-2 min-[900px]:grid-cols-4"
      >
        {solutions.map((solution, index) => {
          const isActive = solution.id === activeId;
          const result = formatResult(solution.result);
          return (
            <button
              key={solution.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={domId(solution.id)}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${solution.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                'min-h-11 border-b border-[rgba(21,32,26,.12)] px-4 py-4 text-start transition-colors duration-200 min-[560px]:border-b-0',
                isActive && 'min-[560px]:max-[899px]:[border-bottom:2px_solid_var(--accent)]',
              )}
            >
              <span className="block text-[15px] font-semibold text-ink-900">{solution.name}</span>
              <span className="mt-1 block text-[13px] font-medium" style={{ color: ACCENTS[solution.id] }}>
                {result.sign}
                {result.abs} % {solution.result.unit}
              </span>
            </button>
          );
        })}

        {isWide && indicator ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-[2px] bg-[color:var(--accent)]"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ duration: reduced ? 0 : 0.45, ease: PANEL_EASE }}
          />
        ) : null}
      </div>

      <div className="mt-10">
        {solutions.map((solution) => (
          <SolutionPanel key={solution.id} solution={solution} isActive={solution.id === activeId} reduced={reduced ?? false} />
        ))}
      </div>
    </div>
  );
}

/** Compteur 0 → cible, rejoué à chaque activation d'onglet (`requestAnimationFrame`, jamais `setInterval`). */
function useCountUp(target: number, active: boolean, reduced: boolean): number {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced]);

  return value;
}

function SolutionPanel({
  solution,
  isActive,
  reduced,
}: {
  solution: SolutionTabContent;
  isActive: boolean;
  reduced: boolean;
}) {
  const displayed = useCountUp(solution.result.value, isActive, reduced);
  const sign = solution.result.value < 0 ? '−' : solution.result.value > 0 ? '+' : '';
  const accent = ACCENTS[solution.id];

  return (
    <motion.div
      id={`panel-${solution.id}`}
      role="tabpanel"
      aria-labelledby={domId(solution.id)}
      // `hidden` (attribut natif) ne suffit pas : une classe `grid` sur le
      // même élément le bat (une règle d'auteur l'emporte toujours sur le
      // style `[hidden]` du navigateur), donc on bascule aussi la classe.
      hidden={!isActive}
      initial={false}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: PANEL_EASE }}
      className={cn('items-center gap-8 lg:grid-cols-2 lg:gap-14', isActive ? 'grid' : 'hidden')}
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-[14px]">
        <Image
          src={solution.image.src}
          alt={solution.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-[26px] font-semibold leading-tight text-ink-900">{solution.name}</h3>
        <p className="mt-2 text-[15px] text-[#6B7280]">{solution.crop}</p>

        <div className="mt-6 border-t pt-6" style={{ borderColor: 'rgba(21,32,26,.12)' }}>
          <p className="flex items-baseline gap-2">
            <span
              dir="ltr"
              className="font-display text-[44px] font-semibold leading-none tabular-nums"
              style={{ color: accent }}
            >
              {sign}
              {Math.abs(displayed)} %
            </span>
            <span className="text-[16px] font-medium text-ink-900">{solution.result.unit}</span>
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-300">{solution.result.baseline}</p>
        </div>

        <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.7] text-[#6B7280]">{solution.lede}</p>

        <div className="mt-6 divide-y border-t" style={{ borderColor: 'rgba(21,32,26,.12)' }}>
          {solution.tracks.map((track) => (
            <p
              key={track}
              className="py-3 text-[14px] leading-[1.55] text-ink-700"
              style={{ borderColor: 'rgba(21,32,26,.12)' }}
            >
              {track}
            </p>
          ))}
        </div>

        <p className="mt-6 text-[14px] leading-[1.6] text-[#6B7280]">
          <span className="font-semibold text-ink-900">Ce que ça change : </span>
          {solution.outcome}
        </p>
      </div>
    </motion.div>
  );
}
