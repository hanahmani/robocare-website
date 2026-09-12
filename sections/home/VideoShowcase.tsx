'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { VideoPlayer, type VideoPlayerHandle } from '@/components/visuals/VideoPlayer';

const RISE_EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = '#3F9C4A';

const CHAPTERS = [
  { time: 0, label: 'Les parcelles suivies en imagerie satellitaire' },
  { time: 39, label: 'RoboCare présenté par Dr. Imen Hbiri' },
  { time: 136, label: "L'application RoboCare en démonstration" },
] as const;

function formatTimecode(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Halo d'ambiance qui dérive doucement en boucle, désactivé sous reduced-motion. */
function AmbientHalo({
  className,
  color,
  duration,
  reverse,
  reduced,
}: {
  className: string;
  color: string;
  duration: number;
  reverse?: boolean;
  reduced: boolean;
}) {
  const dx = reverse ? -24 : 24;
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
      animate={reduced ? undefined : { x: [0, dx, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Section « RoboCare en action » : argumentaire + chapitres, et la vidéo de démonstration terrain. */
export function VideoShowcase({ showChapters = true, accent = ACCENT }: { showChapters?: boolean; accent?: string }) {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const playerRef = useRef<VideoPlayerHandle>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const activeChapter = useMemo(() => {
    let index = 0;
    CHAPTERS.forEach((chapter, i) => {
      if (currentTime + 0.5 >= chapter.time) index = i;
    });
    return index;
  }, [currentTime]);

  const goToChapter = (index: number) => {
    playerRef.current?.seekTo(CHAPTERS[index].time);
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: reduced ? { duration: 0 } : { duration: 0.8, ease: RISE_EASE, delay },
  });

  return (
    <section
      className="relative overflow-hidden px-[clamp(20px,5vw,88px)] py-[clamp(64px,7vw,116px)]"
      style={{
        backgroundImage:
          'radial-gradient(110% 70% at 8% 0%, #F1F9F3 0%, #FFFFFF 55%), linear-gradient(180deg, #FFFFFF 0%, #F5FAF6 100%)',
      }}
    >
      <AmbientHalo
        className="-right-40 -top-40 h-[520px] w-[520px]"
        color="rgba(123,200,95,.30)"
        duration={16}
        reduced={reduced}
      />
      <AmbientHalo
        className="-bottom-40 -left-40 h-[460px] w-[460px]"
        color="rgba(63,156,74,.16)"
        duration={21}
        reverse
        reduced={reduced}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-[clamp(40px,5vw,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div>
          <motion.div {...rise(0)} className="flex items-center gap-2.5">
            <span aria-hidden className="h-[2px] w-10" style={{ background: accent }} />
            <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: '#2F7D3A' }}>
              {t('home.videoShowcase.eyebrow')}
            </p>
          </motion.div>

          <motion.h2
            {...rise(0.08)}
            className="mt-4 max-w-[15ch] text-balance text-[clamp(36px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#0C1A12]"
          >
            {t('home.videoShowcase.title')}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className="mt-[18px] max-w-[46ch] text-[clamp(16.5px,1.3vw,18.5px)] leading-[1.65] text-[#4A5C52]"
          >
            {t('home.videoShowcase.subtitle')}
          </motion.p>

          {showChapters ? (
            <motion.div {...rise(0.24)} className="mt-2 border-t border-[rgba(18,33,26,.08)]">
              {CHAPTERS.map((chapter, index) => {
                const isActive = index === activeChapter;
                return (
                  <button
                    key={chapter.time}
                    type="button"
                    onClick={() => goToChapter(index)}
                    aria-current={isActive}
                    className="grid w-full grid-cols-[62px_1fr_auto] items-center gap-2 border-b border-[rgba(18,33,26,.08)] py-4 pl-1 pr-1 text-start transition-[padding] duration-[350ms] ease-out hover:pl-[10px]"
                  >
                    <span
                      className="font-mono text-[12px]"
                      style={{ color: isActive ? accent : '#8A9990' }}
                    >
                      {formatTimecode(chapter.time)}
                    </span>
                    <span
                      className="text-[16px] font-medium transition-colors duration-[350ms] ease-out"
                      style={{ color: isActive ? '#0C1A12' : '#4A5C52' }}
                    >
                      {chapter.label}
                    </span>
                    <span
                      aria-hidden
                      className="h-[7px] w-[7px] shrink-0 rounded-full transition-transform duration-300 ease-out"
                      style={{
                        background: isActive ? accent : '#C7D2CB',
                        transform: isActive ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                  </button>
                );
              })}
            </motion.div>
          ) : null}

          <motion.div {...rise(0.32)} className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => goToChapter(0)}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#12211A] px-6 py-3.5 font-semibold text-white shadow-[0_12px_26px_rgba(16,40,26,.16)] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(16,40,26,.22)]"
            >
              Voir la démonstration
              <span aria-hidden>→</span>
            </button>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-[#8A9990]">
              2 min 48 · Sfax, 2025
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduced ? { duration: 0 } : { duration: 1, ease: RISE_EASE, delay: 0.18 }}
        >
          <VideoPlayer
            ref={playerRef}
            src="/vd_robocare.mp4"
            poster="/hero/satellite-field.webp"
            badgeLabel="Terrain · Oliveraie"
            onTimeUpdate={setCurrentTime}
          />
        </motion.div>
      </div>
    </section>
  );
}
