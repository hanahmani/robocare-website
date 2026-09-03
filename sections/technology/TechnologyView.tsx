'use client';

import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaqList } from '@/components/ui/FaqList';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { CtaBand } from '@/sections/shared/CtaBand';
import { VegetationIndices } from '@/sections/technology/VegetationIndices';
import { TechStack } from '@/sections/technology/TechStack';
import { TechBlocks } from '@/sections/technology/TechBlocks';
import { TECH_METRICS, TECH_PIPELINE, TECHNOLOGY_FAQ } from '@/lib/data/technology';
import { cn, pad2 } from '@/lib/utils';

/** Page « Technologie ». */
export function TechnologyView() {
  const { t, d } = useTranslation();
  const metrics = d.technology.metrics;
  const pipeline = d.technology.pipeline.steps;

  const faq = TECHNOLOGY_FAQ.map((id) => ({
    question: d.technology.faq.items[id].question,
    answer: d.technology.faq.items[id].answer,
  }));

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
            <div key={metric.id} className="glass rounded-tile px-5 py-[18px]">
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
      <TechBlocks />

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
        <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* FAQ : agriculture de précision, satellite & IA, drones agricoles */}
      <Section tone="sage">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-leaf-600">{t('technology.faq.eyebrow')}</p>
            <h2 className="mt-4 text-[26px] leading-[1.06] sm:text-[32px] lg:text-[40px]">
              {t('technology.faq.title')}
            </h2>
            <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500">
              {t('technology.faq.intro')}
            </p>
          </Reveal>

          <FaqList items={faq} />
        </div>
      </Section>

      <Section flushTop>
        <CtaBand />
      </Section>
    </>
  );
}
