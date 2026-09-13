'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/i18n';
import { TechCard } from '@/sections/technology/TechCard';
import { TECH_BLOCKS } from '@/lib/data/technology';

/** Les quatre briques technologiques : intelligence artificielle, satellite, IoT, drone. */
export function TechBlocks() {
  const { d } = useTranslation();
  const blocks = d.technology.blocks;

  return (
    <section className="bg-white py-[clamp(64px,8vw,104px)]">
      <div className="mx-auto flex w-[min(1180px,calc(100%-48px))] flex-col gap-[18px]">
        {TECH_BLOCKS.map(({ id, icon, ...block }, index) => {
          const copy = blocks[id];
          const showScale = 'showScale' in block && block.showScale;

          let extra: ReactNode = null;
          if (copy.note) {
            extra = (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#E4E0D6] bg-[#EDF2EA] px-3.5 py-[7px] font-mono text-[10.5px] tracking-[0.1em] text-[#3E6B4C]">
                <span
                  aria-hidden
                  className="inline-block h-3.5 w-3.5 shrink-0 animate-[spin_4.5s_linear_infinite] rounded-full border-2 border-[#3E6B4C] border-e-transparent motion-reduce:animate-none"
                />
                {copy.note}
              </span>
            );
          } else if (showScale) {
            extra = <div aria-hidden className="h-1 w-full max-w-[420px] rounded-full bg-index-scale" />;
          }

          return (
            <TechCard
              key={id}
              icon={icon}
              index={index}
              title={copy.title}
              text={copy.text}
              points={copy.points}
              extra={extra}
              delay={index * 0.07}
            />
          );
        })}
      </div>
    </section>
  );
}
