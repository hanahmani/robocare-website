'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, pad2 } from '@/lib/utils';

type ConceptTone = 'leaf' | 'ocre';

type ConceptCopy = {
  title: string;
  text: string;
  text2: string;
  points: string[];
};

const ACCENT_TEXT: Record<ConceptTone, string> = {
  leaf: 'text-leaf-600',
  ocre: 'text-ocre-600',
};

const HAIRLINE_HOVER: Record<ConceptTone, string> = {
  leaf: 'hover:border-t-leaf-600 focus-within:border-t-leaf-600',
  ocre: 'hover:border-t-ocre-600 focus-within:border-t-ocre-600',
};

const FOCUS_RING: Record<ConceptTone, string> = {
  leaf: 'focus-visible:outline-leaf-500',
  ocre: 'focus-visible:outline-ocre-500',
};

const EASE = 'cubic-bezier(.22,.7,.25,1)';

type Props = {
  index: number;
  copy: ConceptCopy;
  tone: ConceptTone;
  revealed: boolean;
  delayMs: number;
  reduced: boolean;
};

/**
 * Une brique agronomique / technique — bloc « Les fondamentaux » (page
 * Solutions). Pas de carte : un filet, un numéro, un titre, un fait court par
 * ligne, et le détail technique derrière une disclosure.
 */
export function ConceptCard({ index, copy, tone, revealed, delayMs, reduced }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className={cn(
        'group border-t border-forest-950/[0.1] pt-6',
        'transition-[border-color,border-width] duration-[220ms] ease-out',
        'hover:border-t-2 focus-within:border-t-2',
        HAIRLINE_HOVER[tone],
      )}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'none' : 'translateY(14px)',
        transition: reduced
          ? 'opacity .01ms, transform .01ms'
          : `opacity 520ms ${EASE} ${delayMs}ms, transform 520ms ${EASE} ${delayMs}ms`,
        willChange: revealed ? undefined : 'transform, opacity',
      }}
      onTransitionEnd={(event) => {
        if (event.propertyName === 'transform') event.currentTarget.style.willChange = 'auto';
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className={cn(
            'font-mono text-[12px] tabular-nums transition-transform duration-200 ease-out',
            'group-hover:translate-x-1 group-focus-within:translate-x-1',
            ACCENT_TEXT[tone],
          )}
        >
          {pad2(index)}
        </span>
        <h3 className="text-h3 tracking-[-0.02em] text-ink-900">{copy.title}</h3>
      </div>

      <p className="mt-3 max-w-[50ch] text-[15px] leading-[1.6] text-ink-500">{copy.text}</p>

      <div className="mt-5 flex flex-wrap gap-y-2">
        {copy.points.map((point, i) => (
          <span
            key={point}
            className={cn(
              'text-[13px] leading-[1.4] text-ink-500',
              i > 0 && 'border-s border-forest-950/[0.12] ps-4 ms-4',
            )}
          >
            {point}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
          ACCENT_TEXT[tone],
          FOCUS_RING[tone],
        )}
      >
        {open ? 'Close' : 'How it works'}
        <ChevronDown
          size={15}
          aria-hidden
          className="transition-transform duration-200 ease-out"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      <div
        id={panelId}
        className="grid"
        style={{
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: reduced ? 'grid-template-rows .01ms' : `grid-template-rows 380ms ${EASE}`,
        }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pt-4 text-[14px] leading-[1.6] text-ink-500">{copy.text2}</p>
        </div>
      </div>
    </article>
  );
}
