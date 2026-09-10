'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { RESILIENCE_CARDS } from '@/lib/data/sustainability';

/** Trois piliers de résilience — anticiper, optimiser, préserver — illustrés en grandes cartes. */
export function ResilienceSection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.resilience.cards;

  return (
    <Section>
      <Reveal className="max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.resilience.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.resilience.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.resilience.lead')}</p>
      </Reveal>

      <Stagger className="mt-section-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RESILIENCE_CARDS.map(({ id, image }) => (
          <StaggerItem key={id} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft transition-[transform,box-shadow] duration-slow ease-premium hover:-translate-y-1.5 hover:shadow-hover motion-reduce:hover:translate-y-0">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={image}
                  alt={cards[id].imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="zoom-media object-cover"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[19px]">{cards[id].title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-ink-500">{cards[id].text}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
