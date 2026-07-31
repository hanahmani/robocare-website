import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Variant = 'primary' | 'lime' | 'dark' | 'outline' | 'outline-light';
export type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-bold tracking-[-0.01em] transition-all duration-300 ease-premium will-change-transform disabled:pointer-events-none disabled:opacity-60';

const SIZES: Record<Size, string> = {
  md: 'min-h-[46px] px-[22px] py-[13px] text-[14.5px]',
  lg: 'min-h-[52px] px-7 py-4 text-[15.5px]',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-leaf-500 text-forest-950 shadow-leaf hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#5DB53A]',
  lime: 'bg-lime-500 text-forest-950 shadow-lime hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-lime-400',
  dark: 'bg-forest-900 text-white shadow-[0_10px_24px_-12px_rgba(11,32,21,.7)] hover:-translate-y-0.5 hover:bg-forest-800 hover:text-white hover:shadow-lift',
  outline:
    'border border-forest-900/20 text-forest-900 hover:-translate-y-0.5 hover:border-forest-900/50 hover:bg-forest-900/[0.04] hover:text-forest-900',
  'outline-light':
    'glass text-white hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/[0.16] hover:text-white',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Bouton interne (navigation App Router). */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={cn(BASE, SIZES[size], VARIANTS[variant], className)} {...rest}>
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
