'use client';

import { Leaf } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { ECOSYSTEM_CARDS } from '@/lib/data/sustainability';

/** Notre impact sur la nature : emblème circulaire et cinq facettes de l'écosystème agricole. */
export function EcosystemSection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.ecosystem.cards;

  return (
    <Section>
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.ecosystem.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.ecosystem.title')}</h2>
      </Reveal>

      <div className="mt-section-gap grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-14">
        <Reveal from="scale" className="mx-auto w-full max-w-[280px] lg:mx-0">
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 300 300" aria-hidden className="absolute inset-0 h-full w-full">
              <circle cx="150" cy="150" r="140" className="fill-sage-50" />
              <circle
                cx="150"
                cy="150"
                r="118"
                className="animate-[spinSlow_80s_linear_infinite] fill-none stroke-sage-300 motion-reduce:animate-none"
                strokeWidth="1.5"
                strokeDasharray="4 14"
                style={{ transformOrigin: '150px 150px' }}
              />
              <circle cx="150" cy="150" r="88" className="fill-sage-200" />
              <circle cx="150" cy="150" r="56" className="fill-white" />
            </svg>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center">
              <Leaf size={26} className="text-leaf-600" aria-hidden />
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
              <Card tone={featured ? 'dark' : 'white'} interactive className="p-6">
                <h3 className={cn('text-[16px]', featured ? 'text-white' : 'text-ink-900')}>
                  {cards[id].title}
                </h3>
                <p className={cn('mt-2 text-[13.5px] leading-[1.65]', featured ? 'text-white/70' : 'text-ink-500')}>
                  {cards[id].text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
