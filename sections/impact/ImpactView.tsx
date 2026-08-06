'use client';

import { Check } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { StatsShowcase } from '@/sections/shared/StatsShowcase';
import { CtaBand } from '@/sections/shared/CtaBand';
import { ImpactEnvironment } from '@/sections/impact/ImpactEnvironment';
import { CultureCard } from '@/sections/impact/CultureCard';
import {
  IMPACT_BENEFITS,
  IMPACT_CROPS,
  IMPACT_METHOD,
  IMPACT_STATS,
  IMPACT_STORIES,
} from '@/lib/data/impact';

/** Page « Impact ». */
export function ImpactView() {
  const { t, d } = useTranslation();
  const method = d.impact.method.steps;
  const crops = d.impact.crops.items;
  const benefits = d.impact.benefits.items;
  const stories = d.impact.stories.items;

  const stats = IMPACT_STATS.map((stat) => ({
    ...stat,
    label: d.impact.stats[stat.id].label,
    note: d.impact.stats[stat.id].note,
  }));

  return (
    <>
      <PageHero
        eyebrow={t('impact.hero.eyebrow')}
        title={t('impact.hero.title')}
        intro={t('impact.hero.intro')}
        image="/hero/beja.webp"
        imageAlt={t('impact.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.impact' }]}
        actions={
          <>
            <RequestDemoButton variant="lime" size="lg" />
            <Button href="#etudes" variant="outline-light" size="lg">
              {t('actions.readCaseStudies')}
            </Button>
          </>
        }
      />

      {/* Méthodologie */}
      <Section>
        <SectionHeading
          eyebrow={t('impact.method.eyebrow')}
          title={t('impact.method.title')}
          subtitle={t('impact.method.subtitle')}
        />
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {IMPACT_METHOD.map(({ id, icon: Icon }) => (
            <StaggerItem key={id} className="h-full">
              <Card interactive className="p-[26px]">
                <IconChip>
                  <Icon size={22} aria-hidden />
                </IconChip>
                <h3 className="mt-[18px] text-[18px]">{method[id].title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-ink-400">
                  {method[id].text}
                </p>
                <span className="mt-[18px] self-start rounded-full bg-sage-50 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.06em] text-leaf-600">
                  {method[id].timing}
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Résultats consolidés */}
      <Section tone="dark" className="overflow-hidden">
        <SectionHeading
          invert
          eyebrow={t('impact.results.eyebrow')}
          title={t('impact.results.title')}
        />
        <div className="relative mt-8 lg:mt-12">
          <StatsShowcase stats={stats} columns={4} />
        </div>
      </Section>

      {/* Détail par culture */}
      <Section tone="sage" className="overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-24 top-1/3 h-[420px] w-[420px] rounded-full bg-lime-500/[0.08] blur-[120px]"
        />
        <SectionHeading eyebrow={t('impact.crops.eyebrow')} title={t('impact.crops.title')} />
        <Stagger className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {IMPACT_CROPS.map((crop) => {
            const copy = crops[crop.slug];
            return (
              <StaggerItem key={crop.slug} className="h-full">
                <CultureCard
                  href={`/solutions#${crop.solutionSlug}`}
                  image={crop.image}
                  title={copy.name}
                  description={copy.description}
                  indicators={copy.indicators}
                  seeSolutionLabel={t('actions.seeSolution')}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Bénéfices */}
      <Section>
        <Reveal className="max-w-[47rem]">
          <h2 className="text-[28px] leading-[1.04] sm:text-[32px] lg:text-[38px]">
            {t('impact.benefits.title')}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_BENEFITS.map(({ id, icon: Icon }) => (
            <StaggerItem key={id} className="h-full">
              <Card interactive>
                <IconChip>
                  <Icon size={22} aria-hidden />
                </IconChip>
                <h3 className="mt-5 text-[18px]">{benefits[id].title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-ink-500">
                  {benefits[id].text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Études de cas */}
      {/* Empreinte environnementale */}
      <ImpactEnvironment />

      <Section id="etudes" tone="sage" className="scroll-mt-24">
        <SectionHeading eyebrow={t('impact.stories.eyebrow')} title={t('impact.stories.title')} />
        <div className="mt-10 flex flex-col gap-6">
          {IMPACT_STORIES.map((story) => {
            const copy = stories[story.slug];
            return (
              <Reveal key={story.slug}>
                <article
                  id={story.slug}
                  className="scroll-mt-24 overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft"
                >
                  <header className="flex flex-wrap items-baseline gap-x-6 gap-y-2 bg-forest-900 px-5 py-5 text-white sm:px-8">
                    <h3 className="text-[20px] text-white">{copy.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-500">
                      {copy.meta}
                    </p>
                  </header>
                  <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-3 lg:gap-8">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                        {t('impact.stories.labels.challenge')}
                      </p>
                      <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-700">
                        {copy.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                        {t('impact.stories.labels.solution')}
                      </p>
                      <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-700">
                        {copy.solution}
                      </p>
                    </div>
                    <div className="rounded-[16px] bg-sage-50 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-leaf-600">
                        {t('impact.stories.labels.results')}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {copy.results.map((result) => (
                          <li
                            key={result}
                            className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-ink-700"
                          >
                            <Check size={16} className="mt-0.5 shrink-0 text-leaf-500" aria-hidden />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <CtaBand />
      </Section>
    </>
  );
}
