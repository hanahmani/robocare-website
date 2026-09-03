'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useTranslation } from '@/i18n';
import { SITE } from '@/lib/data/site';
import { ButtonExternal } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
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
    <Reveal from="scale" className="relative overflow-hidden rounded-panel bg-forest-950">
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
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 -top-24 h-[360px] w-[360px] rounded-full bg-lime-500/20 blur-[110px]"
      />

      <div className="relative max-w-[48rem] p-8 sm:p-12 lg:p-[72px]">
        <p className="eyebrow text-lime-500">{eyebrow ?? t('cta.eyebrow')}</p>
        <h2 className="mt-4 text-h2-alt tracking-headline text-white">
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
              <RequestDemoButton variant="outline-light" size="lg" />
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
