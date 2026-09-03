'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckRow, IconChip } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
import { PLATFORM_CAPABILITIES } from '@/lib/data/platform';

/**
 * Usages avancés de la plateforme : cartographie, analyse, alertes et gestion
 * d'exploitation. Complète les six modules sans les répéter — on y décrit ce
 * que l'utilisateur fait, pas la liste des écrans.
 */
export function PlatformCapabilities() {
  const { t, d } = useTranslation();
  const items = d.platform.capabilities.items;

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow={t('platform.capabilities.eyebrow')}
        title={t('platform.capabilities.title')}
        subtitle={t('platform.capabilities.lead')}
      />

      <div className="mt-section-gap grid gap-[18px] lg:grid-cols-2">
        {PLATFORM_CAPABILITIES.map(({ id, icon: Icon, ...capability }, index) => {
          const ocre = 'tone' in capability && capability.tone === 'ocre';
          const copy = items[id];

          return (
            <Reveal key={id} delay={(index % 2) * 0.08}>
              <article className="flex h-full flex-col rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft transition-surface duration-slow ease-premium hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 hover:shadow-hover sm:p-9">
                <IconChip tone={ocre ? 'ocre' : 'leaf'} className="h-12 w-12">
                  <Icon size={23} aria-hidden />
                </IconChip>
                <h3 className="mt-5 text-h3 tracking-[-0.025em]">
                  {copy.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-ink-500">{copy.text}</p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {copy.points.map((point) => (
                    <CheckRow key={point} tone={ocre ? 'ocre' : 'leaf'}>
                      {point}
                    </CheckRow>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
