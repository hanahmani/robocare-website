'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  src: string;
  className?: string;
  /** Ratio d'affichage de la vidéo (classe Tailwind `aspect-*`). */
  aspectClassName?: string;
};

/** Lecteur vidéo personnalisé : play/pause central, mute, progression, autoplay au scroll. */
export function VideoPlayer({ src, className, aspectClassName = 'aspect-video' }: VideoPlayerProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative overflow-hidden rounded-card border border-white/[0.14] bg-forest-950 shadow-glass',
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        playsInline
        preload="metadata"
        className={cn('w-full cursor-pointer object-cover', aspectClassName)}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,12,.15)_0%,transparent_28%,transparent_72%,rgba(6,18,12,.35)_100%)]" />

      {/* Bouton play/pause central */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? t('a11y.pauseVideo') : t('a11y.playVideo')}
        className={cn(
          'absolute inset-0 m-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-lime-500 text-forest-950 shadow-lime transition-surface duration-base ease-premium hover:scale-110',
          isPlaying && 'opacity-0 group-hover:opacity-100',
        )}
      >
        {!isPlaying ? (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-lime-500/60 animate-ping-slow"
          />
        ) : null}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isPlaying ? 'pause' : 'play'}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={26} fill="currentColor" aria-hidden />
            ) : (
              <Play size={26} fill="currentColor" className="ms-0.5" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Bouton mute/unmute */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? t('a11y.unmuteVideo') : t('a11y.muteVideo')}
        className="glass absolute bottom-4 end-4 flex h-11 w-11 items-center justify-center rounded-full text-white transition-surface duration-base ease-premium hover:scale-110 hover:border-lime-500/50 hover:text-lime-500"
      >
        {isMuted ? (
          <VolumeX size={18} aria-hidden />
        ) : (
          <Volume2 size={18} aria-hidden />
        )}
      </button>

      {/* Barre de progression discrète */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
        <div
          className="h-full bg-lime-500 transition-[width] duration-fast ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
