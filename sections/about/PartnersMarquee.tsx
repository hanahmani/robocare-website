'use client';

import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Logos partenaires (public/partenaires) — dupliqués pour la boucle infinie. */
const PARTNER_LOGOS = [
  '/partenaires/Capture_d_ecran_2024-05-06_205223-removebg-preview-4.webp',
  '/partenaires/Capture_d_ecran_2024-05-06_223422-removebg-preview-1-400x225.webp',
  '/partenaires/Capture_d_ecran_2024-05-06_225116-removebg-preview-400x225.webp',
  '/partenaires/LogoUPSUD-removebg-preview-1-400x225.webp',
  '/partenaires/logo_cesbio-removebg-preview-400x225.webp',
  '/partenaires/unnamed-removebg-preview-400x225.webp',
];

/** Section « Nos partenaires » : carousel de logos en défilement infini. */
export function PartnersMarquee() {
  const { t } = useTranslation();
  const track = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <Section id="partenaires" className="scroll-mt-24">
      <SectionHeading
        eyebrow={t('about.partners.eyebrow')}
        title={t('about.partners.title')}
        subtitle={t('about.partners.subtitle')}
      />

      <div
        dir="ltr"
        className="group relative mt-8 overflow-hidden lg:mt-14"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] sm:gap-5 lg:gap-6">
          {track.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="flex h-[92px] w-[168px] shrink-0 items-center justify-center rounded-[18px] border border-forest-950/[0.08] bg-white p-5 shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:scale-[1.05] hover:shadow-leaf sm:h-[104px] sm:w-[192px] lg:h-[116px] lg:w-[216px] lg:p-6"
            >
              <Image
                src={src}
                alt={t('about.partners.logoAlt')}
                width={180}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
