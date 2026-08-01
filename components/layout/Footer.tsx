'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, MapPin, Youtube } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { FOOTER_COLUMNS, SITE } from '@/lib/data/site';
import { Reveal } from '@/components/animations/Reveal';

const SOCIALS = [
  { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
  { label: 'YouTube', href: SITE.social.youtube, Icon: Youtube },
  { label: 'Google Maps', href: SITE.social.maps, Icon: MapPin },
] as const;

const isExternal = (href: string) =>
  href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');

/** Pied de page global : identité, colonnes de liens, contacts, mentions. */
export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-forest-950 pb-7 pt-[76px] text-white">
      <div className="container-page">
        <Reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-[20rem]">
            <Image
              src="/brand/logo-robocare.png"
              alt={t('common.logoAlt')}
              width={152}
              height={38}
              className="h-[38px] w-auto brightness-0 invert"
            />
            <p className="mt-[18px] text-[14.5px] leading-[1.65] text-white/60">
              {t('common.tagline')}
            </p>
            <p className="mt-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              {t('common.city')} · {t('common.country')}
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-lime-500/50 hover:text-lime-500"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.titleKey}>
              <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-white/40">
                {t(column.titleKey)}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => {
                  const label = link.label ?? t(link.labelKey ?? '');
                  const className =
                    'text-[14.5px] text-white/[0.78] transition-colors hover:text-lime-500';
                  return (
                    <li key={link.href}>
                      {isExternal(link.href) ? (
                        <a href={link.href} dir={link.ltr ? 'ltr' : undefined} className={className}>
                          {label}
                        </a>
                      ) : (
                        <Link href={link.href} className={className}>
                          {label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal from="scale" className="mt-12">
          <div aria-hidden className="h-1 w-full rounded-full bg-index-scale" />
        </Reveal>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3.5 text-[13px] text-white/45">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p dir="ltr" className="font-mono tracking-[0.05em]">
            robocare.tn
          </p>
        </div>
      </div>
    </footer>
  );
}
