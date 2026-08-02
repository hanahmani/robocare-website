'use client';

import Link from 'next/link';
import { localizePath, useTranslation } from '@/i18n';
import type { Crumb } from '@/types';

/** Fil d'Ariane des pages internes (sur fond sombre). */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const { locale, t } = useTranslation();

  return (
    <nav
      aria-label={t('a11y.breadcrumb')}
      className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50"
    >
      <Link href={localizePath(locale, '/')} className="text-white/50 transition-colors hover:text-lime-500">
        {t('nav.home')}
      </Link>
      {items.map((item) => (
        <span key={item.labelKey} className="flex items-center gap-2.5">
          <span aria-hidden>/</span>
          {item.href ? (
            <Link
              href={localizePath(locale, item.href)}
              className="text-white/50 transition-colors hover:text-lime-500"
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
