'use client';

import { useRef, type RefObject } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Button } from '@/components/ui/Button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';
import { cn, pad2 } from '@/lib/utils';
import {
  SUSTAINABILITY_STEPS,
  SUSTAINABILITY_STEP_BULLETS,
  SUSTAINABILITY_RESULTS,
} from '@/lib/data/sustainability';

const STEP_COUNT = SUSTAINABILITY_STEPS.length;

type Chip = { label: string; value: string; note: string };

/**
 * `bullets` a une forme différente selon l'étape (clés distinctes par id) :
 * TypeScript ne corrèle pas `id` entre les deux tableaux indexés dans le
 * `.map` appelant, d'où ce passage par un type structurel commun.
 */
function pickBullets(bullets: Record<string, string>, ids: readonly string[]): string[] {
  return ids.map((id) => bullets[id]);
}

/**
 * « Comment nous rendons l'agriculture plus durable » : la méthode en trois
 * temps (mesurer, décider, prouver), une photo par étape, puis un bandeau de
 * résultats indicatifs. Ouvre le parcours durabilité, juste après le hero.
 */
export function SustainabilitySteps() {
  const { t, d } = useTranslation();
  const steps = d.sustainability.steps;

  return (
    <Section>
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.steps.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.steps.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.steps.lead')}</p>
      </Reveal>

      <div className="mt-section-gap space-y-20 md:space-y-28">
        {SUSTAINABILITY_STEPS.map(({ id, image, cta }, index) => (
          <StepBlock
            key={id}
            index={index}
            last={index === STEP_COUNT - 1}
            imageOnLeft={index % 2 === 1}
            image={image}
            phase={steps[id].phase}
            title={steps[id].title}
            text={steps[id].text}
            bullets={pickBullets(steps[id].bullets, SUSTAINABILITY_STEP_BULLETS[id])}
            imageAlt={steps[id].imageAlt}
            chip={steps[id].chip}
            cta={cta ? { label: steps[id].cta, href: '/contact' } : undefined}
          />
        ))}
      </div>

      <Reveal className="mt-section-gap-lg grid gap-px overflow-hidden rounded-panel bg-sage-300/50 ring-1 ring-sage-300/50 sm:grid-cols-3">
        {SUSTAINABILITY_RESULTS.map((id) => (
          <div key={id} className="bg-white p-8">
            <p className="font-display text-4xl text-ink-900">{steps.results[id].value}</p>
            <p className="mt-2 text-[15px] text-ink-500">{steps.results[id].label}</p>
          </div>
        ))}
      </Reveal>
      <p className="mt-4 text-[13px] text-ink-400">{t('sustainability.steps.resultsNote')}</p>
    </Section>
  );
}

function StepBlock({
  index,
  last,
  imageOnLeft,
  image,
  phase,
  title,
  text,
  bullets,
  imageAlt,
  chip,
  cta,
}: {
  index: number;
  last: boolean;
  imageOnLeft: boolean;
  image: string;
  phase: string;
  title: string;
  text: string;
  bullets: readonly string[];
  imageAlt: string;
  chip: Chip;
  cta?: { label: string; href: string };
}) {
  const railWrapRef = useRef<HTMLDivElement>(null);

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className="min-w-0">
        <div ref={railWrapRef} className="relative ps-11">
          <StepBadge index={index} />
          {!last ? <StepRail containerRef={railWrapRef} /> : null}

          <Stagger stagger={0.1}>
            <StaggerItem>
              <p className="text-sm font-semibold text-leaf-600">{phase}</p>
              <h3 className="mt-2 text-h3-lg">{title}</h3>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[54ch] text-body text-ink-500">{text}</p>
            </StaggerItem>
            <Stagger as="ul" stagger={0.07} delay={0.15} className="mt-6 flex flex-col gap-2.5">
              {bullets.map((bullet) => (
                <StaggerItem
                  as="li"
                  key={bullet}
                  className="flex gap-3 text-[15px] leading-[1.7] text-ink-500"
                >
                  <span aria-hidden className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-leaf-500" />
                  <span>{bullet}</span>
                </StaggerItem>
              ))}
            </Stagger>
            {cta ? (
              <StaggerItem>
                <Button href={cta.href} className="mt-7">
                  {cta.label}
                </Button>
              </StaggerItem>
            ) : null}
          </Stagger>
        </div>
      </div>

      <Reveal delay={0.15} className={cn('relative min-w-0', imageOnLeft && 'md:order-first')}>
        <StepPhoto image={image} imageAlt={imageAlt} chip={chip} />
      </Reveal>
    </article>
  );
}

/** Numéro d'étape : léger « pop » d'échelle et anneau lumineux qui s'estompe, joués une seule fois à l'entrée dans le viewport. */
function StepBadge({ index }: { index: number }) {
  return (
    <span className="absolute start-0 top-0 h-9 w-9">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-leaf-500/35"
        initial={{ scale: 1, opacity: 0.55 }}
        whileInView={{ scale: 1.8, opacity: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.span
        dir="ltr"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-leaf-500/30 bg-white font-mono text-[11px] tracking-[0.1em] text-leaf-600 tabular-nums shadow-soft"
        initial={{ scale: 0.55, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {pad2(index)}
      </motion.span>
    </span>
  );
}

/** Segment de filet qui se dessine de haut en bas au fil du scroll, à l'intérieur de son propre bloc (voir note en fin de fichier). */
function StepRail({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.85', 'start 0.3'] });

  return (
    <span
      aria-hidden
      className="absolute start-[17px] top-11 bottom-1 w-px overflow-hidden rounded-full bg-sage-300"
    >
      <motion.span
        className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-leaf-500 to-lime-500/40"
        style={{ scaleY: scrollYProgress, height: '100%' }}
      />
    </span>
  );
}

/**
 * `clipPath` anime hors du périmètre de `MotionProvider` (qui ne neutralise
 * que x/y/scale/rotate) : on court-circuite donc soi-même l'effet de
 * « balayage » quand l'utilisateur préfère moins d'animation, comme le fait
 * déjà `FootprintSection` pour son point orbital. Le parallaxe (un `y`) est en
 * revanche neutralisé automatiquement par `MotionProvider`, sans code dédié.
 */
function StepPhoto({ image, imageAlt, chip }: { image: string; imageAlt: string; chip: Chip }) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const frameClass =
    'group relative aspect-[6/5] overflow-hidden rounded-card ring-1 ring-forest-950/[0.08] shadow-soft transition-[transform,box-shadow] duration-slow ease-premium hover:-translate-y-1 hover:shadow-hover motion-reduce:hover:translate-y-0 sm:aspect-[16/11]';
  const imageClass =
    'scale-[1.1] object-cover transition-transform duration-slow ease-premium group-hover:scale-[1.16] motion-reduce:!scale-100';

  return (
    <figure className="relative">
      {reduced ? (
        <div ref={frameRef} className={frameClass}>
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className={imageClass} />
        </div>
      ) : (
        <motion.div
          ref={frameRef}
          className={frameClass}
          initial={{ opacity: 0, clipPath: 'inset(0% 0% 14% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.reveal, ease: EASE }}
        >
          <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className={imageClass} />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="absolute -bottom-6 start-6 rounded-tile bg-white/90 px-5 py-4 shadow-lift ring-1 ring-forest-950/[0.08] backdrop-blur"
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
      >
        <p className="text-xs text-ink-400">{chip.label}</p>
        <p className="font-display text-2xl text-ink-900">
          {chip.value} <span className="align-middle text-sm font-medium text-leaf-600">{chip.note}</span>
        </p>
      </motion.div>
    </figure>
  );
}

/**
 * Le filet reste contenu dans le bloc de chaque étape plutôt que de relier
 * physiquement les trois badges : leur colonne alterne gauche/droite avec
 * l'image (`md:order-first`), donc aucune ligne droite ne peut les traverser
 * tous. Chaque segment se dessine néanmoins au scroll, ce qui donne la même
 * sensation de « colonne vertébrale » progressive sans forcer une mise en
 * page à trois colonnes.
 */
