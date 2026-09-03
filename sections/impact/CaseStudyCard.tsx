import { CheckRow } from '@/components/ui/Card';
import { CaseColumn } from '@/sections/impact/CaseColumn';

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
};

/** Une étude de cas : bandeau sombre + trois colonnes (défi, solution, résultats). */
export function CaseStudyCard({ slug, title, meta, challenge, solution, results, labels }: Props) {
  return (
    <article
      id={slug}
      className="scroll-mt-24 overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft transition-surface duration-slow ease-premium hover:border-leaf-600/25 hover:shadow-hover"
    >
      <header className="relative overflow-hidden bg-[linear-gradient(165deg,#0B2015,#06120C_75%)] px-8 py-7 lg:px-10 lg:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-lime-500/[0.12] blur-[90px]"
        />
        <h3 className="relative text-[22px] text-white lg:text-[24px]">{title}</h3>
        <div className="relative mt-2.5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-lime-500">
          {meta.map((token) => (
            <span key={token}>{token}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:p-10 lg:items-stretch">
        <CaseColumn index={0} label={labels.challenge} className="lg:col-span-4">
          <p className="text-[14.5px] leading-[1.7] text-ink-700">{challenge}</p>
        </CaseColumn>

        <CaseColumn
          index={1}
          label={labels.solution}
          className="sm:border-s sm:border-forest-950/[0.06] sm:ps-8 lg:col-span-4"
        >
          <p className="text-[14.5px] leading-[1.7] text-ink-700">{solution}</p>
        </CaseColumn>

        <CaseColumn
          index={2}
          label={labels.results}
          className="sm:col-span-2 lg:col-span-4 lg:border-s lg:border-forest-950/[0.06] lg:ps-8"
        >
          <ul className="flex flex-col gap-3.5">
            {results.map((result) => (
              <CheckRow key={result}>{result}</CheckRow>
            ))}
          </ul>
        </CaseColumn>
      </div>
    </article>
  );
}
