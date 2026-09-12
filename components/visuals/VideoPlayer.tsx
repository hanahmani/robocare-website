'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type VideoPlayerHandle = {
  /** Positionne la lecture au timecode donné (secondes) et relance la vidéo. */
  seekTo: (seconds: number) => void;
};

type VideoPlayerProps = {
  src: string;
  poster?: string;
  badgeLabel: string;
  onTimeUpdate?: (seconds: number) => void;
};

/** Halo pulsant autour du bouton play, désactivé sous `prefers-reduced-motion`. */
function PlayRing({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0 rounded-full border-2 border-[#7BC85F]"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/**
 * Carte vidéo portrait (démonstration terrain) : lecture, son, badge et
 * progression sont internes ; le parent pilote les chapitres via `ref`
 * (`seekTo`) et les callbacks `onTimeUpdate` / `onDurationChange`.
 */
export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(function VideoPlayer(
  { src, poster, badgeLabel, onTimeUpdate },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    seekTo(seconds: number) {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = seconds;
      void video.play().catch(() => {});
    },
  }));

  // Lecture par défaut à l'entrée dans le viewport, pause par défaut à la sortie.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[340px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[18px] -top-[26px] -bottom-[34px] rounded-[46px] bg-[radial-gradient(60%_60%_at_50%_35%,rgba(63,156,74,.35),transparent_72%)] blur-2xl"
      />

      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className={[
          'group/card relative aspect-[9/16] overflow-hidden rounded-[26px] bg-[#12211A]',
          'shadow-[0_40px_90px_rgba(12,26,18,.28),0_4px_14px_rgba(12,26,18,.10)]',
          'transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]',
          'hover:-translate-y-1.5 hover:scale-[1.012]',
          'motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
        ].join(' ')}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full cursor-pointer object-cover"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            onTimeUpdate?.(video.currentTime);
            setProgress(video.duration > 0 ? (video.currentTime / video.duration) * 100 : 0);
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(12,26,18,.34) 0%, rgba(12,26,18,0) 34%, rgba(12,26,18,0) 58%, rgba(12,26,18,.55) 100%)',
          }}
        />

        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#12211A]/55 px-3 py-1.5 backdrop-blur-[8px]">
          <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#7BC85F]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white">{badgeLabel}</span>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
          className={[
            'absolute inset-0 m-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#7BC85F]',
            'shadow-[0_18px_40px_rgba(12,26,18,.35)] transition-[transform,background-color,opacity] duration-300 ease-out',
            'hover:scale-[1.08] hover:bg-[#8FD86F] motion-reduce:hover:scale-100',
            isPlaying ? 'opacity-0 group-hover/card:opacity-100' : 'opacity-100',
          ].join(' ')}
        >
          {!isPlaying && !reduced ? (
            <>
              <PlayRing delay={0} />
              <PlayRing delay={1.3} />
            </>
          ) : null}
          {isPlaying ? (
            <Pause size={20} fill="#0C1A12" className="relative text-[#0C1A12]" aria-hidden />
          ) : (
            <Play size={20} fill="#0C1A12" className="relative ms-1 text-[#0C1A12]" aria-hidden />
          )}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="absolute bottom-[22px] right-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#12211A]/50 text-white backdrop-blur-[8px] transition-transform duration-300 ease-out hover:scale-110"
        >
          {isMuted ? <VolumeX size={17} aria-hidden /> : <Volume2 size={17} aria-hidden />}
        </button>

        <div className="absolute bottom-[30px] left-[18px] right-[74px] h-[3px] rounded-full bg-white/[0.26]">
          <div
            className="h-full rounded-full bg-[#7BC85F] transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
});
