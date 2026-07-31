'use client';

import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { CtaBand } from '@/sections/shared/CtaBand';
import { VegetationIndices } from '@/sections/technology/VegetationIndices';
import { TechStack } from '@/sections/technology/TechStack';
import { TECH_BLOCKS, TECH_METRICS, TECH_PIPELINE } from '@/lib/data/technology';
import { cn, pad2 } from '@/lib/utils';

/** Page « Technologie ». */
export function TechnologyView() {
  const { t, d } = useTranslation();
  const metrics = d.technology.metrics;
  const blocks = d.technology.blocks;
  const pipeline = d.technology.pipeline.steps;

  return (
    <>
      <PageHero
        eyebrow={t('technology.hero.eyebrow')}
        title={t('technology.hero.title')}
        intro={t('technology.hero.intro')}
        image="/hero/drone-spray.webp"
        imageAlt={t('technology.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.technology' }]}
        actions={
          <>
            <Button href="/contact" variant="primary" size="lg">
              {t('actions.talkToEngineer')}
            </Button>
            <Button href="/plateforme" variant="outline-light" size="lg">
              {t('actions.seePlatform')}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_METRICS.map((metric) => (
            <div key={metric.id} className="glass rounded-[20px] px-5 py-[18px]">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                {metrics[metric.id].label}
              </p>
              <p
                className={cn(
                  'mt-2 font-display text-[26px]',
                  'featured' in metric && metric.featured ? 'text-lime-500' : 'text-white',
                )}
              >
                {metrics[metric.id].value}
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Les quatre briques technologiques */}
      <Section tone="cream">
        <div className="flex flex-col gap-[18px]">
          {TECH_BLOCKS.map(({ id, icon: Icon, ...block }) => {
            const copy = blocks[id];
            const showScale = 'showScale' in block && block.showScale;
            return (
              <Reveal key={id}>
                <article className="grid gap-6 rounded-card border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:shadow-hover sm:p-9 lg:grid-cols-2 lg:gap-10">
                  <div>
                    <IconChip tone="dark" className="h-12 w-12">
                      <Icon size={24} aria-hidden />
                    </IconChip>
                    <h2 className="mt-5 text-[22px] tracking-[-0.025em] lg:text-[26px]">
                      {copy.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">{copy.text}</p>
                    {copy.note ? (
                      <p className="mt-[18px] inline-flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-300">
                        <span
                          aria-hidden
                          className="inline-block h-3.5 w-3.5 animate-spin-slow rounded-full border-2 border-leaf-500 border-e-transparent"
                        />
                        {copy.note}
                      </p>
                    ) : null}
                    {showScale ? (
                      <div aria-hidden className="mt-[18px] h-1.5 rounded-full bg-index-scale" />
                    ) : null}
                  </div>
                  <ul className="flex flex-col justify-center gap-3">
                    {copy.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink-700"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ocre-500"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Les quatre indices de végétation */}
      <VegetationIndices />

      {/* Détail des briques techniques */}
      <TechStack />

      {/* Chaîne de traitement */}
      <Section>
        <SectionHeading
          eyebrow={t('technology.pipeline.eyebrow')}
          title={t('technology.pipeline.title')}
        />
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {TECH_PIPELINE.map((step, index) => {
            const dark = index === 2;
            return (
              <StaggerItem key={step.id} className="h-full">
                <Card tone={dark ? 'dark' : 'sage'} className="p-[26px]">
                  <span
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-[0.14em]',
                      dark ? 'text-lime-500' : 'text-ink-300',
                    )}
                  >
                    {t('technology.pipeline.stepLabel', { number: pad2(index) })}
                  </span>
                  <h3 className={cn('mt-3 text-[19px]', dark && 'text-white')}>
                    {pipeline[step.id].title}
                  </h3>
                  <p
                    className={cn(
                      'mt-2.5 text-[14.5px] leading-[1.6]',
                      dark ? 'text-white/[0.72]' : 'text-ink-400',
                    )}
                  >
                    {pipeline[step.id].text}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section flushTop>
        <CtaBand />
      </Section>
    </>
  );
}
