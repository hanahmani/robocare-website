'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { ECOSYSTEM_CARDS } from '@/lib/data/sustainability';

/** Notre impact sur la nature : emblème circulaire et cinq facettes de l'écosystème agricole. */
export function EcosystemSection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.ecosystem.cards;
  const reduced = usePrefersReducedMotion();

  return (
    <Section>
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.ecosystem.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.ecosystem.title')}</h2>
      </Reveal>

      <div className="mt-section-gap grid gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-center lg:gap-16">
        <Reveal from="scale" className="mx-auto w-full max-w-[300px] lg:mx-0">
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 300 300" aria-hidden className="absolute inset-0 h-full w-full">
              <circle cx="150" cy="150" r="140" className="fill-sage-50" />
              <motion.circle
                cx="150"
                cy="150"
                r="118"
                className="fill-none stroke-sage-300"
                strokeWidth="1.5"
                strokeDasharray="4 14"
                style={{ transformOrigin: '150px 150px' }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="88"
                className="fill-sage-200"
                animate={reduced ? undefined : { scale: [1, 1.025, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '150px 150px' }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="88"
                className="fill-none stroke-leaf-500"
                strokeWidth="1"
                initial={false}
                animate={reduced ? undefined : { scale: [0.96, 1.22], opacity: [0, 0.22, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformOrigin: '150px 150px' }}
              />
              <motion.circle
                cx="150"
                cy="32"
                r="3.5"
                className="fill-leaf-500"
                style={{ transformOrigin: '150px 150px' }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              />
              <circle cx="150" cy="150" r="103" className="fill-none stroke-sage-200" strokeWidth="1" />
              <circle cx="150" cy="150" r="56" className="fill-white" />
            </svg>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center">
              <motion.span
                className="inline-flex"
                animate={reduced ? undefined : { y: [0, -3, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf size={26} className="text-leaf-600" aria-hidden />
              </motion.span>
              <p className="text-[15px] font-semibold text-ink-900">
                {t('sustainability.ecosystem.emblemTitle')}
              </p>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                {t('sustainability.ecosystem.emblemSubtitle')}
              </p>
            </div>
          </div>
        </Reveal>

        <Stagger className="grid gap-3.5 sm:grid-cols-2">
          {ECOSYSTEM_CARDS.map(({ id, featured }) => (
            <StaggerItem key={id} className={cn('h-full', featured && 'sm:col-span-2')}>
              <motion.article
                className={cn(
                  'flex h-full flex-col rounded-tile border p-6 transition-[border-color,box-shadow] duration-base ease-premium',
                  featured
                    ? 'border-forest-900 bg-forest-900 text-white shadow-soft'
                    : 'border-forest-950/[0.08] bg-white text-ink-900 shadow-soft hover:border-sage-300',
                )}
                whileHover={reduced ? undefined : { y: -3 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <h3 className={cn('text-[16px]', featured ? 'text-white' : 'text-ink-900')}>
                  {cards[id].title}
                </h3>
                <p className={cn('mt-2 text-[13.5px] leading-[1.65]', featured ? 'text-white/70' : 'text-ink-500')}>
                  {cards[id].text}
                </p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
