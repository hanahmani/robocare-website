'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { MetricCell } from '@/sections/impact/MetricCell';
import { cn } from '@/lib/utils';
import { padCropIndicators, type CropIndicator } from '@/lib/data/impact';

type Props = {
  /** Absent quand aucune solution dédiée ne couvre la culture : la carte n'est alors pas cliquable. */
  href?: string;
  image: string;
  title: string;
  description: string;
  indicators: readonly CropIndicator[];
  seeSolutionLabel: string;
};

const CARD_CLASS =
  'group flex h-full flex-col overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft';
const LINK_CLASS =
  'transition-surface duration-slow ease-premium hover:-translate-y-1.5 hover:border-leaf-600/30 hover:shadow-hover focus-visible:ring-2 focus-visible:ring-leaf-600/40 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0';

/** Carte culture de la section « Détail par culture » — toute la carte est cliquable quand une solution existe. */
export function CultureCard({ href, image, title, description, indicators, seeSolutionLabel }: Props) {
  const slots = padCropIndicators(indicators);

  const body: ReactNode = (
    <>
      <div className="relative h-[180px] shrink-0 overflow-hidden bg-forest-900 sm:h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="zoom-media object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 tracking-[-0.02em] text-ink-900">{title}</h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.7] text-ink-500">{description}</p>

        <div className="mt-[18px] grid grid-cols-3 gap-3 border-t border-forest-950/[0.06] pt-4">
          {slots.map((indicator, index) => (
            <MetricCell key={indicator?.label ?? `empty-${index}`} indicator={indicator} />
          ))}
        </div>

        {href ? (
          <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-leaf-600">
            {seeSolutionLabel}
            <Arrow
              size={15}
              className="transition-transform duration-base ease-premium group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </span>
        ) : null}
      </div>
    </>
  );

  if (!href) return <article className={CARD_CLASS}>{body}</article>;

  return (
    <Link href={href} className={cn(CARD_CLASS, LINK_CLASS)}>
      {body}
    </Link>
  );
}
