'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { IconChip } from '@/components/ui/Card';
import { BIODIVERSITY_CARDS } from '@/lib/data/sustainability';

/** Biodiversité : trois cartes translucides sur fond sage, deux halos flottants en décor. */
export function BiodiversitySection() {
  const { t, d } = useTranslation();
  const cards = d.sustainability.biodiversity.cards;

  return (
    <Section tone="sage" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 end-[-60px] h-[260px] w-[260px] animate-floaty rounded-full bg-lime-500/[0.16] blur-[70px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 start-[-40px] h-[200px] w-[200px] animate-floaty-alt rounded-full bg-leaf-600/[0.08] blur-[70px]"
      />

      <Reveal className="relative max-w-[46rem]">
        <p className="eyebrow text-leaf-600">{t('sustainability.biodiversity.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt">{t('sustainability.biodiversity.title')}</h2>
        <p className="mt-5 text-body text-ink-500">{t('sustainability.biodiversity.lead')}</p>
      </Reveal>

      <Stagger className="relative mt-section-gap grid gap-5 sm:grid-cols-3">
        {BIODIVERSITY_CARDS.map(({ id, icon: Icon }) => (
          <StaggerItem key={id} className="h-full">
            <article className="flex h-full flex-col rounded-card border border-forest-950/[0.07] bg-white/70 p-7 backdrop-blur-xl transition-[transform,background-color] duration-slow ease-premium hover:-translate-y-1.5 hover:bg-white motion-reduce:hover:translate-y-0">
              <IconChip>
                <Icon size={22} aria-hidden />
              </IconChip>
              <h3 className="mt-5 text-[18px]">{cards[id].title}</h3>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-ink-400">{cards[id].text}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
