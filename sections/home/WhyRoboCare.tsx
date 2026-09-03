'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip } from '@/components/ui/Card';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { HOME_BENEFITS } from '@/lib/data/home';

/** « Pourquoi RoboCare » : six bénéfices, même grammaire que les piliers. */
export function WhyRoboCare() {
  const { t, d } = useTranslation();
  const items = d.home.why.items;

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow={t('home.why.eyebrow')}
        title={t('home.why.title')}
        subtitle={t('home.why.lead')}
      />

      <Stagger className="mt-section-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_BENEFITS.map(({ id, icon: Icon, ...benefit }) => {
          const ocre = 'tone' in benefit && benefit.tone === 'ocre';
          return (
            <StaggerItem key={id} className="h-full">
              <Card interactive>
                <IconChip tone={ocre ? 'ocre' : 'leaf'}>
                  <Icon size={22} aria-hidden />
                </IconChip>
                <h3 className="mt-5 text-h3 tracking-[-0.02em]">{items[id].title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-ink-500">
                  {items[id].text}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
