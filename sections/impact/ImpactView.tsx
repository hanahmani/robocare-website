'use client';

import { localizePath, useTranslation } from '@/i18n';
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
import { CaseStudyCard } from '@/sections/impact/CaseStudyCard';
import {
  IMPACT_BENEFITS,
  IMPACT_CROPS,
  IMPACT_METHOD,
  IMPACT_STATS,
  IMPACT_STORIES,
} from '@/lib/data/impact';

/** Page « Impact ». */
export function ImpactView() {
  const { t, d, locale } = useTranslation();
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
        image="/hero/impact.png"
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
        <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        <Stagger className="relative mt-section-gap-lg grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {IMPACT_CROPS.map((crop) => {
            const copy = crops[crop.slug];
            return (
              <StaggerItem key={crop.slug} className="h-full">
                <CultureCard
                  href={localizePath(locale, `/solutions#${crop.solutionSlug}`)}
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
          <h2 className="text-h2-alt">
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

      <section id="etudes" className="scroll-mt-24 bg-[#F7F5F0] py-[clamp(72px,9vw,112px)]">
        <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
              {t('impact.stories.eyebrow')}
            </p>
          </div>
          <h2 className="mt-[18px] max-w-[19ch] text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#16201B]">
            {t('impact.stories.title')}
          </h2>

          <div className="mt-[clamp(44px,5.5vw,68px)] flex flex-col gap-5">
            {IMPACT_STORIES.map((story, index) => {
              const copy = stories[story.slug];
              return (
                <CaseStudyCard
                  key={story.slug}
                  slug={story.slug}
                  title={copy.title}
                  meta={copy.meta}
                  challenge={copy.challenge}
                  solution={copy.solution}
                  results={copy.results}
                  labels={d.impact.stories.labels}
                  delay={index * 0.07}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Section>
        <CtaBand />
      </Section>
    </>
  );
}
