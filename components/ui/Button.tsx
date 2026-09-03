'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { localizePath, useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

export type Variant = 'primary' | 'lime' | 'dark' | 'outline' | 'outline-light';
export type Size = 'md' | 'lg';

/**
 * Socle commun à tous les boutons.
 *
 * - `transition-[…]` liste les propriétés animées au lieu de `transition-all` :
 *   seules des propriétés composées (transform, couleurs, ombre) sont
 *   interpolées, jamais une propriété de mise en page.
 * - Pas de `will-change-transform` : le garder en permanence force un calque
 *   de composition pour chaque bouton de la page, pour un gain nul au repos.
 * - `active:` ramène le bouton à plat et le rétracte légèrement — le clic doit
 *   s'entendre, et la durée `fast` rend la réponse immédiate.
 * - La flèche éventuelle avance dans le sens de lecture au survol.
 */
const BASE = [
  'inline-flex select-none items-center justify-center gap-2.5 rounded-full font-bold tracking-[-0.01em]',
  'transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-base ease-premium',
  'active:scale-[0.975] active:duration-fast',
  'disabled:pointer-events-none disabled:opacity-60',
  '[&_svg]:transition-transform [&_svg]:duration-base [&_svg]:ease-premium',
  'hover:[&_svg]:translate-x-0.5 rtl:hover:[&_svg]:-translate-x-0.5',
  'motion-reduce:!translate-y-0 motion-reduce:!scale-100 motion-reduce:hover:[&_svg]:translate-x-0',
].join(' ');

const SIZES: Record<Size, string> = {
  md: 'min-h-[46px] px-[22px] py-[13px] text-[14.5px]',
  lg: 'min-h-[52px] px-7 py-4 text-[15.5px]',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-leaf-500 text-forest-950 shadow-leaf hover:-translate-y-0.5 hover:bg-[#5DB53A] hover:shadow-[0_22px_46px_-18px_rgba(77,158,47,1)] active:translate-y-0 active:bg-[#46912A] active:shadow-press',
  lime: 'bg-lime-500 text-forest-950 shadow-lime hover:-translate-y-0.5 hover:bg-lime-400 hover:shadow-[0_22px_46px_-18px_rgba(158,216,75,.95)] active:translate-y-0 active:bg-lime-500 active:shadow-press',
  dark: 'bg-forest-900 text-white shadow-[0_10px_24px_-12px_rgba(11,32,21,.7)] hover:-translate-y-0.5 hover:bg-forest-800 hover:text-white hover:shadow-lift active:translate-y-0 active:bg-forest-950 active:shadow-press',
  outline:
    'border border-forest-900/20 text-forest-900 hover:-translate-y-0.5 hover:border-forest-900/50 hover:bg-forest-900/[0.04] hover:text-forest-900 active:translate-y-0 active:bg-forest-900/[0.08]',
  'outline-light':
    'glass text-white hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/[0.16] hover:text-white active:translate-y-0 active:bg-white/[0.22]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Bouton interne (navigation App Router). `href` reste écrit sans langue (`/solutions`) : elle est ajoutée ici depuis l'URL courante. */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { locale } = useTranslation();
  return (
    <Link
      href={localizePath(locale, href)}
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Bouton vers une ressource externe (application, réseaux). */
export function ButtonExternal({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Bouton d'action (formulaires, filtres). */
export function ButtonAction({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(BASE, SIZES[size], VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}
