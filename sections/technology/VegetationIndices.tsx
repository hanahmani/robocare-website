'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { VEGETATION_INDICES } from '@/lib/data/technology';

/**
 * NDVI, NDRE, NDWI, SAVI : ce que chaque indice mesure et quand l'employer.
 *
 * Rendu en fiches plutôt qu'en tableau : à quatre colonnes de texte, un tableau
 * impose un défilement horizontal sur mobile et devient illisible. Chaque fiche
 * reste une liste de définitions (`<dl>`), donc correctement structurée pour
 * les lecteurs d'écran.
 */
export function VegetationIndices() {
  const { t, d } = useTranslation();
  const items = d.technology.indices.items;
  const columns = d.technology.indices.columns;

  return (
    <Section tone="sage">
      <SectionHeading
        eyebrow={t('technology.indices.eyebrow')}
        title={t('technology.indices.title')}
        subtitle={t('technology.indices.lead')}
      />

      <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2">
        {VEGETATION_INDICES.map(({ id, accent }) => {
          const copy = items[id];
          return (
            <StaggerItem key={id} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft transition-surface duration-slow ease-premium hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 hover:shadow-hover">
                {/* Filet de couleur : reprend la teinte de l'indice sur l'échelle */}
                <div aria-hidden className="h-1.5 w-full" style={{ background: accent }} />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <h3
                      dir="ltr"
                      className="font-display text-[26px] tracking-display"
                      style={{ color: accent }}
                    >
                      {copy.name}
                    </h3>
                    <p className="min-w-0 flex-1 truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-300">
                      {copy.full}
                    </p>
                  </div>

                  <dl className="mt-5 flex flex-1 flex-col gap-4">
                    <div>
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-300">
                        {columns.bands}
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] font-semibold text-ink-900">
                        {copy.bands}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-300">
                        {columns.measures}
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-500">
                        {copy.measures}
                      </dd>
                    </div>
                    <div className="flex-1">
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-300">
                        {columns.useFor}
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] leading-[1.6] text-ink-500">
                        {copy.useFor}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div aria-hidden className="mt-8 h-1.5 w-full rounded-full bg-index-scale" />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
        {t('technology.indices.note')}
      </p>
    </Section>
  );
}
