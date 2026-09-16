'use client';

import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CaseColumn } from '@/sections/impact/CaseColumn';

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Labels = {
  challenge: string;
  solution: string;
  results: string;
};

type Props = {
  slug: string;
  title: string;
  meta: readonly string[];
  challenge: string;
  solution: string;
  results: readonly string[];
  labels: Labels;
  /** Délai de l'entrée en cascade (0 / 0.07 / 0.14s). */
  delay: number;
};

/** Une étude de cas : bandeau clair + trois colonnes (défi, solution, résultats), habillage identique. */
export function CaseStudyCard({ slug, title, meta, challenge, solution, results, labels, delay }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {/* Élément plain (pas motion) : le survol anime `transform`/`border`/`box-shadow`
          via CSS pur, sans entrer en conflit avec le `transform` piloté par framer ci-dessus. */}
      <article
        id={slug}
        className="scroll-mt-24 overflow-hidden rounded-[18px] border border-[#E4E0D6] bg-white transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-[#CFDCC8] hover:shadow-[0_22px_46px_-32px_rgba(20,45,26,0.45)] motion-reduce:hover:translate-y-0"
      >
        <header className="border-b border-[#E4E0D6] bg-[#EDF2EA] px-[26px] py-5">
          <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-[#16201B]">{title}</h3>
          <div className="mt-[9px] flex flex-wrap gap-x-[18px] gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#3E6B4C]">
            {meta.map((token) => (
              <span key={token}>{token}</span>
            ))}
          </div>
        </header>

        <div className="grid gap-[26px] p-[26px] min-[900px]:grid-cols-3 min-[900px]:gap-[clamp(22px,3vw,44px)]">
          <CaseColumn index={0} label={labels.challenge}>
            <p className="text-[14.5px] leading-[1.72] text-[#5C6862]">{challenge}</p>
          </CaseColumn>

          <CaseColumn index={1} label={labels.solution}>
            <p className="text-[14.5px] leading-[1.72] text-[#5C6862]">{solution}</p>
          </CaseColumn>

          <CaseColumn index={2} label={labels.results}>
            <ul className="flex flex-col gap-3">
              {results.map((result) => (
                <li key={result} className="flex items-start gap-[11px]">
                  <Check size={15} className="mt-1 shrink-0 text-[#3E6B4C]" aria-hidden />
                  <span className="text-[15px] leading-[1.6] text-[#16201B]">{result}</span>
                </li>
              ))}
            </ul>
          </CaseColumn>
        </div>
      </article>
    </motion.div>
  );
}
