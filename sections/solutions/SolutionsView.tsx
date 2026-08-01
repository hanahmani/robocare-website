'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckRow, Pill } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { Reveal } from '@/components/animations/Reveal';
import { CtaBand } from '@/sections/shared/CtaBand';
import { FarmingConcepts } from '@/sections/solutions/FarmingConcepts';
import { SOLUTIONS } from '@/lib/data/solutions';
import { cn } from '@/lib/utils';

/** Page « Solutions par culture ». */
export function SolutionsView() {
  const { t, d } = useTranslation();
  const items = d.solutions.items;

  return (
    <>
      <PageHero
        eyebrow={t('solutions.hero.eyebrow')} // "Solutions"
        title={t('solutions.hero.title')}
        intro={t('solutions.hero.intro')}
        image="/hero/sfax.webp"
        imageAlt={t('solutions.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.solutions' }]}
        actions={
          <>
            <RequestDemoButton variant="primary" size="lg" />
            <Button href="/plateforme" variant="outline-light" size="lg">
              {t('actions.seePlatform')}
            </Button>
          </>
        }
      >
        {/* Raccourcis d'ancrage vers chaque solution */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution) => (
            <Link
              key={solution.slug}
              href={`#${solution.slug}`}
              className="glass rounded-card p-5 text-white transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-lime-500/50 hover:bg-lime-500/[0.12] hover:text-white"
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-lime-500">
                {items[solution.slug].brand}
              </p>
              <p className="mt-2 font-display text-[19px] font-semibold text-white">
                {items[solution.slug].name}
              </p>
            </Link>
          ))}
        </div>
      </PageHero>

      {/* Une section par solution, image alternée gauche / droite */}
      {SOLUTIONS.map((solution, index) => {
        const copy = items[solution.slug];
        const reversed = index % 2 === 1;
        const ocre = solution.tone === 'ocre';

        const visual = (
          <Reveal from={reversed ? 'right' : 'left'}>
            <div className="relative overflow-hidden rounded-[28px] shadow-hover">
              <Image
                src={solution.image}
                alt={copy.imageAlt}
                width={720}
                height={480}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-[280px] w-full object-cover lg:h-[420px]"
              />
              <span className="absolute start-5 top-5 rounded-full bg-forest-950/[0.72] px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-lime-500 backdrop-blur-md">
                {copy.brand}
              </span>
            </div>
          </Reveal>
        );

        const article = (
          <Reveal>
            <p className={cn('eyebrow', ocre ? 'text-ocre-600' : 'text-leaf-600')}>{copy.name}</p>
            <h2 className="mt-4 text-[28px] leading-[1.06] sm:text-[34px] lg:text-[40px]">
              {copy.brand}
            </h2>
            <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
              {copy.description}
            </p>

            <h3 className="mt-8 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
              {t('solutions.labels.whatYouTrack')}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {copy.points.map((point) => (
                <CheckRow key={point} tone={solution.tone} onSage={reversed}>
                  {point}
                </CheckRow>
              ))}
            </ul>

            <h3 className="mt-7 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
              {t('solutions.labels.expectedOutcomes')}
            </h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {copy.outcomes.map((outcome) => (
                <Pill key={outcome} tone={solution.tone}>
                  {outcome}
                </Pill>
              ))}
            </div>
          </Reveal>
        );

        return (
          <Section
            key={solution.slug}
            id={solution.slug}
            tone={reversed ? 'sage' : 'white'}
            className="scroll-mt-24"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {reversed ? (
                <>
                  {article}
                  {visual}
                </>
              ) : (
                <>
                  {visual}
                  {article}
                </>
              )}
            </div>
          </Section>
        );
      })}

      {/* Comparatif synthétique */}
      <Section>
        <SectionHeading
          eyebrow={t('solutions.comparison.eyebrow')}
          title={t('solutions.comparison.title')}
        />
        <Reveal className="mt-10 overflow-hidden rounded-card border border-forest-950/[0.08] shadow-soft">
          <div className="grid gap-px bg-forest-950/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((solution, index) => {
              const copy = items[solution.slug];
              const dark = index === 0;
              return (
                <div key={solution.slug} className={cn('p-6', dark ? 'bg-forest-900' : 'bg-white')}>
                  <p
                    className={cn(
                      'font-mono text-[10.5px] uppercase tracking-[0.16em]',
                      dark
                        ? 'text-lime-500'
                        : solution.tone === 'ocre'
                          ? 'text-ocre-600'
                          : 'text-leaf-600',
                    )}
                  >
                    {copy.brand}
                  </p>
                  <p
                    className={cn(
                      'mt-3.5 text-[14.5px] leading-[1.6]',
                      dark ? 'text-white/80' : 'text-ink-500',
                    )}
                  >
                    {copy.points.slice(0, 3).join(' · ')}
                  </p>
                  <p
                    className={cn(
                      'mt-4 font-display text-[26px]',
                      dark ? 'text-lime-500' : 'text-leaf-600',
                    )}
                  >
                    {copy.metric}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
          {t('solutions.comparison.note')}
        </p>
      </Section>

      {/* Bloc pédagogique : ce sur quoi reposent les quatre solutions */}
      <FarmingConcepts />

      <Section>
        <CtaBand
          eyebrow={t('solutions.cta.eyebrow')}
          title={t('solutions.cta.title')}
          text={t('solutions.cta.text')}
          actions={
            <>
              <Button href="/contact" variant="lime" size="lg">
                {t('actions.talkToAgronomist')}
              </Button>
              <Button href="/impact" variant="outline-light" size="lg">
                {t('actions.seeResults')}
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
