'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/animations/Reveal';
import { PlatformMockup } from '@/components/visuals/PlatformMockup';
import { HOME_PLATFORM_GROUPS } from '@/lib/data/home';

/**
 * Section « Une seule plateforme pour piloter vos parcelles » : les modules
 * groupés par usage, face à la maquette produit.
 *
 * La grille utilise `minmax(min(100%, 34rem), 1fr)` et non `minmax(34rem, 1fr)`
 * — sous 544px, une piste de largeur fixe déborderait du viewport au lieu de se
 * replier sur une colonne.
 */
export function PlatformOverview() {
  const { t } = useTranslation();

  return (
    <Section tone="sage">
      <div className="grid items-center gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,34rem),1fr))] lg:gap-[72px]">
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('home.platform.eyebrow')}</p>
          <h2 className="mt-4 text-h2-alt font-semibold tracking-display">
            {t('home.platform.title')}
          </h2>
          <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.55] text-ink-500 lg:text-[17px]">
            {t('home.platform.text')}
          </p>

          <div className="mt-section-gap grid gap-6">
            {HOME_PLATFORM_GROUPS.map((group) => (
              <div key={group.id}>
                <div className="flex items-baseline justify-between gap-3 border-b border-forest-950/[0.08] pb-2">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.05em] text-leaf-600">
                    {t(`home.platform.groups.${group.id}.label`)}
                  </h3>
                  <span className="text-[12px] text-ink-300">
                    {t('home.platform.moduleCount', { count: group.modules.length })}
                  </span>
                </div>

                <div className="grid gap-x-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,11.875rem),1fr))]">
                  {group.modules.map((module) => (
                    <div key={module} className="py-[11px]">
                      <strong className="block text-[14.5px] font-semibold text-ink-900">
                        {t(`home.platform.groups.${group.id}.modules.${module}.title`)}
                      </strong>
                      <small className="mt-0.5 block text-[12.5px] leading-[1.4] text-ink-500">
                        {t(`home.platform.groups.${group.id}.modules.${module}.text`)}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-section-gap flex flex-wrap items-center gap-x-5 gap-y-3.5">
            {/* TODO: faire pointer vers `/plateforme` une fois la page créée —
                la route n'existe pas encore, le lien mène aux solutions. */}
            <Button href="/solutions" variant="primary" size="lg">
              {t('actions.discoverPlatform')}
              <Arrow size={17} />
            </Button>
            <span className="text-[13px] text-ink-500">{t('home.platform.deviceNote')}</span>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <PlatformMockup />
        </Reveal>
      </div>
    </Section>
  );
}
