'use client';

import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pill } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { CONTACT_DEMO_STEPS } from '@/lib/data/about';
import { cn, pad2 } from '@/lib/utils';

/**
 * Déroulé d'une démonstration, du premier message à la parcelle test, suivi du
 * bloc « ce à quoi vous ne vous engagez pas ».
 *
 * Reprend la numérotation des étapes de la page Plateforme : mêmes chiffres
 * en Space Grotesk, même progression du gris sage vers le vert sur la dernière
 * étape.
 */
export function ContactDemo() {
  const { t, d } = useTranslation();
  const steps = d.contact.demo.steps;

  return (
    <Section tone="sage">
      <SectionHeading
        eyebrow={t('contact.demo.eyebrow')}
        title={t('contact.demo.title')}
        subtitle={t('contact.demo.lead')}
      />

      <Stagger className="mt-section-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CONTACT_DEMO_STEPS.map((id, index) => {
          const last = index === CONTACT_DEMO_STEPS.length - 1;
          return (
            <StaggerItem key={id}>
              <span
                dir="ltr"
                className={cn(
                  'block font-display text-[40px] font-semibold leading-none tracking-display tabular-nums rtl:text-right',
                  last ? 'text-leaf-500' : 'text-sage-300',
                )}
              >
                {pad2(index)}
              </span>
              <h3 className="mt-4 text-[18px]">{steps[id].title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-400">{steps[id].text}</p>
              <Pill tone={last ? 'leaf' : 'muted'} className="mt-4">
                {steps[id].duration}
              </Pill>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Bloc rassurant */}
      <Reveal className="mt-12 lg:mt-16">
        <div className="rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft sm:p-9">
          <div className="flex items-center gap-3.5">
            <ShieldCheck size={22} className="shrink-0 text-leaf-600" aria-hidden />
            <h3 className="text-h3 tracking-[-0.02em]">
              {t('contact.demo.reassurance.title')}
            </h3>
          </div>
          <ul className="mt-6 grid gap-3.5 lg:grid-cols-3">
            {t.list('contact.demo.reassurance.items').map((item) => (
              <li
                key={item}
                className="rounded-field bg-sage-50 px-5 py-4 text-[14.5px] leading-[1.6] text-ink-700 transition-colors duration-base hover:bg-sage-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
