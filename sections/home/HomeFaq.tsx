'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { FaqList } from '@/components/ui/FaqList';
import { Reveal } from '@/components/animations/Reveal';
import { HOME_FAQ } from '@/lib/data/home';

/**
 * Mini-FAQ de l'accueil.
 * Réutilise `<FaqList>` (élément `<details>`, ouvrable sans JavaScript et
 * navigable au clavier) plutôt que de réinventer un accordéon.
 */
export function HomeFaq() {
  const { t, d } = useTranslation();

  const items = HOME_FAQ.map((id) => ({
    question: d.home.faq.items[id].question,
    answer: d.home.faq.items[id].answer,
  }));

  return (
    <Section tone="sage">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow text-leaf-600">{t('home.faq.eyebrow')}</p>
          <h2 className="mt-4 text-[26px] leading-[1.06] sm:text-[32px] lg:text-[40px]">
            {t('home.faq.title')}
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500">
            {t('home.faq.intro')}
          </p>
          <div className="mt-7">
            <Button href="/contact" variant="primary">
              {t('actions.talkToAgronomist')}
              <Arrow />
            </Button>
          </div>
        </Reveal>

        <FaqList items={items} />
      </div>
    </Section>
  );
}
