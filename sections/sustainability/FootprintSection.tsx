'use client';

import { motion } from 'framer-motion';
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

        <Reveal from="right" className="mx-auto w-full min-w-0 lg:max-w-[460px]">
          <div className="mx-auto aspect-square w-full max-w-[420px]" dir="ltr">
            <motion.svg
              viewBox="0 0 440 440"
              className="h-full w-full overflow-visible"
              role="img"
              aria-label={t('sustainability.footprint.title')}
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

                return (
                  <motion.g
                    key={id}
                    initial={reduced ? false : { scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.55 + index * 0.13, duration: 0.38, ease: 'easeOut' }}
                    style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                  >
                    <motion.circle
                      cx={dot.x}
                      cy={dot.y}
                      r="6"
                      className="fill-leaf-500"
                      animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
                      transition={{ delay: 1.4 + index * 0.13, duration: 0.7, ease: 'easeInOut' }}
                      style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                    />
                    <text
                      x={label.x}
                      y={label.y + 4}
                      textAnchor={textAnchor}
                      className="fill-ink-700 font-mono text-[12px] font-medium uppercase tracking-[0.04em]"
                    >
                      {cycle[id]}
                    </text>
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
