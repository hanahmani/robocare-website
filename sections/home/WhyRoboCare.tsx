'use client';

import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { HOME_BENEFITS } from '@/lib/data/home';

/** « Pourquoi RoboCare » : six bénéfices, présentés en grille de cartes vertes très claires. */
export function WhyRoboCare() {
  const { t, d } = useTranslation();
  const items = d.home.why.items;

  return (
    <section className="bg-gradient-to-b from-white to-[#F7FBF8] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-12">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="h-px w-10 bg-[#2F7D3A]" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2F7D3A]">
            {t('home.why.eyebrow')}
          </p>
        </div>
        <h2 className="mt-4 max-w-[18ch] text-4xl font-semibold tracking-[-0.03em] leading-[1.06] text-[#0C1A12] md:text-5xl">
          {t('home.why.title')}
        </h2>
        <p className="mt-4 max-w-[58ch] leading-relaxed text-[#5A6C61]">{t('home.why.lead')}</p>

        <div className="mt-12 grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {HOME_BENEFITS.map(({ id, icon }, index) => (
            <BenefitCard key={id} index={index} icon={icon} title={items[id].title} text={items[id].text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  index,
  icon: Icon,
  title,
  text,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.07 }}
      className={[
        'group relative flex flex-col overflow-hidden rounded-[18px] border p-8',
        'border-[#3F9C4A]/15 bg-[#F6FBF7]',
        'transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none',
        'hover:-translate-y-[5px] hover:border-[#3F9C4A]/35 hover:bg-white hover:shadow-[0_14px_34px_rgba(16,40,26,0.09)]',
        'motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-[140px] w-[140px] rounded-full bg-[radial-gradient(circle,rgba(63,156,74,0.15),transparent_70%)] opacity-0 blur-lg transition-opacity duration-300 ease-out group-hover:opacity-100"
      />

      <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-[#3F9C4A]/20 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0">
        <Icon size={21} strokeWidth={1.5} className="text-[#2F7D3A]" aria-hidden />
      </span>

      <h3 className="relative mt-6 text-balance text-[19px] font-semibold tracking-[-0.014em] leading-tight text-[#0C1A12]">
        {title}
      </h3>
      <p className="relative mt-3 text-pretty text-[14.5px] leading-[1.68] text-[#5A6C61]">{text}</p>
    </motion.article>
  );
}
