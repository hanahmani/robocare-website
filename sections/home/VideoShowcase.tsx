'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/animations/Reveal';
import { VideoPlayer } from '@/components/visuals/VideoPlayer';

/** Vidéo de démonstration : plateforme et solutions RoboCare en action. */
export function VideoShowcase() {
  const { t } = useTranslation();
  return (
    <Section tone="cream">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-[72px]">
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('home.videoShowcase.eyebrow')}</p>
          <h2 className="mt-4 text-h2-alt">
            {t('home.videoShowcase.title')}
          </h2>
          <p className="mt-[18px] max-w-[30rem] text-[16px] leading-[1.7] text-ink-500 lg:text-[17px]">
            {t('home.videoShowcase.subtitle')}
          </p>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <VideoPlayer
            src="/vd_robocare.mp4"
            aspectClassName="aspect-[9/16]"
            className="mx-auto w-full max-w-[340px]"
          />
        </Reveal>
      </div>
    </Section>
  );
}
