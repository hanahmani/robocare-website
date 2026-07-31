'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Card, IconChip } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { HOME_PILLARS } from '@/lib/data/home';

/** Section « Qui nous sommes » : présentation courte + quatre piliers. */
export function About() {
  const { t, d } = useTranslation();
  const pillars = d.home.about.pillars;

  return (
    <Section>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-[72px]">
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('home.about.eyebrow')}</p>
          <h2 className="mt-4 text-[30px] leading-[1.04] sm:text-[38px] lg:text-[52px]">
            {t('home.about.title')}
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('home.about.lead')}
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('home.about.body')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button href="/about" variant="primary">
              {t('actions.ourStory')}
            </Button>
            <Button href="/technologie" variant="outline">
              {t('actions.ourTechnology')}
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {HOME_PILLARS.map(({ id, icon: Icon, ...pillar }) => {
            const ocre = 'tone' in pillar && pillar.tone === 'ocre';
            return (
              <StaggerItem key={id}>
                <Card
                  tone="sage"
                  className="p-6 transition-all hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <IconChip tone="light">
                    <Icon size={22} className={ocre ? 'text-ocre-600' : 'text-leaf-600'} />
                  </IconChip>
                  <h3 className="mt-4 text-[17px]">{pillars[id].title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink-400">{pillars[id].text}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
