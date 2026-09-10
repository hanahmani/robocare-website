'use client';

import { useEffect, useState } from 'react';
import type { Differentiator } from '@/types';
import { Reveal } from '@/components/animations/Reveal';
import { Section } from '@/components/ui/Section';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTranslation } from '@/i18n';
import { cn, pad2 } from '@/lib/utils';
import { HOME_DIFFERENTIATORS, HOME_DIFFERENTIATOR_POINTS } from '@/lib/data/home';

/** Rayon de l'orbite, en % du conteneur. */
const RADIUS_PCT = 31;
/** Vitesse de rotation automatique, en degrés par tick. */
const ROTATE_STEP = 0.3;
const TICK_MS = 50;

/** Palette fixe de la maquette validée (une teinte par nœud — hors jetons partagés, volontairement). */
const NODE_STYLES: Record<Differentiator['id'], { dot: string; ring: string; tint: string; ink: string }> = {
  data: { dot: '#7a7f83', ring: 'rgba(122,127,131,.35)', tint: '#eceef0', ink: '#464b50' },
  agronomy: { dot: '#37a635', ring: 'rgba(55,166,53,.35)', tint: '#e6f4e5', ink: '#1f6b1e' },
  technology: { dot: '#d92b2b', ring: 'rgba(217,43,43,.35)', tint: '#fbe9e9', ink: '#a01f1f' },
};

/**
 * « En quoi RoboCare est différent » : orbite interactive (data / agronomie /
 * technologie autour de la marque) + synthèse texte + citation. Suit
 * `StatsShowcase` sur l'accueil, juste après le bandeau de chiffres clés.
 */
export function WhyDifferent() {
  const { t, d } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const nodes = d.home.different.nodes;
  const items = d.home.different.items;
  const total = HOME_DIFFERENTIATORS.length;

  const [rotation, setRotation] = useState(0);
  const [openId, setOpenId] = useState<(typeof HOME_DIFFERENTIATORS)[number]['id'] | null>(null);

  useEffect(() => {
    if (reduced || openId) return;
    const id = setInterval(() => {
      setRotation((r) => (r + ROTATE_STEP) % 360);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduced, openId]);

  function select(id: (typeof HOME_DIFFERENTIATORS)[number]['id']) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    const index = HOME_DIFFERENTIATORS.findIndex((n) => n.id === id);
    setRotation((360 - (index / total) * 360) % 360);
    setOpenId(id);
  }

  const open = HOME_DIFFERENTIATORS.find((n) => n.id === openId);

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <h2 className="text-h2">{t('home.different.title')}</h2>
        <span aria-hidden className="mx-auto mt-5 block h-[2px] w-16 bg-leaf-600" />
      </Reveal>

      <div className="mt-section-gap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal
          from="scale"
          className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-panel border border-forest-950/[0.08] bg-white p-6 shadow-soft [container-type:inline-size]"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: 'radial-gradient(circle at 50% 45%, rgba(55,166,53,.12) 0%, rgba(255,255,255,0) 62%)',
            }}
          />
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-950/[0.12]" />
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-forest-950/10" />

          {/* Halo pulsé + badge central */}
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {reduced ? null : (
              <>
                <span
                  aria-hidden
                  className="absolute h-[clamp(70px,21cqw,96px)] w-[clamp(70px,21cqw,96px)] animate-ping-slow rounded-full border"
                  style={{ borderColor: 'rgba(55,166,53,.35)' }}
                />
                <span
                  aria-hidden
                  className="absolute h-[clamp(88px,26cqw,120px)] w-[clamp(88px,26cqw,120px)] animate-ping-slow rounded-full border"
                  style={{ borderColor: 'rgba(55,166,53,.2)', animationDelay: '.8s' }}
                />
              </>
            )}
            <div
              aria-hidden
              className="flex h-[clamp(62px,18cqw,84px)] w-[clamp(62px,18cqw,84px)] items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(140deg, #2f9c2c, #1d7d3f 55%, #d92b2b)',
                boxShadow: '0 0 30px rgba(55,166,53,.45)',
              }}
            >
              <span className="text-[clamp(8px,2.4cqw,11px)] font-semibold tracking-[0.12em] text-white">
                ROBOCARE
              </span>
            </div>
          </div>

          {HOME_DIFFERENTIATORS.map((node, index) => {
            const angle = ((index / total) * 360 + rotation - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * RADIUS_PCT;
            const y = Math.sin(angle) * RADIUS_PCT;
            const isOpen = openId === node.id;
            const dim = openId !== null && !isOpen;
            const Icon = node.icon;
            const style = NODE_STYLES[node.id];

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => select(node.id)}
                aria-pressed={isOpen}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-slow ease-premium"
                style={{ left: `${50 + x}%`, top: `${50 + y}%`, opacity: dim ? 0.45 : 1 }}
              >
                <span
                  className={cn(
                    'flex h-[clamp(32px,10.5cqw,46px)] w-[clamp(32px,10.5cqw,46px)] items-center justify-center rounded-full border-2 transition-transform duration-base ease-premium',
                    isOpen && 'scale-125',
                  )}
                  style={{
                    background: style.dot,
                    borderColor: isOpen ? style.dot : 'rgba(255,255,255,.9)',
                    boxShadow: isOpen ? `0 0 0 4px ${style.ring}, 0 6px 16px rgba(15,21,18,.22)` : '0 2px 8px rgba(15,21,18,.14)',
                  }}
                >
                  <Icon size={16} className="text-white" aria-hidden />
                </span>
                <span
                  className={cn(
                    'absolute left-1/2 top-[calc(50%+clamp(24px,8cqw,34px))] block -translate-x-1/2 whitespace-nowrap text-[clamp(8px,2.4cqw,11px)] font-semibold uppercase tracking-[0.12em] transition-opacity',
                    isOpen ? 'opacity-0' : 'text-ink-500 opacity-100',
                  )}
                  style={isOpen ? undefined : { color: style.ink }}
                >
                  {nodes[node.id].label}
                </span>
              </button>
            );
          })}

          {open ? (
            <div className="absolute inset-x-4 bottom-4 z-40 rounded-tile border border-forest-950/10 bg-white/95 p-5 shadow-lift backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ background: NODE_STYLES[open.id].tint, color: NODE_STYLES[open.id].ink }}
                >
                  {nodes[open.id].meta}
                </span>
              </div>
              <h3 className="mt-2.5 text-[15px] font-semibold text-ink-900">{nodes[open.id].label}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-ink-500">{nodes[open.id].content}</p>

              <div className="mt-3.5 border-t border-forest-950/10 pt-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-300">
                  {t('home.different.connected')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {HOME_DIFFERENTIATORS.filter((n) => n.id !== open.id).map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => select(n.id)}
                      className="rounded-field border border-forest-950/10 px-2.5 py-1 text-[11px] text-ink-500 transition-colors duration-base hover:border-leaf-500/40 hover:text-ink-900"
                    >
                      {nodes[n.id].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </Reveal>

        <Reveal from="right">
          <p className="text-lead font-medium text-ink-900">{t('home.different.lead')}</p>
          <p className="mt-4 text-body text-ink-500">{t('home.different.body')}</p>

          <p className="mt-8 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
            {t('home.different.servicesLabel')}
          </p>
          <ol className="mt-3">
            {HOME_DIFFERENTIATOR_POINTS.map((id, index) => (
              <li
                key={id}
                className="grid grid-cols-[28px_1fr] items-baseline gap-3.5 border-t border-forest-950/10 py-3.5 first:border-t-0"
              >
                <span className="font-mono text-[12px] font-semibold text-leaf-600">{pad2(index)}</span>
                <span className="text-[16px] leading-[1.5] text-ink-900">{items[id]}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal className="mt-10 rounded-tile border border-forest-950/[0.08] bg-white p-7 shadow-soft lg:p-8">
        <p className="text-[19px] leading-[1.7] text-ink-900">{t('home.different.quote')}</p>
      </Reveal>
    </Section>
  );
}
