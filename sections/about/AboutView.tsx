'use client';

import { Mail } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { AboutApproach } from '@/sections/about/AboutApproach';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { StatCounter } from '@/components/ui/StatCounter';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { CtaBand } from '@/sections/shared/CtaBand';
import {
  AWARDS,
  MEDIA,
  MILESTONES,
  PARTNERS,
  PARTNER_GROUPS,
  PROGRAMS,
  RESOURCES,
  TEAM,
  TEAM_GROUPS,
  VALUES,
} from '@/lib/data/about';
import { SITE } from '@/lib/data/site';
import { cn, initialsFromName, pad2 } from '@/lib/utils';

const MEDIA_TONES = {
  leaf: 'bg-sage-100 text-leaf-600',
  ocre: 'bg-[#FDF3E3] text-ocre-600',
  muted: 'bg-sage-50 text-ink-400',
} as const;

/** Page « À propos ». */
export function AboutView() {
  const { t, d } = useTranslation();
  const about = d.about;

  return (
    <>
      <PageHero
        eyebrow={t('about.hero.eyebrow')}
        title={t('about.hero.title')}
        intro={t('about.hero.intro')}
        image="/hero/team.webp"
        imageAlt={t('about.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.about' }]}
        actions={
          <>
            <Button href="/contact" variant="lime" size="lg">
              {t('actions.requestDemo')}
            </Button>
            <ButtonExternal href={SITE.appUrl} variant="outline-light" size="lg">
              {t('actions.thePlatform')}
            </ButtonExternal>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-[20px] px-[22px] py-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/55">
              {t('about.hero.foundedLabel')}
            </p>
            <p dir="ltr" className="mt-2 font-display text-[30px] tabular-nums text-white rtl:text-right">
              2021
            </p>
          </div>
          <StatCounter
            id="hectares"
            value={100000}
            suffix="+"
            grouped
            label={t('about.hero.hectaresLabel')}
            featured
            size="sm"
            className="glass rounded-[20px] bg-transparent px-[22px] py-5 hover:bg-white/[0.1]"
          />
          <StatCounter
            id="farms"
            value={300}
            suffix="+"
            label={t('about.hero.farmsLabel')}
            size="sm"
            className="glass rounded-[20px] bg-transparent px-[22px] py-5 hover:bg-white/[0.1]"
          />
        </div>
      </PageHero>

      {/* Notre histoire */}
      <Section id="histoire">
        <SectionHeading
          eyebrow={t('about.history.eyebrow')}
          title={t('about.history.title')}
          subtitle={t('about.history.subtitle')}
        />
        <ol className="mt-8 border-s border-forest-950/[0.09] ps-6 lg:mt-14 lg:ps-10">
          {MILESTONES.map((milestone, index) => (
            <Reveal
              key={milestone.id}
              as="li"
              delay={index * 0.05}
              className={cn('relative', index < MILESTONES.length - 1 && 'pb-10')}
            >
              <span
                aria-hidden
                className="absolute -start-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-leaf-500 shadow-soft lg:-start-[47px]"
              />
              <p dir="ltr" className="font-mono text-[14px] tracking-[0.16em] text-leaf-600 rtl:text-right">
                {milestone.year}
              </p>
              <h3 className="mt-2 text-[18px]">{about.milestones[milestone.id].title}</h3>
              <p className="mt-2 max-w-[42rem] text-[15px] leading-[1.65] text-ink-500">
                {about.milestones[milestone.id].text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Mission & vision */}
      <Section id="mission" tone="sage">
        <SectionHeading eyebrow={t('about.mission.eyebrow')} title={t('about.mission.title')} />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card tone="dark" className="border-lime-500/20 bg-forest-800 p-7 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-500">
                {t('about.mission.missionLabel')}
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-white lg:text-[19px]">
                {t('about.mission.missionText')}
              </p>
            </Card>
          </Reveal>
          <Reveal from="right">
            <Card className="p-7 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf-600">
                {t('about.mission.visionLabel')}
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-forest-900 lg:text-[19px]">
                {t('about.mission.visionText')}
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Valeurs */}
      {/* Approche, méthodologie et engagement */}
      <AboutApproach />

      <Section id="valeurs">
        <SectionHeading eyebrow={t('about.values.eyebrow')} title={t('about.values.title')} />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <StaggerItem key={value} className="h-full">
              <Card interactive>
                <span
                  dir="ltr"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 font-display text-[14px] font-semibold text-leaf-600"
                >
                  {pad2(index)}
                </span>
                <h3 className="mt-5 text-[18px] leading-[1.35]">
                  {about.values.items[value].title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-ink-500">
                  {about.values.items[value].text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Équipe */}
      <Section id="equipe" tone="sage" className="scroll-mt-24">
        <SectionHeading
          eyebrow={t('about.team.eyebrow')}
          title={t('about.team.title')}
          subtitle={t('about.team.subtitle')}
        />
        <div className="mt-8 flex flex-col gap-8 lg:mt-14">
          {TEAM_GROUPS.map((group) => (
            <div key={group}>
              <h3 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
                {about.team.groups[group]}
              </h3>
              <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {TEAM.filter((member) => member.group === group).map((member) => {
                  const person = about.team.members[member.id];
                  return (
                    <StaggerItem key={member.id}>
                      <article className="flex items-center gap-4 rounded-[20px] border border-forest-950/[0.08] bg-white p-5 shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
                        <span
                          aria-hidden
                          className={cn(
                            'inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-display text-[17px] font-semibold',
                            'placeholder' in member && member.placeholder
                              ? 'bg-sage-100 text-leaf-600'
                              : 'bg-forest-900 text-lime-100',
                          )}
                        >
                          {initialsFromName(person.name)}
                        </span>
                        <div>
                          <div className="text-[15.5px] font-bold text-ink-900">{person.name}</div>
                          <div className="mt-1 text-[13.5px] text-ink-400">{person.role}</div>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </Section>

      {/* Partenaires */}
      <Section id="partenaires" className="scroll-mt-24">
        <SectionHeading
          eyebrow={t('about.partners.eyebrow')}
          title={t('about.partners.title')}
          subtitle={t('about.partners.subtitle')}
        />
        <Stagger className="mt-8 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {PARTNER_GROUPS.map((group) => (
            <StaggerItem key={group} className="h-full">
              <Card className="p-[26px]">
                <h3 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-300">
                  {about.partners.groups[group]}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {PARTNERS.filter((partner) => partner.category === group).map((partner) => (
                    <li
                      key={partner.id}
                      className="flex items-baseline justify-between gap-3 rounded-field bg-sage-50 px-4 py-3.5 transition-all duration-300 hover:translate-x-1 hover:bg-sage-200 rtl:hover:-translate-x-1"
                    >
                      <span className="text-[14.5px] font-bold text-ink-900">
                        {about.partners.items[partner.id].name}
                      </span>
                      <span className="font-mono text-[11px] text-ink-400">
                        {about.partners.items[partner.id].note}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Prix & distinctions */}
      <Section id="prix" tone="sage" className="scroll-mt-24">
        <SectionHeading
          eyebrow={t('about.awards.eyebrow')}
          title={t('about.awards.title')}
          subtitle={t('about.awards.subtitle')}
        />
        <div className="mt-8 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <Stagger className="flex flex-col gap-3.5">
            {AWARDS.map((award) => (
              <StaggerItem key={award}>
                <article className="rounded-tile border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="flex flex-wrap items-baseline justify-between gap-2.5">
                    <h3 className="text-[18px]">{about.awards.items[award].title}</h3>
                    <span
                      dir="ltr"
                      className="font-mono text-[12px] tracking-[0.14em] text-leaf-600"
                    >
                      {about.awards.items[award].year}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-300">
                    {about.awards.items[award].issuer}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-500">
                    {about.awards.items[award].text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal from="right">
            <Card tone="dark" className="p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-500">
                {t('about.awards.programsLabel')}
              </p>
              <div className="mt-[18px] flex flex-col gap-3">
                {PROGRAMS.map((program) => (
                  <div
                    key={program}
                    className="rounded-[16px] border border-white/[0.12] bg-white/[0.06] p-4 transition-all duration-300 hover:border-lime-500/40 hover:bg-lime-500/[0.12]"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[15px] font-bold text-white">
                        {about.awards.programs[program].title}
                      </span>
                      <span dir="ltr" className="font-mono text-[11px] text-lime-500">
                        {about.awards.programs[program].year}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/70">
                      {about.awards.programs[program].text}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Médias */}
      <Section id="medias" className="scroll-mt-24">
        <SectionHeading
          eyebrow={t('about.media.eyebrow')}
          title={t('about.media.title')}
          subtitle={t('about.media.subtitle')}
        />
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {MEDIA.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <Card interactive className="p-[26px]">
                <div className="flex items-center justify-between gap-2.5">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em]',
                      MEDIA_TONES[item.tone],
                    )}
                  >
                    {about.media.items[item.id].kind}
                  </span>
                  <span className="font-mono text-[11px] text-ink-300">
                    {about.media.items[item.id].date}
                  </span>
                </div>
                <h3 className="mt-4 flex-1 text-[18px] leading-[1.35]">
                  {about.media.items[item.id].title}
                </h3>
                <p className="mt-3.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-400">
                  {about.media.items[item.id].outlet}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Ressources */}
      <Section id="ressources" tone="sage" className="scroll-mt-24">
        <SectionHeading
          eyebrow={t('about.resources.eyebrow')}
          title={t('about.resources.title')}
          subtitle={t('about.resources.subtitle')}
        />
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <StaggerItem key={resource} className="h-full">
              <Card interactive className="p-[26px]">
                <h3 className="text-[18px] leading-[1.35]">
                  {about.resources.items[resource].title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-ink-500">
                  {about.resources.items[resource].text}
                </p>
                <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
                  {about.resources.items[resource].format}
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA centré */}
      <Section flushTop className="pt-14 lg:pt-20">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <p className="eyebrow justify-center text-leaf-600">{t('about.contactCta.eyebrow')}</p>
          <h2 className="mt-4 text-[26px] leading-[1.06] sm:text-[30px] lg:text-[36px]">
            {t('about.contactCta.title')}
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.7] text-ink-500">
            {t('about.contactCta.text')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact" variant="primary" size="lg">
              {t('actions.requestDemo')}
            </Button>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-forest-800/20 px-7 py-4 text-[15.5px] font-bold text-forest-800 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-forest-800/50 hover:bg-forest-800/[0.04] hover:text-forest-800"
            >
              <Mail size={16} aria-hidden />
              <span dir="ltr">{SITE.email}</span>
            </a>
          </div>
        </Reveal>
      </Section>

      <Section flushTop>
        <CtaBand showContacts />
      </Section>
    </>
  );
}
