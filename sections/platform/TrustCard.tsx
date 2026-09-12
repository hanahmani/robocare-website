'use client';

import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/** Carte « Cloud, sécurité et synchronisation ». */
export function TrustCard({ icon: Icon, title, text }: Props) {
  return (
    <div className="flex h-full flex-col rounded-card border border-forest-950/[0.08] bg-white p-7 shadow-soft transition-surface duration-slow ease-premium hover:-translate-y-1.5 hover:border-leaf-500/40 hover:shadow-hover motion-reduce:hover:translate-y-0 lg:p-8">
      <span
        aria-hidden
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-field bg-sage-100 text-leaf-600"
      >
        <Icon size={23} aria-hidden />
      </span>
      <h3 className="mt-5 text-[18px] text-ink-900 lg:text-[19px]">{title}</h3>
      <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.7] text-ink-500">{text}</p>
    </div>
  );
}
