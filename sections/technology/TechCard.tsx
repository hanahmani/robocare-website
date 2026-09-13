'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pad2 } from '@/lib/utils';

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  icon: LucideIcon;
  index: number;
  title: string;
  text: string;
  points: string[];
  /** Badge ou barre d'échelle NDVI, selon la donnée — rendu dans un slot normalisé. */
  extra?: ReactNode;
  /** Délai d'entrée en cascade (0 / 0.07 / 0.14 / 0.21s). */
  delay: number;
};

/** Une brique technologique (IA, satellite, IoT, drone). */
export function TechCard({ icon: Icon, index, title, text, points, extra, delay }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay }}
      className={[
        'group grid grid-cols-1 overflow-hidden rounded-[18px] border border-[#E4E0D6] bg-white',
        'transition-[transform,border-color,box-shadow] duration-500 ease-out',
        'hover:-translate-y-1 hover:border-[#CFDCC8] hover:shadow-[0_20px_44px_-30px_rgba(20,45,26,0.45)]',
        'motion-reduce:hover:translate-y-0',
        'min-[860px]:grid-cols-[1.15fr_1fr]',
      ].join(' ')}
    >
      <div className="flex flex-col p-[26px]">
        <div className="flex items-center gap-3.5">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-[#EDF2EA] text-[#3E6B4C] transition-colors duration-500 ease-out group-hover:bg-[#3E6B4C] group-hover:text-white">
            <Icon size={20} strokeWidth={1.6} aria-hidden />
          </span>
          <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-[#16201B]">{title}</h2>
          <span className="ms-auto shrink-0 font-mono text-[11px] tracking-[0.08em] text-[#7D9B70]">
            {pad2(index)}
          </span>
        </div>

        <p className="mt-4 text-[14.5px] leading-[1.7] text-[#5C6862]">{text}</p>

        {extra ? <div className="max-[859px]:mt-5 min-[860px]:mt-auto min-[860px]:pt-5">{extra}</div> : null}
      </div>

      <ul className="flex flex-col justify-center gap-[13px] border-t border-[#E4E0D6] p-[26px] min-[860px]:border-t-0 min-[860px]:border-s">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-[11px]">
            <span aria-hidden className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-[#7D9B70]" />
            <span className="text-[14.5px] leading-[1.6] text-[#5C6862]">{point}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
