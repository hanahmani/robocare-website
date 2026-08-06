'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { ReductionRow } from '@/sections/impact/ReductionRow';
import { FootprintCard } from '@/sections/impact/FootprintCard';
import { IMPACT_ENV_BARS, IMPACT_ENV_BARS_MAX, IMPACT_ENV_CARDS } from '@/lib/data/impact';

/**
 * Empreinte environnementale : réductions moyennes constatées, puis ce que
 * cela change pour la ressource (nappes, sol, climat, traçabilité).
 *
 * Les barres s'animent une seule fois, à l'entrée dans le viewport, comme les
 * compteurs des autres pages.
 */
export function ImpactEnvironment() {
  const { t, d } = useTranslation();
  const bars = d.impact.environment.bars;
  const cards = d.impact.environment.cards;

  return (
    <Section tone="cream" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lime-500/[0.08] blur-[120px]"
      />

      <SectionHeading
        eyebrow={t('impact.environment.eyebrow')}
        title={t('impact.environment.title')}
        subtitle={t('impact.environment.lead')}
      />

      <div className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* Barres de réduction */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <div className="rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft sm:p-9">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-300">
                  {t('impact.environment.barsLabel')}
                </p>
                <div className="mt-7 flex flex-col gap-7">
                  {IMPACT_ENV_BARS.map((bar, index) => (
                    <ReductionRow
                      key={bar.id}
                      index={index}
                      label={bars[bar.id].label}
                      note={bars[bar.id].note}
                      value={bar.value}
                      max={IMPACT_ENV_BARS_MAX}
                      prefix="−"
                      delay={index * 0.08}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Lecture agronomique */}
        <div className="lg:col-span-7">
          <Reveal from="right">
            <span aria-hidden className="block h-0.5 w-6 rounded-full bg-lime-500" />
            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.75] text-ink-500">
              {t('impact.environment.lead2')}
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 sm:items-stretch">
            {IMPACT_ENV_CARDS.map(({ id, icon, ...card }) => {
              const tone = 'tone' in card && card.tone === 'ocre' ? 'ocre' : 'leaf';
              return (
                <StaggerItem key={id} className="h-full">
                  <FootprintCard icon={icon} tone={tone} title={cards[id].title} text={cards[id].text} />
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
