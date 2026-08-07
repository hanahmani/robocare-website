// Aucun script, iframe ou traceur tiers dans le projet à ce jour : la CSP peut
// rester stricte sur tout sauf `script-src`. Si un provider de chat distant
// (`NEXT_PUBLIC_CHAT_ENDPOINT`) ou un traceur est ajouté plus tard, son
// origine doit rejoindre `connect-src`.
//
// `script-src` a besoin de `'unsafe-inline'` : l'App Router de Next.js
// injecte lui-même le payload React Server Components dans des
// `<script>self.__next_f.push(...)</script>` inline (hydratation) — sans
// cette autorisation, React ne s'hydrate jamais et la page reste blanche.
// L'alternative plus stricte (nonce par requête, cf. doc Next.js CSP) exige
// de lire `headers()` dans le rendu, ce qui bascule TOUTES les pages en
// rendu dynamique et annule le gain de génération statique obtenu par la
// migration i18n (voir `app/[locale]/layout.tsx`). Le projet ne rendant
// aucun contenu utilisateur non échappé (le seul `dangerouslySetInnerHTML`
// est le JSON-LD, lui-même échappé), ce compromis est acceptable.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: CSP },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Les visuels sont servis depuis /public : formats modernes + tailles utiles.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
