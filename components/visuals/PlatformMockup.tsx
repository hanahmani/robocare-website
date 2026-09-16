'use client';

import { useTranslation } from '@/i18n';

/**
 * Teintes des parcelles, de l'indice le plus faible au plus dense. La maquette
 * d'origine s'appuyait sur les jetons `--primitive-brand-*` du design system
 * v2, absents du projet : l'échelle est reportée sur les couleurs du thème.
 */
const NDVI_FILL = {
  low: 'fill-sage-300',
  mid: 'fill-lime-500',
  high: 'fill-leaf-500',
  dense: 'fill-leaf-600',
  stress: 'fill-ocre-400',
} as const;

type Fill = keyof typeof NDVI_FILL;

/** Parcelles de la carte : positions figées, reprises de la maquette. */
const PARCELS: readonly { x: number; y: number; w: number; h: number; fill: Fill }[] = [
  { x: 14, y: 14, w: 66, h: 44, fill: 'mid' },
  { x: 84, y: 14, w: 52, h: 44, fill: 'high' },
  { x: 140, y: 14, w: 74, h: 44, fill: 'low' },
  { x: 218, y: 14, w: 88, h: 44, fill: 'high' },
  { x: 14, y: 62, w: 52, h: 50, fill: 'dense' },
  { x: 70, y: 62, w: 80, h: 50, fill: 'stress' },
  { x: 154, y: 62, w: 60, h: 50, fill: 'mid' },
  { x: 218, y: 62, w: 88, h: 50, fill: 'low' },
  { x: 14, y: 116, w: 74, h: 50, fill: 'high' },
  { x: 92, y: 116, w: 58, h: 50, fill: 'low' },
  { x: 154, y: 116, w: 70, h: 50, fill: 'mid' },
  { x: 228, y: 116, w: 78, h: 50, fill: 'dense' },
];

/** Capteurs posés sur la carte. */
const SENSORS = [
  { cx: 48, cy: 36 },
  { cx: 176, cy: 36 },
  { cx: 110, cy: 88 },
  { cx: 262, cy: 88 },
  { cx: 120, cy: 142 },
  { cx: 266, cy: 142 },
];

const TILE = 'rounded-[9px] border border-forest-950/[0.08]';
const RULE = 'border-forest-950/[0.08]';

/**
 * Maquette produit de la section plateforme : fenêtre de navigateur et
 * téléphone. Purement décorative — l'ensemble est `aria-hidden`, les mêmes
 * informations étant portées par le texte de la section.
 *
 * Le téléphone disparaît sous 640px : à cette largeur il ne restait plus assez
 * de place pour les deux appareils sans écraser la fenêtre principale.
 */
export function PlatformMockup() {
  const { d } = useTranslation();
  const mock = d.home.platform.mock;

  const stats = [
    { ...mock.stats.ndvi, tone: 'text-ink-900' },
    { ...mock.stats.moisture, tone: 'text-ocre-600' },
    { ...mock.stats.sensors, tone: 'text-ink-900' },
    { ...mock.stats.irrigation, tone: 'text-ink-900' },
  ];

  return (
    <div aria-hidden className="flex min-w-0 items-end">
      {/* Fenêtre de navigateur */}
      <div
        className={`min-w-0 flex-1 overflow-hidden rounded-[14px] border bg-white ${RULE} shadow-[0_28px_60px_-32px_rgba(30,43,13,.35)]`}
      >
        <div className={`flex items-center gap-2.5 border-b px-3.5 py-2.5 ${RULE}`}>
          <div className="flex gap-[5px]">
            <span className="block h-1.5 w-1.5 rounded-full bg-sage-300" />
            <span className="block h-1.5 w-1.5 rounded-full bg-sage-300" />
            <span className="block h-1.5 w-1.5 rounded-full bg-sage-300" />
          </div>
          <div className="mx-auto max-w-[180px] flex-1 truncate rounded-full bg-sage-50 px-2.5 py-[3px] text-center text-[9px] text-ink-300">
            app.robocare.tn
          </div>
          <div className="w-7" />
        </div>

        <div className="grid grid-cols-[40px_minmax(0,1fr)]">
          <div className={`flex flex-col items-center gap-2.5 border-e py-3 ${RULE}`}>
            <div className="grid h-[22px] w-[22px] place-items-center rounded-[7px] bg-leaf-600 text-[11px] font-bold text-white">
              R
            </div>
            <span className="mt-1 block h-0.5 w-4 rounded bg-leaf-500" />
            <span className="block h-0.5 w-4 rounded bg-sage-300" />
            <span className="block h-0.5 w-4 rounded bg-sage-300" />
            <span className="block h-0.5 w-4 rounded bg-sage-300" />
          </div>

          <div className="min-w-0 px-4 pb-4 pt-3.5">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <strong className="text-[13px] font-semibold text-ink-900">{mock.farm}</strong>
              <span className="text-[9.5px] text-ink-300">{mock.meta}</span>
              <span className="ms-auto text-[9px] text-ink-300">{mock.capture}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className={`${TILE} px-[9px] py-2`}>
                  <span className="block text-[8px] text-ink-300">{stat.label}</span>
                  <strong
                    dir="ltr"
                    className={`text-[15px] font-semibold tracking-[-0.02em] rtl:text-right ${stat.tone}`}
                  >
                    {stat.value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2.5 [grid-template-columns:minmax(0,1.35fr)_minmax(0,1fr)]">
              {/* Carte NDVI */}
              <div className={`relative min-h-[132px] overflow-hidden ${TILE}`}>
                <svg
                  viewBox="0 0 320 180"
                  preserveAspectRatio="none"
                  className="absolute inset-0 block h-full w-full"
                >
                  <rect width="320" height="180" className="fill-sage-50" />
                  <g className="animate-ndvi motion-reduce:animate-none" stroke="#fff" strokeWidth="1.5">
                    {PARCELS.map((parcel) => (
                      <rect
                        key={`${parcel.x}-${parcel.y}`}
                        x={parcel.x}
                        y={parcel.y}
                        width={parcel.w}
                        height={parcel.h}
                        rx="2"
                        className={NDVI_FILL[parcel.fill]}
                      />
                    ))}
                  </g>
                  <g className="fill-leaf-700" stroke="#fff" strokeWidth="1.6">
                    {SENSORS.map((sensor) => (
                      <circle key={`${sensor.cx}-${sensor.cy}`} cx={sensor.cx} cy={sensor.cy} r="3.4" />
                    ))}
                  </g>
                </svg>

                <div className="absolute bottom-2 start-2 rounded-md bg-white/95 px-1.5 py-1 text-[7.5px] text-ink-500">
                  {mock.legend}
                  <div className="my-[3px] h-1 w-[68px] rounded-sm bg-index-scale" />
                  <div dir="ltr" className="flex justify-between">
                    <span>0,1</span>
                    <span>0,9</span>
                  </div>
                </div>
              </div>

              {/* Parcelles à surveiller */}
              <div className={`flex min-w-0 flex-col gap-1.5 px-2.5 py-[9px] ${TILE}`}>
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.06em] text-ink-300">
                  {mock.watchTitle}
                </span>
                {mock.watch.map((row, index) => (
                  <div
                    key={row.field}
                    className={`flex items-center justify-between gap-2 py-[5px] ${
                      index < mock.watch.length - 1 ? `border-b ${RULE}` : ''
                    }`}
                  >
                    <span className="text-[9.5px] font-semibold">{row.field}</span>
                    <span
                      className={`text-[9px] ${index === 0 ? 'font-semibold text-ocre-600' : 'text-ink-500'}`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="mt-auto rounded-[7px] bg-sage-200 px-2 py-[7px] text-[8.5px] font-semibold leading-[1.35] text-leaf-700">
                  {mock.advice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Téléphone : chevauche la fenêtre, du côté « fin de ligne » (donc à
          gauche en arabe, la marge négative suivant le sens de lecture). */}
      <div
        className={`relative z-[2] -mb-[18px] ms-[-26px] hidden w-[26%] min-w-[9.5rem] max-w-[12.5rem] flex-none rounded-[22px] border bg-white p-[5px] sm:block ${RULE} shadow-[0_22px_44px_-20px_rgba(30,43,13,.4)]`}
      >
        <div className="flex flex-col overflow-hidden rounded-[18px] bg-white">
          <div className={`flex items-center justify-center gap-1.5 border-b px-2 pb-[7px] pt-1.5 ${RULE}`}>
            <span className="block h-[5px] w-[18px] rounded-full bg-sage-300" />
            <span className="text-[6.5px] text-ink-300">app.robocare.tn</span>
          </div>

          <div className="flex flex-col gap-[7px] px-2.5 pb-2.5 pt-[9px]">
            <div>
              <strong className="block text-[10px] font-semibold">{mock.phone.field}</strong>
              <span className="text-[7px] text-ink-300">{mock.phone.crop}</span>
            </div>

            <div className={`h-[58px] overflow-hidden rounded-lg border ${RULE}`}>
              <svg viewBox="0 0 160 80" preserveAspectRatio="none" className="block h-full w-full">
                <rect width="160" height="80" className="fill-sage-50" />
                <rect
                  x="8"
                  y="8"
                  width="144"
                  height="64"
                  rx="2"
                  className="fill-ocre-400"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <rect x="58" y="24" width="56" height="34" rx="2" className="fill-sage-300" opacity=".85" />
                <circle cx="34" cy="42" r="3.4" className="fill-leaf-700" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex gap-1.5">
              <div className={`flex-1 rounded-[7px] border px-1.5 py-[5px] ${RULE}`}>
                <span className="block text-[6.5px] text-ink-300">{mock.phone.ndviLabel}</span>
                <strong dir="ltr" className="text-[11px] font-semibold rtl:text-right">
                  {mock.phone.ndviValue}
                </strong>
              </div>
              <div className={`flex-1 rounded-[7px] border px-1.5 py-[5px] ${RULE}`}>
                <span className="block text-[6.5px] text-ink-300">{mock.phone.soilLabel}</span>
                <strong dir="ltr" className="text-[11px] font-semibold text-ocre-600 rtl:text-right">
                  {mock.phone.soilValue}
                </strong>
              </div>
            </div>

            <div className="rounded-[7px] bg-leaf-600 px-[7px] py-1.5 text-center text-[7px] font-semibold leading-[1.35] text-white">
              {mock.phone.advice}
            </div>
          </div>

          <div className={`flex justify-around border-t pb-2 pt-1.5 ${RULE}`}>
            <span className="block h-0.5 w-3 rounded-sm bg-leaf-600" />
            <span className="block h-0.5 w-3 rounded-sm bg-sage-300" />
            <span className="block h-0.5 w-3 rounded-sm bg-sage-300" />
            <span className="block h-0.5 w-3 rounded-sm bg-sage-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
