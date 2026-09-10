'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { CheckRow } from '@/components/ui/Card';
import { SOIL_CHECKS } from '@/lib/data/sustainability';

/** Les sols : visuel de parcelle (couches superposées) et trois engagements de suivi. */
export function SoilSection() {
  const { t, d } = useTranslation();
  const checks = d.sustainability.soil.checks;

  return (
    <Section tone="sage">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <Reveal
          from="left"
          className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-card border border-forest-950/[0.08] shadow-soft"
        >
          <Image
            src="/hero/sols.jpg"
            alt={t('sustainability.soil.imageAlt')}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
        </Reveal>

        <Reveal className="min-w-0">
          <p className="eyebrow text-leaf-600">{t('sustainability.soil.eyebrow')}</p>
          <h2 className="mt-4 text-h2-alt">{t('sustainability.soil.title')}</h2>
          <p className="mt-5 text-body text-ink-500">{t('sustainability.soil.lead')}</p>
          <ul className="mt-7 flex flex-col gap-2.5">
            {SOIL_CHECKS.map((id) => (
              <CheckRow key={id}>{checks[id]}</CheckRow>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
