'use client';

import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { PLATFORM_CAPABILITIES } from '@/lib/data/platform';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Usages avancés de la plateforme : cartographie, analyse, alertes et gestion
 * d'exploitation. Complète les six modules sans les répéter — on y décrit ce
 * que l'utilisateur fait, pas la liste des écrans.
 */
export function PlatformCapabilities() {
  const { t, d } = useTranslation();
  const items = d.platform.capabilities.items;
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="bg-[#EDF2EA] py-[clamp(72px,9vw,112px)]">
      <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
            {t('platform.capabilities.eyebrow')}
          </p>
        </motion.div>

        <motion.h2
          {...rise(0.06)}
          className="my-[18px] mb-4 max-w-[18ch] text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-[#16201B]"
        >
          {t('platform.capabilities.title')}
        </motion.h2>

        <motion.p {...rise(0.12)} className="max-w-[62ch] text-[16.5px] leading-[1.7] text-[#5C6862]">
          {t('platform.capabilities.lead')}
        </motion.p>

        <div className="mt-[clamp(44px,5.5vw,68px)] grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLATFORM_CAPABILITIES.map(({ id, icon: Icon }, index) => {
            const copy = items[id];

            return (
              <motion.div key={id} {...rise(index * 0.08)} className="h-full">
                <article className="group flex h-full flex-col rounded-[18px] border border-[#E4E0D6] bg-white px-6 py-[26px] shadow-none transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-[5px] hover:border-[#CFDCC8] hover:shadow-[0_22px_46px_-30px_rgba(20,45,26,0.5)] motion-reduce:hover:translate-y-0">
                  <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-[#EDF2EA] text-[#3E6B4C] transition-colors duration-500 ease-out group-hover:bg-[#3E6B4C] group-hover:text-white">
                    <Icon size={20} strokeWidth={1.6} aria-hidden />
                  </span>

                  <h3 className="mt-5 text-[17px] font-semibold leading-[1.3] tracking-[-0.015em] text-[#16201B]">
                    {copy.title}
                  </h3>
                  <p className="mb-[26px] mt-2.5 text-[14.5px] leading-[1.7] text-[#5C6862]">{copy.text}</p>

                  <ul className="mt-auto flex flex-col gap-3 border-t border-[#E4E0D6] pt-[18px]">
                    {copy.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-1 shrink-0 text-[#3E6B4C]" aria-hidden />
                        <span className="text-[13.5px] leading-[1.55] text-[#5C6862]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
