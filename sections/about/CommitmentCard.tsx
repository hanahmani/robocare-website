'use client';

type Props = {
  title: string;
  text: string;
};

/** Carte « Notre engagement », fond sombre. */
export function CommitmentCard({ title, text }: Props) {
  return (
    <div className="relative overflow-hidden rounded-card border border-lime-500/20 bg-forest-800 p-8 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-lime-500/[0.12] blur-[90px]"
      />

      <p className="relative font-mono text-[10.5px] uppercase tracking-[0.16em] text-lime-500">
        {title}
      </p>
      <p className="relative mt-6 max-w-[52ch] text-[15.5px] leading-[1.8] text-white/75">{text}</p>

      <div className="relative mt-8 border-t border-white/10 pt-6">
        <div aria-hidden className="h-1.5 rounded-full bg-index-scale" />
      </div>
    </div>
  );
}
