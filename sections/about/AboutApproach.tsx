'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { ABOUT_APPROACH, ABOUT_WHY_US } from '@/lib/data/about';
import { pad2 } from '@/lib/utils';

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
      <SectionHeading
        eyebrow={t('about.approach.eyebrow')}
        title={t('about.approach.title')}
        subtitle={t('about.approach.lead')}
      />

      {/* Les quatre piliers de méthode */}
      <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14">
        {ABOUT_APPROACH.map(({ id, icon: Icon, ...pillar }) => {
          const ocre = 'tone' in pillar && pillar.tone === 'ocre';
          return (
            <StaggerItem key={id} className="h-full">
              <Card interactive className="sm:p-8">
                <IconChip tone={ocre ? 'ocre' : 'leaf'} className="h-12 w-12">
                  <Icon size={23} aria-hidden />
                </IconChip>
                <h3 className="mt-5 text-[20px] tracking-[-0.02em] lg:text-[22px]">
                  {items[id].title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-ink-500">
                  {items[id].text}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-8 grid items-start gap-5 lg:mt-[18px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[18px]">
        {/* Pourquoi nous choisir */}
        <Reveal>
          <div className="h-full rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft sm:p-9">
            <h3 className="text-[20px] tracking-[-0.02em] lg:text-[22px]">
              {t('about.approach.whyUs.title')}
            </h3>
            <ol className="mt-6 flex flex-col gap-5">
              {ABOUT_WHY_US.map((id, index) => (
                <li key={id} className="flex gap-4">
                  <span
                    dir="ltr"
                    className="mt-0.5 shrink-0 font-mono text-[12px] font-medium text-leaf-600 tabular-nums"
                  >
                    {pad2(index)}
                  </span>
                  <div>
                    <p className="text-[15.5px] font-bold text-ink-900">{whyUs[id].title}</p>
                    <p className="mt-1 text-[14.5px] leading-[1.6] text-ink-500">
                      {whyUs[id].text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Engagement */}
        <Reveal from="right">
          <Card tone="dark" className="h-full border-lime-500/20 bg-forest-800 p-7 sm:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-500">
              {t('about.approach.commitment.title')}
            </p>
            <p className="mt-5 text-[15.5px] leading-[1.75] text-white/[0.82]">
              {t('about.approach.commitment.text')}
            </p>
            <div aria-hidden className="mt-auto pt-8">
              <div className="h-1.5 w-full rounded-full bg-index-scale" />
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
