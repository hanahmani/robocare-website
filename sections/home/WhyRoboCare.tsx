'use client';

import { useTranslation } from '@/i18n';
import { HOME_BENEFITS } from '@/lib/data/home';
import { ReasonsPanels, type Reason } from '@/components/sections/ReasonsPanels';

/** « Pourquoi RoboCare » : six bénéfices, présentés en panneaux extensibles. */
export function WhyRoboCare() {
  const { t, d } = useTranslation();
  const items = d.home.why.items;

  const reasons: Reason[] = HOME_BENEFITS.map(({ id }) => ({
    id,
    title: items[id].title,
    text: items[id].text,
    // Seule « Une consigne, pas un tableau de plus » reprend le filet terre (soil).
    variant: id === 'decision' ? 'soil' : 'default',
  }));

  return (
    <section className="bg-gradient-to-b from-white to-[#F7FBF8] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-12">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="h-px w-10 bg-[#2F7D3A]" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2F7D3A]">
            {t('home.why.eyebrow')}
          </p>
        </div>
        <h2 className="mt-4 max-w-[18ch] text-4xl font-semibold tracking-[-0.03em] leading-[1.06] text-[#0C1A12] md:text-5xl">
          {t('home.why.title')}
        </h2>
        <p className="mt-4 max-w-[58ch] leading-relaxed text-[#5A6C61]">{t('home.why.lead')}</p>

        <div className="mt-12">
          <ReasonsPanels reasons={reasons} />
        </div>
      </div>
    </section>
  );
}
