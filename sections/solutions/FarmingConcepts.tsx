'use client';

import { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';
import { ConceptCard } from '@/sections/solutions/ConceptCard';
import { SOLUTION_CONCEPTS } from '@/lib/data/solutions';

const EASE = 'cubic-bezier(.22,.7,.25,1)';
/** Les blocs démarrent 120ms après l'en-tête, puis s'enchaînent toutes les 70ms. */
const BLOCK_BASE_DELAY = 120;
const BLOCK_STAGGER = 70;

/**
 * « Les fondamentaux » — bloc pédagogique de la page Solutions : les six
 * briques agronomiques et techniques, dans l'ordre où le signal circule
 * réellement (satellite → drone → capteurs → IA → zonage → irrigation).
 */
export function FarmingConcepts() {
  const { t, d } = useTranslation();
  const items = d.solutions.concepts.items;
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const headerStyle = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'none' : 'translateY(14px)',
    transition: reduced ? 'opacity .01ms, transform .01ms' : `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
  };

  return (
    <Section tone="cream" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-32 top-0 h-[420px] w-[420px] rounded-full bg-lime-500/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 bottom-0 h-[320px] w-[320px] rounded-full bg-leaf-500/[0.06] blur-[110px]"
      />

      <div ref={sectionRef} className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div style={headerStyle}>
          <p className="eyebrow text-leaf-600">{t('solutions.concepts.eyebrow')}</p>
          <h2 className="mt-4 max-w-[16ch] text-balance text-h2">{t('solutions.concepts.title')}</h2>
        </div>
        <p className="max-w-[46ch] pb-1.5 text-[15px] leading-[1.6] text-ink-500 lg:text-end" style={headerStyle}>
          {t('solutions.concepts.lead')}
        </p>
      </div>

      <div className={cn('mt-12 grid gap-x-10 gap-y-6 lg:mt-16 min-[820px]:grid-cols-2')}>
        {SOLUTION_CONCEPTS.map(({ id, ...concept }, index) => {
          const tone = 'tone' in concept && concept.tone === 'ocre' ? 'ocre' : 'leaf';
          return (
            <ConceptCard
              key={id}
              index={index}
              tone={tone}
              copy={items[id]}
              revealed={revealed}
              delayMs={BLOCK_BASE_DELAY + index * BLOCK_STAGGER}
              reduced={reduced}
            />
          );
        })}
      </div>
    </Section>
  );
}
