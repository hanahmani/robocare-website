'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { cn, pad2 } from '@/lib/utils';
import { WATER_STEPS } from '@/lib/data/sustainability';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const CYCLE_MS = 2600;

/** L'eau : introduction et parcours de décision en quatre étapes, sur rail vertical. */
export function WaterSection() {
  const { t, d } = useTranslation();
  const steps = d.sustainability.water.steps;
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(reduced ? WATER_STEPS.length - 1 : 0);
  const [paused, setPaused] = useState(false);
  const [fillHeight, setFillHeight] = useState(0);

  // Avance automatique : seulement section visible, en pause au survol/focus.
  useEffect(() => {
    if (reduced || !inView || paused) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % WATER_STEPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, inView, paused]);

  const measure = useCallback(() => {
    const dot = dotRefs.current[activeIndex];
    const rail = railRef.current;
    if (!dot || !rail) return;
    const railRect = rail.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    setFillHeight(dotRect.top + dotRect.height / 2 - railRect.top);
  }, [activeIndex]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [measure]);

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-[clamp(80px,10vw,128px)]">
      <Droplet
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute top-[8%] end-[-90px] hidden h-[340px] w-[340px] text-[#7D9B70] opacity-[0.07] min-[900px]:block"
      />

      <div className="relative mx-auto grid w-[min(1180px,calc(100%-48px))] grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div {...rise(0)} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
              {t('sustainability.water.eyebrow')}
            </p>
          </motion.div>

          <motion.h2
            {...rise(0.06)}
            className="my-5 max-w-[14ch] text-[clamp(34px,5.2vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-[#16201B]"
          >
            {t('sustainability.water.title')}
          </motion.h2>

          <div className="max-w-[56ch] space-y-[18px]">
            <motion.p {...rise(0.12)} className="text-[16px] leading-[1.75] text-[#5C6862]">
              {t('sustainability.water.lead1')}
            </motion.p>
            <motion.p {...rise(0.17)} className="text-[16px] leading-[1.75] text-[#5C6862]">
              {t('sustainability.water.lead2')}
            </motion.p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-2.5">
          <div ref={railRef} className="relative ps-[34px]">
            <div aria-hidden className="absolute inset-y-3 start-[7px] w-[2px] bg-[#E4E0D6]" />
            <div
              aria-hidden
              className="absolute start-[7px] top-3 w-[2px] bg-[#3E6B4C] transition-[height] duration-[800ms] ease-out"
              style={{ height: Math.max(0, fillHeight - 12) }}
            />

            {WATER_STEPS.map(({ id }, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div key={id} {...rise(index * 0.08)} className="relative py-[22px]">
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
                    className="block w-full text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3E6B4C]"
                  >
                    <span
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      aria-hidden
                      className={cn(
                        'absolute start-[-34px] top-[27px] h-4 w-4 rounded-full border-[1.5px] bg-white transition-[background-color,border-color,box-shadow] duration-500',
                        isActive
                          ? 'border-[#3E6B4C] bg-[#3E6B4C] shadow-[0_0_0_5px_rgba(62,107,76,0.12)]'
                          : 'border-[#E4E0D6]',
                      )}
                    />
                    <span
                      dir="ltr"
                      className={cn(
                        'font-mono text-[11px] tracking-[0.06em] transition-colors duration-500',
                        isActive ? 'text-[#3E6B4C]' : 'text-[#7D9B70]',
                      )}
                    >
                      {pad2(index)}
                    </span>
                    <span
                      className={cn(
                        'mt-[7px] block text-[clamp(17px,1.5vw,21px)] tracking-[-0.015em] transition-colors duration-500',
                        isActive ? 'font-semibold text-[#16201B]' : 'text-[#5C6862]',
                      )}
                    >
                      {steps[id]}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
