'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { TechCard } from '@/sections/technology/TechCard';
import { TECH_BLOCKS } from '@/lib/data/technology';

/** Les quatre briques technologiques : intelligence artificielle, satellite, IoT, drone. */
export function TechBlocks() {
  const { d } = useTranslation();
  const blocks = d.technology.blocks;

  return (
    <Section tone="cream" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lime-500/[0.08] blur-[120px]"
      />

      <Stagger className="relative flex flex-col gap-5 lg:gap-6">
        {TECH_BLOCKS.map(({ id, icon, ...block }, index) => {
          const copy = blocks[id];
          const tone = 'tone' in block && block.tone === 'ocre' ? 'ocre' : 'leaf';
          const showScale = 'showScale' in block && block.showScale;

          let extra: ReactNode = null;
          if (copy.note) {
            extra = (
              <span className="inline-flex items-center gap-2 rounded-full bg-leaf-600/[0.08] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-leaf-600">
                <span
                  aria-hidden
                  className="inline-block h-3.5 w-3.5 shrink-0 animate-spin-slow rounded-full border-2 border-leaf-600 border-e-transparent"
                />
                {copy.note}
              </span>
            );
          } else if (showScale) {
            extra = (
              <div
                aria-hidden
                className="h-1.5 w-full rounded-full bg-index-scale ring-1 ring-forest-950/[0.06]"
              />
            );
          }

          return (
            <StaggerItem key={id}>
              <TechCard
                icon={icon}
                tone={tone}
                index={index}
                title={copy.title}
                text={copy.text}
                points={copy.points}
                extra={extra}
              />
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
