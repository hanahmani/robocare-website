'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { HOME_TESTIMONIALS } from '@/lib/data/home';

const RISE_EASE = 'cubic-bezier(.22,1,.36,1)';
const MONO_FONT = 'var(--font-jetbrains), var(--font-plex-mono), monospace';
const CARD_ENTRY_DELAYS = [0.05, 0.12, 0.19] as const;

type TestimonialsCarouselProps = {
  autoplay?: boolean;
  /** Secondes entre deux rotations automatiques, borné à [3, 15]. */
  intervalSeconds?: number;
  showNav?: boolean;
  accent?: string;
};

function hexToRgb(hex: string): string {
  const value = hex.replace('#', '');
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((char) => char + char)
          .join('')
      : value;
  const int = parseInt(normalized, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

/**
 * Carrousel « Retours d'exploitation » : rotation automatique pausable au
 * survol, sans dépendance externe. Le texte vient de `home.testimonials.*`
 * (fr/en/ar) — inchangé par rapport au bloc qu'il remplace.
 */
export function TestimonialsCarousel({
  autoplay = true,
  intervalSeconds = 6,
  showNav = true,
  accent = '#3F9C4A',
}: TestimonialsCarouselProps) {
  const { t, d } = useTranslation();
  const quotes = d.home.testimonials.items;
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const accentRgb = hexToRgb(accent);
  const clampedIntervalMs = Math.min(15, Math.max(3, intervalSeconds)) * 1000;

  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);

    const fallback = setTimeout(() => setRevealed(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [reduced]);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!autoplay || reduced) return;
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((current) => (current + 1) % HOME_TESTIMONIALS.length);
      }
    }, clampedIntervalMs);
  }, [autoplay, reduced, clampedIntervalMs]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goTo = (index: number) => {
    const count = HOME_TESTIMONIALS.length;
    setActive(((index % count) + count) % count);
    restartTimer();
  };

  const riseStyle = (delay: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(18px)',
    transition: reduced ? 'none' : `opacity .7s ${RISE_EASE} ${delay}s, transform .7s ${RISE_EASE} ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative px-[clamp(20px,5vw,88px)] py-[clamp(56px,6.5vw,104px)]"
      style={{
        backgroundImage:
          'radial-gradient(120% 80% at 12% 0%, #F3FAF5 0%, #FFFFFF 55%), linear-gradient(180deg, #FFFFFF 0%, #F7FBF8 100%)',
        fontFamily: 'var(--font-schibsted), var(--font-manrope), sans-serif',
      }}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex items-center gap-2.5" style={riseStyle(0)}>
          <span
            aria-hidden
            className="h-[2px] w-10 origin-left"
            style={{
              background: accent,
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transition: reduced ? 'none' : 'transform .9s cubic-bezier(.22,1,.36,1) .12s',
            }}
          />
          <p
            className="font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: accent, fontFamily: MONO_FONT, fontWeight: 500 }}
          >
            {t('home.testimonials.eyebrow')}
          </p>
        </div>

        <h2
          className="mt-4 max-w-[17ch] text-balance text-[clamp(34px,4.2vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0C1A12]"
          style={riseStyle(0.1)}
        >
          {t('home.testimonials.title')}
        </h2>

        <div
          className="mt-12 grid items-center gap-[clamp(18px,2vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {HOME_TESTIMONIALS.map((id, index) => {
            const quote = quotes[id];
            return (
              <TestimonialCard
                key={id}
                active={isMobile || index === active}
                accentRgb={accentRgb}
                reduced={reduced}
                revealed={revealed}
                entryDelay={CARD_ENTRY_DELAYS[index]}
                quote={quote.quote}
                role={quote.role}
                context={quote.context}
                onSelect={() => goTo(index)}
              />
            );
          })}
        </div>

        {showNav ? (
          <div className="mt-9 flex items-center justify-center gap-4">
            <NavArrow direction="left" accentRgb={accentRgb} onClick={() => goTo(active - 1)} />
            <div className="flex items-center gap-2">
              {HOME_TESTIMONIALS.map((id, index) => (
                <button
                  key={id}
                  type="button"
                  aria-label={`${t('home.testimonials.eyebrow')} ${index + 1}/${HOME_TESTIMONIALS.length}`}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                  className="h-[5px] rounded-[3px] transition-[width,background-color] duration-300 ease-out"
                  style={{
                    width: index === active ? 28 : 14,
                    background: index === active ? accent : 'rgba(18,33,26,.14)',
                  }}
                />
              ))}
            </div>
            <NavArrow direction="right" accentRgb={accentRgb} onClick={() => goTo(active + 1)} />
          </div>
        ) : null}

        <p
          className="mt-8 text-center font-mono text-[11.5px] uppercase tracking-[0.1em] text-[#A6B3AB]"
          style={{ fontFamily: MONO_FONT, fontWeight: 500 }}
        >
          {t('home.testimonials.note')}
        </p>
      </div>
    </section>
  );
}

function TestimonialCard({
  active,
  accentRgb,
  reduced,
  revealed,
  entryDelay,
  quote,
  role,
  context,
  onSelect,
}: {
  active: boolean;
  accentRgb: string;
  reduced: boolean;
  revealed: boolean;
  entryDelay: number;
  quote: string;
  role: string;
  context: string;
  onSelect: () => void;
}) {
  const stateTransition = reduced
    ? 'background .45s, box-shadow .5s, border-color .45s, color .45s, font-size .45s'
    : `transform .55s ${RISE_EASE}, background .45s, box-shadow .5s, border-color .45s, color .45s, font-size .45s`;

  return (
    <figure
      onClick={onSelect}
      className="relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] border p-[clamp(26px,2.4vw,34px)] px-[clamp(24px,2.2vw,32px)]"
      style={{
        background: active ? '#FFFFFF' : '#F2F7F3',
        borderColor: active ? `rgba(${accentRgb},.22)` : 'rgba(18,33,26,.06)',
        boxShadow: active ? '0 26px 60px rgba(16,40,26,.13)' : 'none',
        color: active ? '#0C1A12' : '#8A9990',
        transform: reduced || active ? 'scale(1)' : 'scale(.955)',
        opacity: revealed ? 1 : 0,
        transition: `${stateTransition}, opacity .7s ease-out ${entryDelay}s`,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-3 select-none text-[96px] font-bold leading-none"
        style={{ color: 'currentColor', opacity: 0.1 }}
      >
        &ldquo;
      </span>

      <blockquote
        className="relative"
        style={{
          fontSize: active ? 17.5 : 15,
          lineHeight: 1.6,
          transition: reduced ? 'none' : 'font-size .45s',
        }}
      >
        {quote}
      </blockquote>

      <div aria-hidden className="relative mt-6 h-px w-full" style={{ background: 'currentColor', opacity: 0.16 }} />

      <figcaption className="relative mt-4">
        <p className="text-[14.5px] font-semibold">{role}</p>
        <p
          className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.1em]"
          style={{ color: active ? `rgb(${accentRgb})` : '#A6B3AB', fontFamily: MONO_FONT, fontWeight: 500 }}
        >
          {context}
        </p>
      </figcaption>
    </figure>
  );
}

function NavArrow({
  direction,
  accentRgb,
  onClick,
}: {
  direction: 'left' | 'right';
  accentRgb: string;
  onClick: () => void;
}) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Témoignage précédent' : 'Témoignage suivant'}
      className={[
        'grid h-[46px] w-[46px] place-items-center rounded-full border',
        'transition-[transform,border-color,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.8,.3,1)]',
        'hover:shadow-[0_8px_20px_rgba(16,40,26,.08)]',
        'motion-reduce:transition-none motion-reduce:hover:translate-x-0',
        direction === 'left' ? 'hover:-translate-x-[2px]' : 'hover:translate-x-[2px]',
      ].join(' ')}
      style={{ borderColor: `rgba(${accentRgb},.24)` }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = `rgba(${accentRgb},.5)`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = `rgba(${accentRgb},.24)`;
      }}
    >
      <Icon size={18} style={{ color: `rgb(${accentRgb})` }} aria-hidden />
    </button>
  );
}
