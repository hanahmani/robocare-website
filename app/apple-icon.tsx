import { ImageResponse } from 'next/og';

/**
 * Icône iOS (Ajouter à l'écran d'accueil), générée au build — même symbole
 * que `icon.svg`, en PNG plein format car Apple ne lit pas le SVG ici.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06120C',
        }}
      >
        <svg width="128" height="128" viewBox="0 0 24 24" fill="none">
          <path d="M20 4c0 8.5-4.4 13-11 13H5.5C5.5 8.5 11 4 20 4Z" fill="#9ED84B" />
          <path d="M4 21c1.8-5.2 4.7-8.6 9-10.5" stroke="#06120C" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
