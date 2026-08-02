import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data/site';

/**
 * Manifeste web app — installabilité mobile et icône cohérente hors navigateur.
 * Contenu volontairement statique (pas de cookie de langue ici, comme robots/sitemap).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Agriculture de précision par satellite`,
    short_name: SITE.name,
    description: 'Surveillance satellite et IoT pour l’agriculture de précision en Tunisie.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06120C',
    theme_color: '#06120C',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
