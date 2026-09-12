'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { HOME_PILLARS } from '@/lib/data/home';
import { cn } from '@/lib/utils';

/** Chiffre clé + légende de chaque étape (chrome décoratif propre à cette frise). */
const STEP_METRICS: Record<string, { metric: string; caption: string }> = {
  satellite: { metric: '5 jours', caption: 'Cadence satellite' },
  sensors: { metric: '15 min', caption: 'Relevé capteur' },
  ai: { metric: 'Saison', caption: 'Ré-entraînement' },
  guidance: { metric: '24 h', caption: "Délai d'alerte" },
};

const GUIDANCE_CHANNELS = ['E-mail', 'SMS', 'WhatsApp', 'FR / EN / AR'];

/** Section « Qui nous sommes » : présentation + frise « de la mesure à la consigne ». */
export function About() {
  const { t, d } = useTranslation();
  const pillars = d.home.about.pillars;

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('home.about.eyebrow')}</p>
          <h2 className="mt-4 text-h2 font-bold tracking-[-0.02em]">{t('home.about.title')}</h2>
          <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('home.about.lead')}
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('home.about.body')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button href="/about" variant="primary">
              {t('actions.ourStory')}
            </Button>
            <Button href="/technologie" variant="outline">
              {t('actions.ourTechnology')}
            </Button>
          </div>
        </Reveal>

        <div>
          <div className="flex items-baseline justify-between gap-4 border-b border-forest-950/[0.08] pb-3.5">
            <h3 className="text-[16px] font-semibold text-ink-900">De la mesure à la consigne</h3>
            <span className="shrink-0 text-[12.5px] text-ink-300">4 étapes, en continu</span>
          </div>

          <div>
            {HOME_PILLARS.map(({ id }, index) => (
              <TimelineStep
                key={id}
                index={index}
                last={index === HOME_PILLARS.length - 1}
                metric={STEP_METRICS[id].metric}
                caption={STEP_METRICS[id].caption}
                title={pillars[id].title}
                text={pillars[id].text}
                channels={id === 'guidance' ? GUIDANCE_CHANNELS : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * Étape de la frise « mesure → consigne ». La dernière se détache dans une
 * carte sombre pleine (le canal de diffusion final), les autres restent sur
 * fond blanc, reliées par un filet vertical continu entre les puces.
 */
function TimelineStep({
  index,
  last,
  metric,
  caption,
  title,
  text,
  channels,
}: {
  index: number;
  last: boolean;
  metric: string;
  caption: string;
  title: string;
  text: string;
  channels?: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className={cn('grid grid-cols-[64px_24px_1fr] items-start gap-4 py-5', !last && 'border-b border-forest-950/[0.06]')}
    >
      <div>
        <p className="text-[19px] font-bold leading-none text-ink-900">{metric}</p>
        <p className="mt-2 font-mono text-[9.5px] uppercase leading-[1.35] tracking-[0.04em] text-ink-300">
          {caption}
        </p>
      </div>

      <div className="relative flex h-full justify-center self-stretch">
        {!last ? <span aria-hidden className="absolute top-3 bottom-0 w-px bg-sage-300" /> : null}
        <span
          aria-hidden
          className={cn(
            'relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2',
            last ? 'border-leaf-500 bg-leaf-500' : 'border-leaf-500/50 bg-white',
          )}
        />
      </div>

      {last ? (
        <div className="rounded-tile bg-forest-950 p-6 text-white">
          <p className="text-[15px] font-semibold">{title}</p>
          <p className="mt-1.5 text-[13.5px] leading-[1.6] text-white/70">{text}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {channels?.map((channel) => (
              <span
                key={channel}
                className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium text-lime-100"
              >
                {channel}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-[15px] font-semibold text-ink-900">{title}</p>
          <p className="mt-1.5 text-[13.5px] leading-[1.6] text-ink-500">{text}</p>
        </div>
      )}
    </motion.div>
  );
}
