import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Manrope, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { LOCALE_META, getDirection } from '@/i18n/config';
import { I18nProvider } from '@/i18n/provider';
import { getTranslation } from '@/i18n/getDictionary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE } from '@/lib/data/site';

// Polices auto-hébergées par Next (préchargées, sans requête tierce).
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

// Les polices latines ne couvrent pas l'arabe : sans cette famille, le
// navigateur retomberait sur une police système au rendu très inégal.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

const FONT_VARIABLES = [
  manrope.variable,
  spaceGrotesk.variable,
  plexMono.variable,
  plexArabic.variable,
].join(' ');

/** Métadonnées globales, localisées selon le cookie de langue. */
export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getTranslation();

  return {
    metadataBase: new URL(SITE.url),
    title: { default: d.meta.defaultTitle, template: d.meta.titleTemplate },
    description: d.meta.description,
    keywords: d.meta.keywords,
    openGraph: {
      type: 'website',
      locale: LOCALE_META[locale].ogLocale,
      url: SITE.url,
      siteName: d.meta.siteName,
      title: d.meta.defaultTitle,
      description: d.meta.description,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getTranslation();

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      dir={getDirection(locale)}
      className={FONT_VARIABLES}
      suppressHydrationWarning
    >
      <body>
        <I18nProvider initialLocale={locale}>
          {/* Lien d'évitement pour la navigation clavier */}
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-white"
          >
            {t('a11y.skipToContent')}
          </a>
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
