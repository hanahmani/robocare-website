'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { TechnologyCard } from '@/components/ui/TechnologyCard';
import { TECHNOLOGY_ITEMS } from '@/lib/data/sustainability';

/** Les quatre technologies (satellite, drone, IoT, IA), reliées par un filet de données. */
export function TechnologyGrid() {
  const { t, d } = useTranslation();
  const items = d.sustainability.technology.items;

  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Reveal className="relative max-w-[46rem]">
        <p className="eyebrow text-lime-500">{t('sustainability.technology.eyebrow')}</p>
        <h2 className="mt-4 text-h2 text-white">{t('sustainability.technology.title')}</h2>
      </Reveal>

      <Stagger className="relative mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TECHNOLOGY_ITEMS.map(({ id, icon, featured }, index) => (
          <StaggerItem key={id} className="h-full">
            <TechnologyCard
              icon={icon}
              index={index}
              featured={featured}
              tone="dark"
              title={items[id].title}
              text={items[id].text}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
