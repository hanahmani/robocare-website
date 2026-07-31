'use client';

import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card, IconChip } from '@/components/ui/Card';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { PlatformShowcase } from '@/sections/platform/PlatformShowcase';
import { PlatformCapabilities } from '@/sections/platform/PlatformCapabilities';
import { PlatformArchitecture } from '@/sections/platform/PlatformArchitecture';
import { CtaBand } from '@/sections/shared/CtaBand';
import { PLATFORM_MODULES, PLATFORM_STEPS } from '@/lib/data/platform';
import { SITE } from '@/lib/data/site';
import { cn, pad2 } from '@/lib/utils';

/** Page « La plateforme ». */
export function PlatformView() {
  const { t, d } = useTranslation();
  const modules = d.platform.modules;
  const steps = d.platform.steps;

  return (
    <>
      <PageHero
        eyebrow={t('platform.hero.eyebrow')}
        title={t('platform.hero.title')}
        intro={t('platform.hero.intro')}
        image="/hero/satellite-heatmap.webp"
        imageAlt={t('platform.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.platform' }]}
        actions={
          <>
            <ButtonExternal href={SITE.appUrl} variant="lime" size="lg">
              {t('actions.accessPlatform')}
              <Arrow />
            </ButtonExternal>
            <Button href="/contact" variant="outline-light" size="lg">
              {t('actions.requestDemo')}
            </Button>
          </>
        }
      />

      {/* Captures réelles de l'application */}
      <Section tone="sage">
        <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-leaf-600">{t('platform.showcase.eyebrow')}</p>
            <h2 className="mt-3.5 text-[26px] tracking-headline lg:text-[32px]">
              {t('platform.showcase.title')}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-leaf-500/30 bg-white px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-leaf-600">
              <span aria-hidden className="h-2 w-2 rounded-full bg-leaf-500" />
              {t('platform.showcase.badge')}
            </span>
            <a
              href={SITE.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-leaf-600"
            >
              {t('actions.openApp')}
              <Arrow />
            </a>
          </div>
        </Reveal>

        <PlatformShowcase />
      </Section>

      {/* Les six modules */}
      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_MODULES.map(({ id, icon: Icon }) => (
            <StaggerItem key={id} className="h-full">
              <Card interactive>
                <IconChip>
                  <Icon size={22} aria-hidden />
                </IconChip>
                <h2 className="mt-5 text-[19px] tracking-[-0.02em]">{modules[id].title}</h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-ink-500">
                  {modules[id].text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Usages avancés */}
      <PlatformCapabilities />

      {/* Démarrage en quatre étapes */}
      <Section tone="sage">
        <Reveal className="max-w-[42rem]">
          <h2 className="text-[28px] leading-[1.06] sm:text-[34px] lg:text-[40px]">
            {t('platform.onboarding.title')}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('platform.onboarding.subtitle')}
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {PLATFORM_STEPS.map((step, index) => (
            <StaggerItem key={step.id}>
              <span
                dir="ltr"
                className={cn(
                  'block font-display text-[40px] font-semibold leading-none tracking-display tabular-nums rtl:text-right',
                  index === PLATFORM_STEPS.length - 1 ? 'text-leaf-500' : 'text-sage-300',
                )}
              >
                {pad2(index)}
              </span>
              <h3 className="mt-4 text-[18px]">{steps[step.id].title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-400">{steps[step.id].text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Architecture technique, cloud et sécurité */}
      <PlatformArchitecture />

      <Section>
        <CtaBand />
      </Section>
    </>
  );
}
