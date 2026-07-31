'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BellRing, Check } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { HERO_MOISTURE_BARS, HERO_NDVI_VALUE } from '@/lib/data/home';
import { Button } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { EASE } from '@/lib/motion';

/**
 * Hero de la page d'accueil.
 * Design validé : composition, couleurs et animations inchangées — seuls les
 * textes passent par le dictionnaire.
 */
export function Hero() {
  const { t, d } = useTranslation();
  const cards = d.home.hero.cards;

  return (
    <section className="relative isolate bg-forest-950 pt-16 lg:pt-[150px]">
      {/* Fond : photo satellite, dégradés, grille et balayage lumineux */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/hero/satellite-field.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,12,.82)_0%,rgba(6,18,12,.5)_38%,rgba(6,18,12,.72)_72%,#06120C_100%)]" />
        <div className="grid-overlay absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-x-0 h-44 animate-sweep bg-[linear-gradient(180deg,transparent,rgba(158,216,75,.18)_55%,rgba(158,216,75,.75))] mix-blend-screen"
        />
      </div>

      <div className="container-page">
        <div className="max-w-[56rem]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-lime-500/35 bg-white/[0.08] py-[7px] pe-3.5 ps-2.5 backdrop-blur-md"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-lime-500" />
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-lime-500" />
            </span>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-lime-100">
              {t('home.hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-display text-white sm:text-[54px] lg:text-[78px]"
          >
            {t('home.hero.titleLead')}{' '}
            <span className="bg-[linear-gradient(100deg,#9ED84B,#4D9E2F_65%,#DCF3C9)] bg-clip-text text-transparent">
              {t('home.hero.titleAccent')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: EASE }}
            className="mt-6 max-w-[39rem] text-[16.5px] leading-[1.6] text-white/[0.82] lg:text-[20px]"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <Button href="/solutions" variant="primary" size="lg">
              {t('actions.seeSolutions')}
              <Arrow size={17} />
            </Button>
            <Button href="/contact" variant="outline-light" size="lg">
              {t('actions.requestDemo')}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] text-white/70"
          >
            <Check size={16} className="shrink-0 text-lime-500" aria-hidden />
            {t('home.hero.note')}
          </motion.p>
        </div>

        {/* Trois cartes de données flottantes */}
        <div className="mt-12 grid gap-4 pb-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:pb-[90px]">
          <div className="glass animate-floaty rounded-[18px] px-[22px] py-5">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60">
              <span>{cards.ndvi.label}</span>
              <span dir="ltr" className="text-lime-500">
                {cards.ndvi.delta}
              </span>
            </div>
            <div
              dir="ltr"
              className="mt-2.5 font-display text-[34px] font-semibold tracking-display text-white rtl:text-right"
            >
              {HERO_NDVI_VALUE}
            </div>
            <div className="mt-3.5 h-1.5 rounded-full bg-index-scale" />
          </div>

          <div className="glass animate-floaty-alt rounded-[18px] px-[22px] py-5">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60">
              {cards.moisture.label}
            </div>
            <div className="mt-2.5 flex h-[52px] items-end gap-2">
              {HERO_MOISTURE_BARS.map((bar, index) => (
                <motion.span
                  key={index}
                  initial={{ scaleY: 0.08 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.1 * index, ease: EASE }}
                  style={{ height: `${bar.height}%`, background: bar.color }}
                  className="flex-1 origin-bottom rounded"
                />
              ))}
            </div>
          </div>

          <div className="animate-floaty rounded-[18px] border border-danger/30 bg-white/[0.08] px-[22px] py-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#FFB3B6]">
              <BellRing size={14} aria-hidden />
              {cards.alert.label}
            </div>
            <div className="mt-2.5 text-[15px] font-bold leading-[1.4] text-white">
              {cards.alert.title}
            </div>
            <div className="mt-1.5 text-[13.5px] text-white/70">{cards.alert.text}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
