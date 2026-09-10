'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FOOTPRINT_CYCLE, FOOTPRINT_LIST } from '@/lib/data/sustainability';

const CENTER = 160;
const RING_RADIUS = 128;
const DOT_RADIUS = RING_RADIUS;
/** Rayon des étiquettes HTML, en pourcentage du conteneur carré (cercle SVG ≈ 40 % → 46 % laisse un peu d'air). */
const LABEL_RADIUS_PERCENT = 46;

/** Point sur un cercle, `angle` en degrés depuis le haut (0°), sens horaire. */
function polarPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

/** Empreinte : ce qu'une agriculture plus précise peut réduire, illustré par un cycle d'optimisation. */
export function FootprintSection() {
  const { t, d } = useTranslation();
  const list = d.sustainability.footprint.list;
  const cycle = d.sustainability.footprint.cycle;
  const reduced = usePrefersReducedMotion();

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

        <Reveal from="right" className="mx-auto min-w-0">
          <div className="relative mx-auto aspect-square w-full max-w-[320px]">
            <svg
              viewBox="0 0 320 320"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={t('sustainability.footprint.title')}
            >
              <circle cx={CENTER} cy={CENTER} r="150" className="fill-sage-50" />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RING_RADIUS}
                className="animate-[spinSlow_60s_linear_infinite] fill-none stroke-sage-300 motion-reduce:animate-none"
                strokeWidth="1.5"
                strokeDasharray="4 12"
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />
              {reduced ? null : (
                <motion.g
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx={CENTER} cy={CENTER - RING_RADIUS} r="12" className="fill-lime-500/25" />
                  <circle cx={CENTER} cy={CENTER - RING_RADIUS} r="5" className="fill-lime-500" />
                </motion.g>
              )}

              <circle cx={CENTER} cy={CENTER} r="96" className="fill-sage-200" />
              <text
                x={CENTER}
                y={CENTER - 2}
                textAnchor="middle"
                className="fill-ink-900 font-display text-[17px] font-semibold"
              >
                {t('sustainability.footprint.cycleTitle')}
              </text>
              <text
                x={CENTER}
                y={CENTER + 18}
                textAnchor="middle"
                className="fill-leaf-600 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
              >
                {t('sustainability.footprint.cycleSubtitle')}
              </text>

              {FOOTPRINT_CYCLE.map(({ id, angle }) => {
                const dot = polarPoint(CENTER, CENTER, DOT_RADIUS, angle);
                return <circle key={id} cx={dot.x} cy={dot.y} r="5" className="fill-leaf-500" />;
              })}
            </svg>

            {FOOTPRINT_CYCLE.map(({ id, angle }) => {
              const pos = polarPoint(50, 50, LABEL_RADIUS_PERCENT, angle);
              return (
                <span
                  key={id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-700 shadow-soft"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {cycle[id]}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
