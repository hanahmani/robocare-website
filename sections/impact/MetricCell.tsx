import type { CropIndicator } from '@/lib/data/impact';

type Props = {
  indicator: CropIndicator | null;
};

/** Une cellule du bandeau de métriques — ou une case vide invisible de même gabarit. */
export function MetricCell({ indicator }: Props) {
  if (!indicator) {
    return (
      <div aria-hidden className="invisible flex flex-col gap-1">
        <span className="font-display text-[22px] leading-none lg:text-[24px]">0</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">—</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-[22px] leading-none tracking-[-0.01em] text-leaf-600 lg:text-[24px]">
        {indicator.value}
      </span>
      <span
        title={indicator.label}
        className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-300"
      >
        {indicator.label}
      </span>
    </div>
  );
}
