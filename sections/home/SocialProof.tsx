'use client';

import { Quote } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';
import { HOME_TESTIMONIALS } from '@/lib/data/home';
import { PARTNERS } from '@/lib/data/about';
import { cn } from '@/lib/utils';

/**
 * Preuve sociale de l'accueil : trois retours d'exploitation, puis le bandeau
 * des partenaires. Les noms de partenaires proviennent du même dictionnaire
 * que la page À propos — une seule source, aucune duplication.
 */
export function SocialProof() {
  const { t, d } = useTranslation();
  const quotes = d.home.testimonials.items;
  const partners = d.about.partners.items;

  return (
    <Section>
      <SectionHeading
        eyebrow={t('home.testimonials.eyebrow')}
        title={t('home.testimonials.title')}
      />

      <Stagger className="mt-section-gap grid gap-5 lg:grid-cols-3">
        {HOME_TESTIMONIALS.map((id, index) => {
          const dark = index === 1;
          const quote = quotes[id];
          return (
            <StaggerItem key={id} className="h-full">
              <figure
                className={cn(
                  'flex h-full flex-col rounded-tile border p-7 transition-surface duration-slow ease-premium hover:-translate-y-1.5 hover:shadow-lift motion-reduce:hover:translate-y-0',
                  dark
                    ? 'border-lime-500/20 bg-[linear-gradient(165deg,#0B2015,#06120C_60%)] shadow-glass'
                    : 'border-forest-950/[0.08] bg-white shadow-soft hover:border-leaf-500/40',
                )}
              >
                <Quote
                  size={26}
                  aria-hidden
                  className={cn('shrink-0 rtl:-scale-x-100', dark ? 'text-lime-500' : 'text-sage-300')}
                />
                <blockquote
                  className={cn(
                    'mt-4 flex-1 text-[15.5px] leading-[1.7]',
                    dark ? 'text-white/[0.86]' : 'text-ink-700',
                  )}
                >
                  {quote.quote}
                </blockquote>
                <figcaption
                  className={cn(
                    'mt-6 border-t pt-5',
                    dark ? 'border-white/10' : 'border-forest-950/[0.08]',
                  )}
                >
                  <p
                    className={cn(
                      'text-[14.5px] font-bold',
                      dark ? 'text-white' : 'text-ink-900',
                    )}
                  >
                    {quote.role}
                  </p>
                  <p
                    className={cn(
                      'mt-1 font-mono text-[11px] uppercase tracking-[0.12em]',
                      dark ? 'text-lime-500' : 'text-ink-300',
                    )}
                  >
                    {quote.context}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          );
        })}
      </Stagger>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-300">
        {t('home.testimonials.note')}
      </p>

      {/* Bandeau partenaires */}
      <Reveal className="mt-14 border-t border-forest-950/[0.08] pt-12 lg:mt-20 lg:pt-16">
        <p className="eyebrow text-leaf-600">{t('home.partners.eyebrow')}</p>
        <h2 className="mt-4 max-w-[38rem] text-h3-lg">
          {t('home.partners.title')}
        </h2>
        <p className="mt-3.5 max-w-[42rem] text-[15.5px] leading-[1.7] text-ink-500">
          {t('home.partners.subtitle')}
        </p>
      </Reveal>

      <Stagger
        as="ul"
        stagger={0.05}
        className="mt-section-gap grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PARTNERS.map((partner) => (
          <StaggerItem
            key={partner.id}
            as="li"
            className="flex items-center gap-3.5 rounded-field border border-forest-950/[0.08] bg-sage-50 px-4 py-3.5 transition-surface duration-base ease-premium hover:-translate-y-1.5 hover:border-leaf-500/35 hover:bg-white hover:shadow-soft motion-reduce:hover:translate-y-0"
          >
            <span
              aria-hidden
              className="inline-flex h-2 w-2 shrink-0 rounded-full bg-leaf-500/60"
            />
            <span className="min-w-0">
              <span className="block truncate text-[14.5px] font-semibold text-ink-900">
                {partners[partner.id].name}
              </span>
              <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-300">
                {partners[partner.id].note}
              </span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
