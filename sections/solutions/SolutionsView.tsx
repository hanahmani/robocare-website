'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { FaqList } from '@/components/ui/FaqList';
import { Reveal } from '@/components/animations/Reveal';
import { CtaBand } from '@/sections/shared/CtaBand';
import { FarmingConcepts } from '@/sections/solutions/FarmingConcepts';
import { SolutionBlock } from '@/sections/solutions/SolutionBlock';
import { SolutionsComparison } from '@/sections/solutions/SolutionsComparison';
import { SOLUTIONS, SOLUTIONS_FAQ } from '@/lib/data/solutions';

/** Page « Solutions par culture ». */
export function SolutionsView() {
  const { t, d } = useTranslation();
  const items = d.solutions.items;

  const faq = SOLUTIONS_FAQ.map((id) => ({
    question: d.solutions.faq.items[id].question,
    answer: d.solutions.faq.items[id].answer,
  }));

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

      {/* Une section par solution, rythme varié (fond, poids visuel, côté) */}
      {SOLUTIONS.map((solution, index) => (
        <SolutionBlock
          key={solution.slug}
          solution={solution}
          copy={items[solution.slug]}
          index={index}
          total={SOLUTIONS.length}
        />
      ))}

      {/* Comparatif synthétique */}
      <SolutionsComparison />

      {/* Bloc pédagogique : ce sur quoi reposent les quatre solutions */}
      <FarmingConcepts />

      {/* FAQ : arboriculture (oliviers, arbres fruitiers) et grandes cultures */}
      <Section tone="sage">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-leaf-600">{t('solutions.faq.eyebrow')}</p>
            <h2 className="mt-4 text-[26px] leading-[1.06] sm:text-[32px] lg:text-[40px]">
              {t('solutions.faq.title')}
            </h2>
            <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500">
              {t('solutions.faq.intro')}
            </p>
          </Reveal>

          <FaqList items={faq} />
        </div>
      </Section>

      <Section>
        <CtaBand
          eyebrow={t('solutions.cta.eyebrow')}
          title={t('solutions.cta.title')}
          text={t('solutions.cta.text')}
          actions={
            <>
              <Button
                href="/contact"
                variant="lime"
                size="lg"
                className="hover:shadow-[0_0_40px_-8px_rgba(158,216,75,.55)]"
              >
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
