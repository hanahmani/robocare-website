'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FOOTPRINT_CYCLE, FOOTPRINT_LIST } from '@/lib/data/sustainability';

const CENTER = 220;
const RING_RADIUS = 150;
const LABEL_RADIUS = 182;

/** Point sur un cercle, angle en degrés depuis le haut, dans le sens horaire. */
function polarPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

const STEP_COUNT = FOOTPRINT_CYCLE.length;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const ARC_EASE = 'cubic-bezier(0.22,0.61,0.36,1)';
const CYCLE_MS = 2400;

/** Décalage de l'arc de progression pour une étape donnée (vide à l'étape 0, 4/5 à l'étape 4). */
function arcOffsetFor(step: number) {
  return RING_CIRCUMFERENCE - step * (RING_CIRCUMFERENCE / STEP_COUNT);
}

/** Empreinte : ce qu'une agriculture plus précise peut réduire, illustré par un cycle d'optimisation. */
export function FootprintSection() {
  const { t, d } = useTranslation();
  const list = d.sustainability.footprint.list;
  const cycle = d.sustainability.footprint.cycle;
  const reduced = usePrefersReducedMotion();

  const svgRef = useRef<SVGSVGElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const inView = useInView(svgRef, { amount: 0.3 });

  const [activeStep, setActiveStep] = useState(reduced ? STEP_COUNT - 1 : 0);
  const [paused, setPaused] = useState(false);
  const prevStepRef = useRef(activeStep);

  // Avance automatique : seulement si visible, en pause au survol/focus d'un point.
  useEffect(() => {
    if (reduced || !inView || paused) return;
    const id = setInterval(() => {
      setActiveStep((current) => (current + 1) % STEP_COUNT);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, inView, paused]);

  // Arc de progression, piloté à la main : au retour de la dernière étape à la
  // première, on saute à vide sans transition (sinon l'arc se dévide à rebours).
  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;
    const previous = prevStepRef.current;
    prevStepRef.current = activeStep;

    const offset = arcOffsetFor(activeStep);

    if (reduced) {
      el.style.transition = 'none';
      el.style.strokeDashoffset = String(offset);
      return;
    }

    const isWrap = previous === STEP_COUNT - 1 && activeStep === 0;
    if (isWrap) {
      el.style.transition = 'none';
      el.style.strokeDashoffset = String(RING_CIRCUMFERENCE);
      // Force le reflow pour que le prochain changement reparte bien d'un état sans transition.
      void el.getBoundingClientRect();
      return;
    }

    el.style.transition = `stroke-dashoffset 0.75s ${ARC_EASE}`;
    el.style.strokeDashoffset = String(offset);
  }, [activeStep, reduced]);

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="min-w-0">
          <p className="eyebrow text-leaf-600">{t('sustainability.footprint.eyebrow')}</p>
          <h2 className="mt-4 text-h2-alt">{t('sustainability.footprint.title')}</h2>
          <p className="mt-5 text-body text-ink-500">{t('sustainability.footprint.lead')}</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {FOOTPRINT_LIST.map((id) => (
              <li key={id} className="flex gap-3 text-[15px] leading-[1.7] text-ink-500">
                <span aria-hidden className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-leaf-500" />
                <span>{list[id]}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="right" className="mx-auto w-full min-w-0 lg:max-w-[460px]">
          <div className="mx-auto aspect-square w-full max-w-[420px]" dir="ltr">
            <motion.svg
              ref={svgRef}
              viewBox="0 0 440 440"
              className="h-full w-full overflow-visible"
              role="img"
              aria-label={`${t('sustainability.footprint.cycleTitle')} ${t('sustainability.footprint.cycleSubtitle')}: ${FOOTPRINT_CYCLE.map(
                ({ id }) => cycle[id],
              ).join(', ')}`}
            >
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={RING_RADIUS}
                className="fill-none stroke-sage-300"
                strokeWidth="2"
                strokeDasharray="6 12"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.35, ease: 'easeOut' }}
              />

              {/* Arc de progression du cycle, superposé sur l'anneau pointillé ci-dessus. */}
              <circle
                ref={arcRef}
                cx={CENTER}
                cy={CENTER}
                r={RING_RADIUS}
                fill="none"
                stroke="#3E6B4C"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                aria-hidden
              />

              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r="105"
                className="fill-sage-50 stroke-sage-200"
                strokeWidth="1.5"
                initial={reduced ? false : { scale: 0.88, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />
              <motion.text
                x={CENTER}
                y={CENTER - 5}
                textAnchor="middle"
                className="fill-ink-900 font-sans text-[22px] font-bold"
                initial={reduced ? false : { y: 8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
              >
                {t('sustainability.footprint.cycleTitle')}
              </motion.text>
              <motion.text
                x={CENTER}
                y={CENTER + 24}
                textAnchor="middle"
                className="fill-leaf-600 font-sans text-[20px] font-bold"
                initial={reduced ? false : { y: 8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.55, duration: 0.45, ease: 'easeOut' }}
              >
                {t('sustainability.footprint.cycleSubtitle')}
              </motion.text>

              {FOOTPRINT_CYCLE.map(({ id, angle }, index) => {
                const dot = polarPoint(CENTER, CENTER, RING_RADIUS, angle);
                const label = polarPoint(CENTER, CENTER, LABEL_RADIUS, angle);
                const textAnchor = Math.abs(label.x - CENTER) < 24 ? 'middle' : label.x < CENTER ? 'end' : 'start';
                const isActive = index === activeStep;

                return (
                  <motion.g
                    key={id}
                    initial={reduced ? false : { scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.55 + index * 0.13, duration: 0.38, ease: 'easeOut' }}
                    style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                  >
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={cycle[id]}
                      className="cursor-pointer"
                      onMouseEnter={() => {
                        setPaused(true);
                        setActiveStep(index);
                      }}
                      onMouseLeave={() => setPaused(false)}
                      onFocus={() => {
                        setPaused(true);
                        setActiveStep(index);
                      }}
                      onBlur={() => setPaused(false)}
                    >
                      {/* Halo discret derrière le point actif. */}
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r={isActive ? 12 : 6}
                        fill="#3E6B4C"
                        opacity={isActive ? 0.16 : 0}
                        style={{ transition: 'r 0.5s ease, opacity 0.5s ease' }}
                      />
                      <motion.circle
                        cx={dot.x}
                        cy={dot.y}
                        r={isActive ? 7 : 6}
                        style={{
                          fill: isActive ? '#3E6B4C' : '#4D9E2F',
                          transition: 'r 0.5s ease, fill 0.5s ease',
                        }}
                        animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
                        transition={{ delay: 1.4 + index * 0.13, duration: 0.7, ease: 'easeInOut' }}
                      />
                      {/* Rayon d'appui, invisible, pour une cible tactile confortable autour du point. */}
                      <circle cx={dot.x} cy={dot.y} r={18} fill="transparent" />
                      <text
                        x={label.x}
                        y={label.y + 4}
                        textAnchor={textAnchor}
                        className={
                          isActive
                            ? 'fill-[#3E6B4C] font-mono text-[12px] font-semibold uppercase tracking-[0.04em]'
                            : 'fill-ink-700 font-mono text-[12px] font-medium uppercase tracking-[0.04em]'
                        }
                        style={{ transition: 'fill 0.5s ease' }}
                      >
                        {cycle[id]}
                      </text>
                    </g>
                  </motion.g>
                );
              })}
            </motion.svg>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
