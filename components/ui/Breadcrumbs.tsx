'use client';

import Link from 'next/link';
import { localizePath, useTranslation } from '@/i18n';
import type { Crumb } from '@/types';

/** Fil d'Ariane des pages internes (sur fond sombre). */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const { locale, t } = useTranslation();

  /*
   * Les liens portent `py-2 -my-2` : la zone tactile passe de 17 à 33px de
   * haut — au-delà du minimum WCAG 2.2 de 24px — sans changer la hauteur de
   * la ligne, la marge négative reprenant exactement ce que le padding ajoute.
   */
  return (
    <nav
      aria-label={t('a11y.breadcrumb')}
      className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50"
    >
      <Link href={localizePath(locale, '/')} className="py-2 -my-2 text-white/50 transition-colors hover:text-lime-500">
        {t('nav.home')}
      </Link>
      {items.map((item) => (
        <span key={item.labelKey} className="flex items-center gap-2.5">
          <span aria-hidden>/</span>
          {item.href ? (
            <Link
              href={localizePath(locale, item.href)}
              className="py-2 -my-2 text-white/50 transition-colors hover:text-lime-500"
            >
              {t(item.labelKey)}
            </Link>
          ) : (
            <span className="text-lime-500">{t(item.labelKey)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
