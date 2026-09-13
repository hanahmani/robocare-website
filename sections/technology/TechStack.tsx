'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { TECH_STACK } from '@/lib/data/technology';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Vision par ordinateur, machine learning, big data, API, SIG et protocoles :
 * ce que recouvrent concrètement ces termes dans la plateforme. Onglets
 * verticaux sur desktop (≥900px) ; blocs statiques empilés en dessous — les
 * six paragraphes restent toujours dans le DOM, pour l'indexation.
 */
export function TechStack() {
  const { t, d } = useTranslation();
  const items = d.technology.stack.items;
  const reduced = useReducedMotion();
  const isWide = useMediaQuery('(min-width: 900px)');
  const [activeIndex, setActiveIndex] = useState(0);

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="bg-white py-[clamp(72px,9vw,112px)]">
      <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
            {t('technology.stack.eyebrow')}
          </p>
        </motion.div>

        <motion.h2
          {...rise(0.06)}
          className="mt-[18px] max-w-[17ch] text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#16201B]"
        >
          {t('technology.stack.title')}
        </motion.h2>

        <motion.p {...rise(0.12)} className="mt-4 max-w-[66ch] text-[16.5px] leading-[1.7] text-[#5C6862]">
          {t('technology.stack.lead')}
        </motion.p>

        <div className="mt-[clamp(48px,6vw,72px)] grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] min-[900px]:grid-cols-12">
          <motion.div
            {...rise(0.17)}
            role="tablist"
            aria-label={t('technology.stack.title')}
            className="min-[900px]:col-span-5 min-[900px]:border-t min-[900px]:border-[#E4E0D6]"
          >
            {TECH_STACK.map(({ id }, index) => {
              const copy = items[id];
              const isActive = index === activeIndex;

              return (
                <div key={id} className="border-b border-[#E4E0D6]">
                  <button
                    type="button"
                    role="tab"
                    id={`tech-stack-tab-${id}`}
                    aria-selected={isActive}
                    aria-controls={`tech-stack-panel-${id}`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => {
                      if (isWide) setActiveIndex(index);
                    }}
                    className={cn(
                      'block w-full border-s-2 border-transparent py-[17px] pe-3.5 text-start',
                      'transition-[background-color,border-color,padding] duration-[450ms] ease-out',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3E6B4C]',
                      isActive &&
                        'ps-3.5 border-s-[#3E6B4C] bg-[linear-gradient(90deg,rgba(237,242,234,0.75),rgba(237,242,234,0))] rtl:bg-[linear-gradient(270deg,rgba(237,242,234,0.75),rgba(237,242,234,0))]',
                    )}
                  >
                    <p
                      className={cn(
                        'font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-[450ms]',
                        isActive ? 'text-[#3E6B4C]' : 'text-[#7D9B70]',
                      )}
                    >
                      {copy.tag}
                    </p>
                    <p
                      className={cn(
                        'mt-1.5 text-[16.5px] leading-[1.35] transition-colors duration-[450ms]',
                        isActive ? 'font-semibold text-[#16201B]' : 'font-medium text-[#5C6862]',
                      )}
                    >
                      {copy.title}
                    </p>
                  </button>

                  {/* Mobile (<900px) uniquement : bloc statique, tout le contenu visible d'emblée. */}
                  <p className="pb-[18px] ps-3.5 text-[15px] leading-[1.7] text-[#5C6862] min-[900px]:hidden">
                    {copy.text}
                  </p>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            {...rise(0.22)}
            className="hidden min-h-[280px] pt-1 min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:block"
          >
            {TECH_STACK.map(({ id, icon: Icon }, index) => {
              const copy = items[id];
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={id}
                  id={`tech-stack-panel-${id}`}
                  role="tabpanel"
                  aria-labelledby={`tech-stack-tab-${id}`}
                  hidden={!isActive}
                  initial={false}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                  className={isActive ? 'block' : 'hidden'}
                >
                  <span className="grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-[#EDF2EA] text-[#3E6B4C]">
                    <Icon size={22} strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-[18px] max-w-[20ch] text-[clamp(21px,2.2vw,28px)] font-semibold tracking-[-0.025em] text-[#16201B]">
                    {copy.title}
                  </h3>
                  <p className="mt-3.5 max-w-[58ch] text-[15.5px] leading-[1.75] text-[#5C6862]">{copy.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
