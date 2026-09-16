'use client';

import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { localizePath, useTranslation } from '@/i18n';
import Link from 'next/link';
import { AppWindow } from '@/components/visuals/AppWindow';

const ENTRY_DELAYS = [0, 0.1, 0.18, 0.26, 0.34] as const;

/** Aperçu de la plateforme : arguments + maquette produit (fond clair). */
export function PlatformPreview() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(63,156,74,0.35),transparent_70%)] opacity-[0.09] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))] md:px-12 lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: ENTRY_DELAYS[0] }}
            className="flex items-center gap-2.5"
          >
            <span aria-hidden className="h-px w-10 bg-[#2F7D3A]" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2F7D3A]">
              {t('home.platformPreview.eyebrow')}
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: ENTRY_DELAYS[1] }}
            className="mt-4 max-w-[16ch] text-balance text-4xl font-semibold tracking-[-0.03em] leading-[1.06] text-[#0C1A12] md:text-5xl"
          >
            {t('home.platformPreview.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: ENTRY_DELAYS[2] }}
            className="mt-[18px] max-w-[50ch] leading-[1.68] text-[#5A6C61]"
          >
            {t('home.platformPreview.text')}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: ENTRY_DELAYS[3] }}
            className="mt-7 flex flex-col gap-3.5"
          >
            {t.list('home.platformPreview.points').map((point) => (
              <li key={point} className="flex items-start gap-3.5 text-[15px] text-[#0C1A12]">
                <Check size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#3F9C4A]" aria-hidden />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: ENTRY_DELAYS[4] }}
            className="mt-8"
          >
            <Link
              href={localizePath(locale, '/solutions')}
              className={[
                'group inline-flex items-center gap-2.5 rounded-full bg-[#3F9C4A] px-7 py-4 font-semibold text-white',
                'transition-[transform,background-color,box-shadow] duration-300 ease-out',
                'hover:-translate-y-[3px] hover:bg-[#2F7D3A] hover:shadow-[0_16px_32px_-14px_rgba(47,125,58,.55)]',
                'motion-reduce:hover:translate-y-0',
              ].join(' ')}
            >
              {t('actions.discoverPlatform')}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>

        <AppWindow />
      </div>
    </section>
  );
}
