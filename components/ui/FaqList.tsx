import { Reveal } from '@/components/animations/Reveal';

export type FaqEntry = { question: string; answer: string };

/**
 * Liste de questions fréquentes (libellés déjà traduits par l'appelant).
 * Basée sur <details> : accessible au clavier et ouvrable sans JavaScript.
 */
export function FaqList({ items }: { items: readonly FaqEntry[] }) {
  return (
    <Reveal className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[20px] border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-colors open:border-leaf-500/30"
        >
          <summary className="flex cursor-pointer items-start justify-between gap-4 font-display text-[17px] font-semibold text-ink-900 lg:text-[18px]">
            {item.question}
            <span
              aria-hidden
              className="mt-1 shrink-0 text-leaf-600 transition-transform duration-300 group-open:rotate-45"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-[18px] w-[18px]"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">{item.answer}</p>
        </details>
      ))}
    </Reveal>
  );
}
