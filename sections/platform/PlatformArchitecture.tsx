'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { PipelineStep } from '@/sections/platform/PipelineStep';
import { TrustCard } from '@/sections/platform/TrustCard';
import { PLATFORM_LAYERS, PLATFORM_SECURITY } from '@/lib/data/platform';

/**
 * Architecture technique, puis garanties de sécurité.
 *
 * Les cinq couches restent sur fond sombre, comme l'aperçu de la plateforme
 * sur l'accueil, présentées comme un pipeline vertical relié par un filet qui
 * se dessine au scroll. « Cloud, sécurité et synchronisation » est un moment
 * différent (rassurer, pas impressionner) : section blanche séparée.
 */
export function PlatformArchitecture() {
  const { t, d } = useTranslation();
  const layers = d.platform.architecture.layers;
  const security = d.platform.security.items;

  return (
    <>
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

        {/* Les cinq couches : en-tête collant + pipeline */}
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow={t('platform.architecture.eyebrow')}
              title={t('platform.architecture.title')}
              subtitle={t('platform.architecture.lead')}
              invert
            />
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[8%] end-[-12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(77,158,47,.18),transparent_68%)]"
            />
            <Stagger as="ol" stagger={0.09} className="relative flex flex-col">
              {PLATFORM_LAYERS.map((id, index) => (
                <StaggerItem key={id} as="li">
                  <PipelineStep
                    index={index}
                    last={index === PLATFORM_LAYERS.length - 1}
                    title={layers[id].title}
                    text={layers[id].text}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('platform.security.eyebrow')}</p>
          <h2 className="mt-4 max-w-[38rem] text-h3-lg">{t('platform.security.title')}</h2>
          <p className="mt-3.5 max-w-[42rem] text-[15.5px] leading-[1.7] text-ink-500">
            {t('platform.security.lead')}
          </p>
        </Reveal>

        <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PLATFORM_SECURITY.map(({ id, icon }) => (
            <StaggerItem key={id} className="h-full">
              <TrustCard icon={icon} title={security[id].title} text={security[id].text} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
