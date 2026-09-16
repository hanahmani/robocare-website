'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from '@/i18n';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { pad2 } from '@/lib/utils';
import { TECH_PIPELINE } from '@/lib/data/technology';

const EASE = 'cubic-bezier(.22,.61,.24,1)';
/** Délais de la cascade d'entrée pour les 4 étapes (eyebrow=0ms, titre=70ms). */
const STEP_DELAYS_MS = [160, 240, 320, 400];

/**
 * Chaîne de traitement (acquisition → livraison), version filaire sans
 * cartes. Apparition pilotée par IntersectionObserver + CSS uniquement —
 * aucune dépendance d'animation externe, par contrainte explicite.
 */
export function ProcessingChain() {
  const { t, d } = useTranslation();
  const pipeline = d.technology.pipeline.steps;
  const reduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8%' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealStyle = (delayMs: number): CSSProperties => {
    const visible = reduced || revealed;
    return {
      opacity: visible ? 1 : 0,
      transform: reduced ? 'none' : visible ? 'translateY(0)' : 'translateY(14px)',
      transition: reduced ? 'none' : `opacity .7s ${EASE} ${delayMs}ms, transform .7s ${EASE} ${delayMs}ms`,
    };
  };

  return (
    <section ref={sectionRef} className="bg-white px-[clamp(20px,5vw,64px)] py-[clamp(72px,10vw,132px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-2.5" style={revealStyle(0)}>
          <span aria-hidden className="h-px w-[26px] bg-[#6B7F3E]" />
          <p className="text-[13px] text-[#6B7F3E]">{t('technology.pipeline.eyebrow')}</p>
        </div>

        <h2
          className="mt-[22px] max-w-[14ch] text-[clamp(32px,4.6vw,54px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#16201A]"
          style={revealStyle(70)}
        >
          {t('technology.pipeline.title')}
        </h2>

        <div className="mt-[clamp(48px,6vw,84px)] grid grid-cols-1 gap-x-[clamp(24px,3.4vw,52px)] gap-y-[30px] min-[641px]:grid-cols-2 min-[641px]:gap-y-[38px] min-[1041px]:grid-cols-4 min-[1041px]:gap-y-0">
          {TECH_PIPELINE.map((step, index) => (
            <article key={step.id} className="group relative pt-5" style={revealStyle(STEP_DELAYS_MS[index])}>
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[rgba(22,32,26,.12)]" />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#6B7F3E] transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />

              <p className="text-[12px] font-semibold tabular-nums text-[#6D756C] transition-colors duration-300 group-hover:text-[#6B7F3E] motion-reduce:transition-none">
                {t('technology.pipeline.stepLabel', { number: pad2(index) })}
              </p>
              <h3 className="mb-[10px] mt-[14px] text-[20px] font-semibold text-[#16201A]">
                {pipeline[step.id].title}
              </h3>
              <p className="max-w-[34ch] text-[15px] text-[#6D756C] max-[640px]:max-w-none">
                {pipeline[step.id].text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
