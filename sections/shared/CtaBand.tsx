'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useTranslation } from '@/i18n';
import { SITE } from '@/lib/data/site';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

type Props = {
  /** Surcharges optionnelles ; sinon les libellés génériques de `cta.*`. */
  eyebrow?: string;
  title?: string;
  text?: string;
  /** Remplace les deux boutons par défaut. */
  actions?: ReactNode;
  /** Affiche la ligne de contacts sous les boutons. */
  showContacts?: boolean;
};

/** Bandeau CTA de fin de page : image satellite, dégradé, grille lime. */
export function CtaBand({ eyebrow, title, text, actions, showContacts = false }: Props) {
  const { t } = useTranslation();

  return (
    <Reveal from="scale" className="relative overflow-hidden rounded-[32px] bg-forest-950">
      <Image
        src="/hero/satellite-heatmap.webp"
        alt=""
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 1160px"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,18,12,.95)_12%,rgba(6,18,12,.55)_62%,rgba(6,18,12,.85))]" />
      <div className="grid-overlay absolute inset-0" />

      <div className="relative max-w-[48rem] p-8 sm:p-12 lg:p-[72px]">
        <p className="eyebrow text-lime-500">{eyebrow ?? t('cta.eyebrow')}</p>
        <h2 className="mt-4 text-[28px] leading-[1.06] tracking-headline text-white sm:text-[36px] lg:text-[48px]">
          {title ?? t('cta.title')}
        </h2>
        <p className="mt-4 text-[16px] leading-[1.65] text-white/80 lg:text-[17px]">
          {text ?? t('cta.body')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3.5">
          {actions ?? (
            <>
              <ButtonExternal href={SITE.appRegisterUrl} variant="lime" size="lg">
                {t('actions.createAccount')}
              </ButtonExternal>
              <Button href="/contact" variant="outline-light" size="lg">
                {t('actions.requestDemo')}
              </Button>
            </>
          )}
        </div>

        {showContacts ? (
          <div className="mt-7 flex flex-wrap gap-5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-white/55">
            <span>
              {t('common.city')}, {t('common.country')}
            </span>
            <span dir="ltr">{SITE.phone}</span>
            <span dir="ltr">{SITE.email}</span>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
