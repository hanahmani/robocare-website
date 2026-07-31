'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { IMPACT_ENV_BARS, IMPACT_ENV_CARDS } from '@/lib/data/impact';

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
    <Section tone="cream">
      <SectionHeading
        eyebrow={t('impact.environment.eyebrow')}
        title={t('impact.environment.title')}
        subtitle={t('impact.environment.lead')}
      />

      <div className="mt-8 grid items-start gap-8 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Barres de réduction */}
        <Reveal>
          <div className="rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft sm:p-9">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-300">
              {t('impact.environment.barsLabel')}
            </p>
            <div className="mt-7 flex flex-col gap-6">
              {IMPACT_ENV_BARS.map((bar, index) => (
                <ProgressBar
                  key={bar.id}
                  label={bars[bar.id].label}
                  note={bars[bar.id].note}
                  value={bar.value}
                  prefix="−"
                  featured={'featured' in bar && bar.featured}
                  delay={index * 0.08}
                />
              ))}
            </div>
            <div aria-hidden className="mt-8 h-1.5 w-full rounded-full bg-index-scale" />
          </div>
        </Reveal>

        {/* Lecture agronomique */}
        <div>
          <Reveal from="right">
            <p className="text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
              {t('impact.environment.lead2')}
            </p>
          </Reveal>

          <Stagger className="mt-7 grid gap-4 sm:grid-cols-2">
            {IMPACT_ENV_CARDS.map(({ id, icon: Icon, ...card }) => {
              const ocre = 'tone' in card && card.tone === 'ocre';
              return (
                <StaggerItem key={id} className="h-full">
                  <Card tone="sage" className="p-6 transition-all hover:-translate-y-1.5 hover:shadow-lift">
                    <IconChip tone={ocre ? 'ocre' : 'light'}>
                      <Icon size={21} className={ocre ? 'text-ocre-600' : 'text-leaf-600'} aria-hidden />
                    </IconChip>
                    <h3 className="mt-4 text-[17px]">{cards[id].title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-ink-400">{cards[id].text}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
