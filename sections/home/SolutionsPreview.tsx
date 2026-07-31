'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { SOLUTIONS } from '@/lib/data/solutions';

/** Aperçu des quatre solutions, avec renvoi vers la page dédiée. */
export function SolutionsPreview() {
  const { t, d } = useTranslation();
  const items = d.solutions.items;

  return (
    <Section tone="sage">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[42rem]">
          <p className="eyebrow text-leaf-600">{t('home.solutionsPreview.eyebrow')}</p>
          <h2 className="mt-4 text-[30px] leading-[1.04] sm:text-[38px] lg:text-[52px]">
            {t('home.solutionsPreview.title')}
          </h2>
        </div>
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2.5 text-[15px] font-bold text-leaf-600"
        >
          {t('actions.allSolutions')}
          <Arrow />
        </Link>
      </Reveal>

      <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {SOLUTIONS.map((solution) => {
          const copy = items[solution.slug];
          return (
            <StaggerItem key={solution.slug} className="h-full">
              <Link
                href={`/solutions#${solution.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-forest-950/[0.08] bg-white text-ink-900 shadow-soft transition-all duration-[400ms] ease-premium hover:-translate-y-2.5 hover:text-ink-900 hover:shadow-hover motion-reduce:hover:translate-y-0"
              >
                <div className="relative h-[190px] overflow-hidden bg-forest-900">
                  <Image
                    src={solution.image}
                    alt={copy.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover opacity-90 transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,18,12,.78))]" />
                  <span className="absolute bottom-3.5 start-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-lime-500">
                    {copy.brand}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[21px] tracking-[-0.02em]">{copy.name}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-ink-500">
                    {copy.short}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
