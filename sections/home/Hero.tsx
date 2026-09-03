'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { BellRing, Check } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { HERO_MOISTURE_BARS, HERO_NDVI_VALUE } from '@/lib/data/home';
import { Button } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { Arrow } from '@/components/ui/Arrow';
import { EASE, VIEWPORT } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Orchestration de l'entrée : un seul conteneur cadence badge → titre →
 * description → boutons → mention. Passer par `staggerChildren` plutôt que par
 * un `delay` écrit à la main sur chaque bloc garde la cascade cohérente si un
 * élément est ajouté ou retiré.
 */
const HERO_STAGGER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } },
};

/** Amplitude volontairement faible : le hero doit se poser, pas surgir. */
const HERO_ITEM: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Classe commune aux trois cartes de données flottantes.
 *
 * Le survol ne touche pas à `transform` : ces cartes portent déjà l'animation
 * CSS `animate-floaty`, et une keyframe CSS l'emporte sur les styles inline
 * comme sur les utilitaires — une translation au survol serait simplement
 * ignorée. Le retour visuel passe donc par la bordure et l'ombre, et
 * l'animation d'entrée est portée par un conteneur séparé.
 */
const HERO_CARD =
  'h-full rounded-chip px-[22px] py-5 transition-[border-color,box-shadow,background-color] duration-slow ease-premium hover:shadow-lift';

/**
 * Hero de la page d'accueil.
 * Design validé : composition, couleurs et animations inchangées — seuls les
 * textes passent par le dictionnaire.
 */
export function Hero() {
  const { t, d } = useTranslation();
  const cards = d.home.hero.cards;
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  /*
   * Parallaxe du fond : l'image se déplace deux fois moins vite que le
   * défilement, ce qui donne de la profondeur sans jamais découvrir ses bords
   * (elle est agrandie de 12 %). `useScroll` sur une cible ne mesure que tant
   * que la section est à l'écran, et l'animation ne touche que `translateY`.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={sectionRef} className="relative isolate bg-forest-950 pt-16 lg:pt-[150px]">
      {/* Fond : photo satellite, dégradés, grille et balayage lumineux */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: backgroundY }}
        >
          <Image
            src="/hero/satellite-field.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.12] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,12,.82)_0%,rgba(6,18,12,.5)_38%,rgba(6,18,12,.72)_72%,#06120C_100%)]" />
        <div className="grid-overlay absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-x-0 h-44 animate-sweep bg-[linear-gradient(180deg,transparent,rgba(158,216,75,.18)_55%,rgba(158,216,75,.75))] mix-blend-screen"
        />
      </div>

      <div className="container-page">
        <motion.div
          className="max-w-[56rem]"
          variants={HERO_STAGGER}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={HERO_ITEM}
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
            variants={HERO_ITEM}
            className="mt-6 text-display font-semibold tracking-display text-white"
          >
            {t('home.hero.titleLead')}{' '}
            <span className="bg-[linear-gradient(100deg,#9ED84B,#4D9E2F_65%,#DCF3C9)] bg-clip-text text-transparent">
              {t('home.hero.titleAccent')}
            </span>
          </motion.h1>

          <motion.p
            variants={HERO_ITEM}
            className="mt-6 max-w-[39rem] text-lead text-white/[0.82]"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div variants={HERO_ITEM} className="mt-9 flex flex-wrap gap-3.5">
            <Button href="/solutions" variant="primary" size="lg">
              {t('actions.seeSolutions')}
              <Arrow size={17} />
            </Button>
            <RequestDemoButton variant="outline-light" size="lg" />
          </motion.div>

          <motion.p
            variants={HERO_ITEM}
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] text-white/70"
          >
            <Check size={16} className="shrink-0 text-lime-500" aria-hidden />
            {t('home.hero.note')}
          </motion.p>
        </motion.div>

        {/* Trois cartes de données flottantes. Elles sont sous la ligne de
            flottaison sur mobile : elles entrent au scroll, pas au chargement. */}
        <motion.div
          variants={HERO_STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-section-gap-lg grid gap-4 pb-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:pb-[90px]"
        >
          {/* Chaque carte empile trois couches de `transform` indépendantes :
              l'entrée (framer, sur le wrapper), le flottement (keyframe CSS,
              au milieu), le contenu. Les superposer sur un seul nœud ferait
              gagner la keyframe et annulerait l'entrée. */}
          <motion.div variants={HERO_ITEM}>
            <div className="h-full animate-floaty">
              <div className={cn('glass', HERO_CARD)}>
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
            </div>
          </motion.div>

          <motion.div variants={HERO_ITEM}>
            <div className="h-full animate-floaty-alt">
              <div className={cn('glass', HERO_CARD)}>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60">
                  {cards.moisture.label}
                </div>
                <div className="mt-2.5 flex h-[52px] items-end gap-2">
                  {HERO_MOISTURE_BARS.map((bar, index) => (
                    <motion.span
                      key={index}
                      initial={{ scaleY: 0.08 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.7, delay: 0.07 * index, ease: EASE }}
                      style={{ height: `${bar.height}%`, background: bar.color }}
                      className="flex-1 origin-bottom rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={HERO_ITEM}>
            <div className="h-full animate-floaty">
              <div
                className={cn(
                  'border border-danger/30 bg-white/[0.08] backdrop-blur-xl',
                  HERO_CARD,
                )}
              >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
