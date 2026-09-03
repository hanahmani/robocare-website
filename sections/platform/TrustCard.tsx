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
    <div className="glass flex h-full flex-col rounded-card border-white/10 p-7 transition-surface duration-slow ease-premium hover:-translate-y-1.5 hover:border-lime-500/40 hover:ring-1 hover:ring-lime-500/20 motion-reduce:hover:translate-y-0 lg:p-8">
      <span
        aria-hidden
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-field bg-lime-500/[0.12] text-lime-500"
      >
        <Icon size={23} aria-hidden />
      </span>
      <h3 className="mt-5 text-[18px] text-white lg:text-[19px]">{title}</h3>
      <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.7] text-white/70">{text}</p>
    </div>
  );
}
