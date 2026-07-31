'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ButtonExternal } from '@/components/ui/Button';
import { FaqList } from '@/components/ui/FaqList';
import { Reveal } from '@/components/animations/Reveal';
import { ContactForm } from '@/sections/contact/ContactForm';
import { ContactDemo } from '@/sections/contact/ContactDemo';
import { CONTACT_FAQ } from '@/lib/data/about';
import { SITE } from '@/lib/data/site';
import { pad2 } from '@/lib/utils';

/** Page « Contact ». */
export function ContactView() {
  const { t, d } = useTranslation();

  const faq = CONTACT_FAQ.map((id) => ({
    question: d.contact.faq.items[id].question,
    answer: d.contact.faq.items[id].answer,
  }));

  return (
    <>
      <PageHero
        eyebrow={t('contact.hero.eyebrow')}
        title={t('contact.hero.title')}
        intro={t('contact.hero.intro')}
        image="/hero/nabeul.webp"
        imageAlt={t('contact.hero.imageAlt')}
        crumbs={[{ labelKey: 'nav.contact' }]}
      >
        <div className="flex flex-wrap gap-5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-white/60">
          {t.list('contact.hero.badges').map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </PageHero>

      <Section tone="cream">
        <div className="grid items-start gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal from="right" className="flex flex-col gap-4">
            <Card tone="sage" className="p-6 sm:p-7">
              <ul className="flex flex-col gap-5">
                <li className="flex gap-3.5">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-forest-900" aria-hidden />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                      {t('contact.info.office')}
                    </p>
                    <p className="mt-1 text-[15px] text-ink-900">
                      {t('common.city')}, {t('common.country')}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <Phone size={20} className="mt-0.5 shrink-0 text-forest-900" aria-hidden />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                      {t('contact.info.phone')}
                    </p>
                    <a
                      href={SITE.phoneHref}
                      dir="ltr"
                      className="mt-1 block text-[15px] text-ink-900 hover:text-leaf-600 rtl:text-right"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <Mail size={20} className="mt-0.5 shrink-0 text-forest-900" aria-hidden />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                      {t('contact.info.email')}
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      dir="ltr"
                      className="mt-1 block text-[15px] text-ink-900 hover:text-leaf-600 rtl:text-right"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-forest-900/10 pt-6">
                <ButtonExternal href={SITE.appRegisterUrl} variant="dark">
                  {t('actions.createAccount')}
                </ButtonExternal>
                <ButtonExternal href={SITE.appUrl} variant="outline">
                  {t('actions.login')}
                </ButtonExternal>
              </div>
            </Card>

            <Card tone="dark" className="p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-500">
                {t('contact.info.nextStepsTitle')}
              </p>
              <ol className="mt-4 flex flex-col gap-3.5">
                {t.list('contact.info.nextSteps').map((step, index) => (
                  <li key={step} className="flex gap-3 text-[14.5px] leading-[1.6] text-white/[0.82]">
                    <span dir="ltr" className="mt-0.5 font-mono text-[11px] text-lime-500">
                      {pad2(index)}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Déroulé d'une démonstration */}
      <ContactDemo />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-leaf-600">{t('contact.faq.eyebrow')}</p>
            <h2 className="mt-4 text-[26px] leading-[1.06] sm:text-[32px] lg:text-[40px]">
              {t('contact.faq.title')}
            </h2>
            <p className="mt-[18px] text-[16px] leading-[1.7] text-ink-500">
              {t('contact.faq.intro')}
            </p>
          </Reveal>
          <FaqList items={faq} />
        </div>
      </Section>
    </>
  );
}
