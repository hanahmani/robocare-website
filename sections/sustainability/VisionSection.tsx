'use client';

import Image from 'next/image';
import { useDirection, useTranslation } from '@/i18n';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Section pleine image, fond sombre : la vision RoboCare en deux temps.
 * Le dégradé de lisibilité est un angle physique (90°) — il doit donc
 * s'inverser explicitement en arabe, les propriétés logiques ne couvrant pas
 * les dégradés directionnels.
 */
export function VisionSection() {
  const { t } = useTranslation();
  const { isRtl } = useDirection();

  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-forest-950 py-section text-white">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero/nabeul.webp"
          alt={t('sustainability.vision.imageAlt')}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: isRtl
            ? 'linear-gradient(270deg, rgba(6,18,12,.92) 10%, rgba(6,18,12,.6) 60%, rgba(6,18,12,.35))'
            : 'linear-gradient(90deg, rgba(6,18,12,.92) 10%, rgba(6,18,12,.6) 60%, rgba(6,18,12,.35))',
        }}
      />

      <div className="container-page relative">
        <Reveal className="max-w-[46rem]">
          <p className="eyebrow text-lime-500">{t('sustainability.vision.eyebrow')}</p>
          <h2 className="mt-[18px] text-h2 text-white">{t('sustainability.vision.title')}</h2>
          <p className="mt-[22px] text-body text-white/80">{t('sustainability.vision.lead1')}</p>
          <p className="mt-3.5 text-body text-white/80">{t('sustainability.vision.lead2')}</p>
        </Reveal>
      </div>
    </section>
  );
}
