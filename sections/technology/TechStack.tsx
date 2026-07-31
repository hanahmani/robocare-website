'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, IconChip, Pill } from '@/components/ui/Card';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { TECH_STACK } from '@/lib/data/technology';

/**
 * Vision par ordinateur, machine learning, big data, API, SIG et protocoles :
 * ce que recouvrent concrètement ces termes dans la plateforme.
 */
export function TechStack() {
  const { t, d } = useTranslation();
  const items = d.technology.stack.items;

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow={t('technology.stack.eyebrow')}
        title={t('technology.stack.title')}
        subtitle={t('technology.stack.lead')}
      />

      <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {TECH_STACK.map(({ id, icon: Icon, ...block }) => {
          const ocre = 'tone' in block && block.tone === 'ocre';
          const copy = items[id];

          return (
            <StaggerItem key={id} className="h-full">
              <Card interactive>
                <div className="flex items-center justify-between gap-3">
                  <IconChip tone={ocre ? 'ocre' : 'leaf'}>
                    <Icon size={22} aria-hidden />
                  </IconChip>
                  <Pill tone="muted">
                    {copy.tag}
                  </Pill>
                </div>
                <h3 className="mt-5 text-[19px] tracking-[-0.02em]">{copy.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-ink-500">
                  {copy.text}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
