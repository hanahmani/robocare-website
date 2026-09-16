'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';
import { ECOSYSTEM_CARDS } from '@/lib/data/sustainability';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const CYCLE_MS = 2800;
/** Décalages des 5 arcs (r=52, circonférence 326.7 ÷ 5 ≈ 65.3 par tranche). */
const ARC_OFFSETS = [0, -65.3, -130.7, -196.0, -261.4];

/** Notre impact sur la nature : roue à 5 arcs reliée à la liste des domaines. */
export function EcosystemSection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.ecosystem.cards;
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Cycle automatique : seulement section visible, en pause au survol/focus.
  useEffect(() => {
    if (reduced || !inView || paused) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % ECOSYSTEM_CARDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, inView, paused]);

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section ref={sectionRef} className="bg-white py-[clamp(80px,10vw,124px)]">
      <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
            {t('sustainability.ecosystem.eyebrow')}
          </p>
        </motion.div>

        <motion.h2
          {...rise(0.06)}
          className="mt-5 text-[clamp(34px,5vw,58px)] font-bold leading-[1.05] tracking-[-0.035em] text-[#16201B]"
        >
          {t('sustainability.ecosystem.title')}
        </motion.h2>

        <div className="mt-[clamp(48px,6vw,76px)] grid grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] lg:grid-cols-12">
          {/* La roue : décorative, l'information vit entièrement dans la liste. */}
          <motion.div {...rise(0.12)} className="mx-auto w-full max-w-[320px] lg:col-span-5">
            <div className="relative aspect-square w-full">
              <svg viewBox="0 0 160 160" aria-hidden className="absolute inset-0 h-full w-full">
                <g transform="rotate(-90 80 80)">
                  {ECOSYSTEM_CARDS.map(({ id }, index) => (
                    <circle
                      key={id}
                      cx={80}
                      cy={80}
                      r={52}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="57.3 269.4"
                      strokeDashoffset={ARC_OFFSETS[index]}
                      stroke={index === activeIndex ? '#3E6B4C' : '#E4E0D6'}
                      strokeWidth={index === activeIndex ? 9 : 7}
                      style={{ transition: 'stroke 0.5s ease, stroke-width 0.5s ease' }}
                    />
                  ))}
                </g>
                <circle cx={80} cy={80} r={38} fill="#EDF2EA" />
              </svg>

              <div className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center gap-1">
                <Leaf size={22} strokeWidth={1.4} className="text-[#3E6B4C]" aria-hidden />
                <p className="text-[14px] font-semibold text-[#16201B]">
                  {t('sustainability.ecosystem.emblemTitle')}
                </p>
                <p className="font-mono text-[8.5px] tracking-[0.14em] text-[#3E6B4C]">
                  {t('sustainability.ecosystem.emblemSubtitle')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* La liste : chaque ligne pilote le même activeIndex que la roue. */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-[#E4E0D6]">
              {ECOSYSTEM_CARDS.map(({ id }, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div key={id} {...rise(index * 0.06)}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => {
                        setPaused(true);
                        setActiveIndex(index);
                      }}
                      onMouseLeave={() => setPaused(false)}
                      onFocus={() => {
                        setPaused(true);
                        setActiveIndex(index);
                      }}
                      onBlur={() => setPaused(false)}
                      aria-current={isActive}
                      className={cn(
                        'block w-full border-b border-[#E4E0D6] py-5 pe-[14px] text-start',
                        'transition-[background-color,padding] duration-[450ms] ease-out',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3E6B4C]',
                        isActive &&
                          'ps-[14px] bg-[linear-gradient(90deg,rgba(237,242,234,0.75),rgba(237,242,234,0))] rtl:bg-[linear-gradient(270deg,rgba(237,242,234,0.75),rgba(237,242,234,0))]',
                      )}
                    >
                      <p
                        className={cn(
                          'text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-0.02em] transition-colors duration-[450ms]',
                          isActive ? 'text-[#16201B]' : 'text-[#5C6862]',
                        )}
                      >
                        {cards[id].title}
                      </p>
                      <p className="mt-[5px] text-[15px] leading-[1.65] text-[#5C6862]">{cards[id].text}</p>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
