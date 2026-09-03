'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Crumb } from '@/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IndexScale } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  crumbs: readonly Crumb[];
  actions?: ReactNode;
  /** Bloc additionnel sous les actions (raccourcis, indicateurs). */
  children?: ReactNode;
  /** Le balayage lumineux du hero d'accueil. */
  sweep?: boolean;
  className?: string;
};

/**
 * Hero des pages internes : image de fond, dégradé, grille lime,
 * fil d'Ariane, titre et actions. Même grammaire que le hero d'accueil.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  actions,
  children,
  sweep = true,
  className,
}: Props) {
  return (
    <section
      className={cn(
        'relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-950 text-white',
        className,
      )}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,18,12,.9)_0%,rgba(6,18,12,.66)_45%,#06120C_100%)]" />
      <div className="grid-overlay absolute inset-0 -z-10" />
      {sweep ? (
        <div
          aria-hidden
          className="absolute inset-x-0 -z-10 h-44 animate-sweep bg-[linear-gradient(180deg,transparent,rgba(158,216,75,.14)_55%,rgba(158,216,75,.6))] mix-blend-screen"
        />
      ) : null}

      <div className="container-page flex flex-1 flex-col justify-center py-16 lg:py-28">
        <Reveal from="scale">
          <Breadcrumbs items={crumbs} />
        </Reveal>

        <Reveal className="mt-7 max-w-[48rem]" delay={0.06}>
          <p className="eyebrow text-lime-500">{eyebrow}</p>
          <h1 className="mt-4 text-h1 tracking-headline text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-[40rem] text-[16px] leading-[1.65] text-white/80 lg:text-[17px]">
            {intro}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3.5">{actions}</div> : null}
        </Reveal>

        {children ? (
          <Reveal className="mt-10 lg:mt-16" delay={0.12}>
            {children}
          </Reveal>
        ) : null}
      </div>

      <IndexScale />
    </section>
  );
}
