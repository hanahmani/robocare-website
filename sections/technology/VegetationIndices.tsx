'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { VEGETATION_INDICES } from '@/lib/data/technology';

const EASE = [0.22, 0.61, 0.36, 1] as const;

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
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="bg-[#F7F5F0] py-[clamp(72px,9vw,112px)]">
      <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
            {t('technology.indices.eyebrow')}
          </p>
        </motion.div>

        <motion.h2
          {...rise(0.06)}
          className="mt-[18px] max-w-[17ch] text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#16201B]"
        >
          {t('technology.indices.title')}
        </motion.h2>

        <motion.p {...rise(0.12)} className="mt-[18px] max-w-[64ch] text-[16.5px] leading-[1.7] text-[#5C6862]">
          {t('technology.indices.lead')}
        </motion.p>

        <div className="mt-[clamp(44px,5.5vw,68px)] grid grid-cols-1 items-stretch gap-5 min-[820px]:grid-cols-2">
          {VEGETATION_INDICES.map(({ id }, index) => {
            const copy = items[id];
            return (
              <motion.article
                key={id}
                {...rise(index * 0.07)}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E4E0D6] bg-white transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-[#CFDCC8] hover:shadow-[0_20px_44px_-30px_rgba(20,45,26,0.45)] motion-reduce:hover:translate-y-0"
              >
                <div
                  aria-hidden
                  className="h-[3px] w-full bg-[#E4E0D6] transition-colors duration-500 ease-out group-hover:bg-[#3E6B4C]"
                />

                <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 dir="ltr" className="text-[22px] font-bold tracking-[-0.01em] text-[#3E6B4C]">
                      {copy.name}
                    </h3>
                    <p className="min-w-0 flex-1 font-mono text-[9.5px] leading-[1.5] tracking-[0.09em] text-[#5C6862]">
                      {copy.full}
                    </p>
                  </div>

                  <dl className="mt-5 flex flex-1 flex-col">
                    <div className="mt-5 first:mt-0">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#7D9B70]">
                        {columns.bands}
                      </dt>
                      <dd className="mt-[7px] text-[14.5px] font-semibold leading-[1.65] text-[#16201B]">
                        {copy.bands}
                      </dd>
                    </div>
                    <div className="mt-5">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#7D9B70]">
                        {columns.measures}
                      </dt>
                      <dd className="mt-[7px] text-[14.5px] leading-[1.65] text-[#5C6862]">{copy.measures}</dd>
                    </div>
                    <div className="mt-5 flex-1">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#7D9B70]">
                        {columns.useFor}
                      </dt>
                      <dd className="mt-[7px] text-[14.5px] leading-[1.65] text-[#5C6862]">{copy.useFor}</dd>
                    </div>
                  </dl>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div {...rise(0.28)} className="mt-[clamp(36px,4.5vw,56px)]">
          <div aria-hidden className="h-[3px] w-full rounded-full bg-index-scale" />
          <p className="mt-3.5 font-mono text-[10.5px] tracking-[0.1em] text-[#5C6862]">
            {t('technology.indices.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
