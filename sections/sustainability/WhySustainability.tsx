'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { WHY_SUSTAINABILITY_CARDS } from '@/lib/data/sustainability';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Contexte : pourquoi la durabilité compte pour l'agriculture, puis quatre piliers. */
export function WhySustainability() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.why.cards;
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduced ? 0 : 0.65, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative overflow-hidden bg-white py-[clamp(80px,10vw,140px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[180px] end-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(125,155,112,0.14),rgba(125,155,112,0)_68%)]"
      />

      <div className="relative mx-auto w-[min(1180px,calc(100%-48px))]">
        <motion.p {...rise(0)} className="text-[13px] font-semibold tracking-[0.06em] text-[#3E6B4C]">
          {t('sustainability.why.eyebrow')}
        </motion.p>

        <motion.h2
          {...rise(0.06)}
          className="mt-[22px] max-w-[15ch] text-[clamp(36px,6vw,74px)] font-bold leading-[1.03] tracking-[-0.035em] text-[#16201B]"
        >
          {t('sustainability.why.title')}
        </motion.h2>

        <motion.div
          {...rise(0.14)}
          className="mt-10 grid grid-cols-1 gap-6 border-b border-[#E4E0D6] pb-[clamp(48px,6vw,72px)] md:grid-cols-12 md:gap-x-8"
        >
          <p className="text-[17px] font-medium leading-relaxed text-[#16201B] md:col-span-6 md:text-[20px]">
            {t('sustainability.why.lead1')}
          </p>
          <p className="text-[15.5px] leading-relaxed text-[#5C6862] md:col-span-5 md:col-start-8">
            {t('sustainability.why.lead2')}
          </p>
        </motion.div>

        <div className="mt-2">
          {WHY_SUSTAINABILITY_CARDS.map(({ id, icon: Icon }, index) => (
            <motion.div
              key={id}
              {...rise(index * 0.07)}
              className="group relative grid grid-cols-[32px_1fr] items-start gap-x-4 gap-y-1.5 border-b border-[#E4E0D6] py-[30px] transition-[padding,background-color] duration-500 hover:bg-[#EDF2EA]/60 hover:ps-5 md:grid-cols-[44px_4fr_6fr] md:items-center md:gap-x-[clamp(16px,3vw,40px)]"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 start-0 w-[2px] origin-top scale-y-0 bg-[#3E6B4C] transition-transform duration-500 group-hover:scale-y-100"
              />

              <Icon
                size={22}
                strokeWidth={1.6}
                aria-hidden
                className="text-[#7D9B70] transition-colors duration-500 group-hover:text-[#3E6B4C]"
              />

              <h3 className="text-[clamp(18px,1.8vw,22px)] font-semibold tracking-[-0.02em] text-[#16201B] md:col-start-2">
                {cards[id].title}
              </h3>
              <p className="col-start-2 max-w-[60ch] text-[15.5px] leading-[1.72] text-[#5C6862] md:col-start-3">
                {cards[id].text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
