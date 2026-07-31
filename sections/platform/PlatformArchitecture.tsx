'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { PLATFORM_LAYERS, PLATFORM_SECURITY } from '@/lib/data/platform';
import { pad2 } from '@/lib/utils';

/**
 * Architecture technique et garanties de sécurité.
 *
 * Sur fond sombre, comme l'aperçu de la plateforme sur l'accueil : ce sont les
 * deux moments « sous le capot » du parcours, ils partagent le même registre.
 * Les cinq couches sont reliées par un filet vertical qui se dessine au scroll.
 */
export function PlatformArchitecture() {
  const { t, d } = useTranslation();
  const layers = d.platform.architecture.layers;
  const security = d.platform.security.items;

  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] end-[-15%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(77,158,47,.2),transparent_68%)]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow={t('platform.architecture.eyebrow')}
          title={t('platform.architecture.title')}
          subtitle={t('platform.architecture.lead')}
          invert
        />

        {/* Les cinq couches */}
        <Stagger as="ol" stagger={0.09} className="relative mt-8 flex flex-col lg:mt-14">
          {PLATFORM_LAYERS.map((id, index) => {
            const last = index === PLATFORM_LAYERS.length - 1;
            return (
              <StaggerItem key={id} as="li" className="relative flex gap-5 sm:gap-7">
                {/* Colonne du numéro et du filet de liaison */}
                <div className="flex flex-col items-center">
                  <span
                    dir="ltr"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-lime-500/25 bg-white/[0.06] font-mono text-[13px] font-medium text-lime-500 tabular-nums"
                  >
                    {pad2(index)}
                  </span>
                  {!last ? (
                    <span
                      aria-hidden
                      className="w-px flex-1 bg-[linear-gradient(180deg,rgba(158,216,75,.35),rgba(158,216,75,.05))]"
                    />
                  ) : null}
                </div>

                <div className={last ? 'pb-0' : 'pb-9'}>
                  <h3 className="text-[19px] text-white lg:text-[21px]">{layers[id].title}</h3>
                  <p className="mt-2.5 max-w-[46rem] text-[15px] leading-[1.7] text-white/[0.66]">
                    {layers[id].text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Cloud, sécurité et synchronisation */}
        <Reveal className="mt-14 border-t border-white/10 pt-12 lg:mt-20 lg:pt-16">
          <p className="eyebrow text-lime-500">{t('platform.security.eyebrow')}</p>
          <h2 className="mt-4 max-w-[38rem] text-[24px] leading-[1.14] text-white sm:text-[30px]">
            {t('platform.security.title')}
          </h2>
          <p className="mt-3.5 max-w-[42rem] text-[15.5px] leading-[1.7] text-white/[0.66]">
            {t('platform.security.lead')}
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_SECURITY.map(({ id, icon: Icon }) => (
            <StaggerItem key={id} className="h-full">
              <div className="glass flex h-full flex-col rounded-tile p-6 transition-all duration-[350ms] ease-premium hover:-translate-y-1.5 hover:border-lime-500/40 motion-reduce:hover:translate-y-0">
                <span
                  aria-hidden
                  className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-white/[0.08] text-lime-500"
                >
                  <Icon size={21} />
                </span>
                <h3 className="mt-4 text-[17px] text-white">{security[id].title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/[0.6]">
                  {security[id].text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
