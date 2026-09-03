'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { ApproachCard } from '@/sections/about/ApproachCard';
import { ReasonItem } from '@/sections/about/ReasonItem';
import { CommitmentCard } from '@/sections/about/CommitmentCard';
import { ABOUT_APPROACH, ABOUT_WHY_US } from '@/lib/data/about';

/**
 * Approche, méthodologie, expertise et innovation, puis « pourquoi nous » et
 * l'engagement. Prolonge le bloc Mission / Vision sans le dupliquer :
 * la mission dit *ce que* nous faisons, cette section dit *comment*.
 */
export function AboutApproach() {
  const { t, d } = useTranslation();
  const items = d.about.approach.items;
  const whyUs = d.about.approach.whyUs.items;

  return (
    <Section id="approche" tone="cream" className="scroll-mt-24">
      <Reveal className="max-w-[44rem]">
        <p className="eyebrow text-leaf-600">{t('about.approach.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt tracking-[-0.02em]">
          {t('about.approach.title')}
        </h2>
        <p className="mt-[18px] max-w-[60ch] text-[16px] leading-[1.75] text-ink-500">
          {t('about.approach.lead')}
        </p>
      </Reveal>

      {/* Les quatre piliers de méthode */}
      <Stagger className="mt-section-gap-lg grid gap-6 sm:grid-cols-2 lg:items-stretch lg:gap-7">
        {ABOUT_APPROACH.map(({ id, icon, ...pillar }) => {
          const tone = 'tone' in pillar && pillar.tone === 'ocre' ? 'ocre' : 'leaf';
          return (
            <StaggerItem key={id} className="h-full">
              <ApproachCard icon={icon} tone={tone} title={items[id].title} text={items[id].text} />
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Pourquoi nous choisir + engagement */}
      <div className="mt-section-gap grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft sm:p-9">
            <h3 className="text-h3 tracking-[-0.02em] text-ink-900">
              {t('about.approach.whyUs.title')}
            </h3>
            <Stagger as="ol" stagger={0.08} className="mt-7 flex flex-col gap-6">
              {ABOUT_WHY_US.map((id, index) => (
                <StaggerItem key={id} as="li">
                  <ReasonItem index={index} title={whyUs[id].title} text={whyUs[id].text} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal from="right">
              <CommitmentCard
                title={t('about.approach.commitment.title')}
                text={t('about.approach.commitment.text')}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
