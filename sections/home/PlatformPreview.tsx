'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/animations/Reveal';
import { AppWindow } from '@/components/visuals/AppWindow';

/** Aperçu de la plateforme : arguments + fenêtre applicative. */
export function PlatformPreview() {
  const { t } = useTranslation();

  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] end-[-10%] start-[40%] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(77,158,47,.22),transparent_68%)]"
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <Reveal>
          <p className="eyebrow text-lime-500">{t('home.platformPreview.eyebrow')}</p>
          <h2 className="mt-4 text-h2 text-white">
            {t('home.platformPreview.title')}
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.7] text-white/[0.72] lg:text-[17px]">
            {t('home.platformPreview.text')}
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {t.list('home.platformPreview.points').map((point) => (
              <li key={point} className="flex items-center gap-3 text-[15px] text-lime-100">
                <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-lime-500" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/solutions" variant="lime" size="lg">
              {t('actions.discoverPlatform')}
              <Arrow />
            </Button>
          </div>
        </Reveal>

        <Reveal from="right">
          <AppWindow />
        </Reveal>
      </div>
    </Section>
  );
}
