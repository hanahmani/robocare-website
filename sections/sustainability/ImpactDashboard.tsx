'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { SustainabilityMetric } from '@/components/ui/SustainabilityMetric';
import { IMPACT_METRICS } from '@/lib/data/sustainability';

/**
 * Tableau de bord d'impact : cinq indicateurs, actuellement en attente de
 * données consolidées (`--`). `IMPACT_METRICS` est la seule source à modifier
 * le jour où une valeur devient disponible.
 */
export function ImpactDashboard() {
  const { t, d } = useTranslation();
  const metrics = d.sustainability.dashboard.metrics;

  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Reveal className="relative max-w-[46rem]">
        <p className="eyebrow text-lime-500">{t('sustainability.dashboard.eyebrow')}</p>
        <h2 className="mt-4 text-h2 text-white">{t('sustainability.dashboard.title')}</h2>
      </Reveal>

      <Stagger className="relative mt-section-gap grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {IMPACT_METRICS.map(({ id, icon, value, prefix, suffix, unit }) => (
          <StaggerItem key={id} className="h-full">
            <SustainabilityMetric
              icon={icon}
              value={value}
              prefix={prefix}
              suffix={suffix}
              unit={unit}
              label={metrics[id].label}
              text={metrics[id].text}
              className="h-full"
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="relative mt-7 max-w-[52rem] border-s-2 border-lime-500/40 ps-4 text-[13.5px] leading-[1.7] text-white/60">
        <p>{t('sustainability.dashboard.note')}</p>
      </Reveal>
    </Section>
  );
}
