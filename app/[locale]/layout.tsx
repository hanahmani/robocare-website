import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
  Manrope,
  Schibsted_Grotesk,
  Space_Grotesk,
} from 'next/font/google';
import '@/styles/globals.css';
import { LOCALES, LOCALE_META, getDirection, isLocale, type Locale } from '@/i18n/config';
import { I18nProvider } from '@/i18n/provider';
import { getTranslation } from '@/i18n/getDictionary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { DemoModalProvider } from '@/components/demo/DemoModalProvider';
import { MotionProvider } from '@/components/animations/MotionProvider';
import { PageLoader } from '@/components/animations/PageLoader';
import { PageTransition } from '@/components/animations/PageTransition';
import { JsonLd } from '@/components/seo/JsonLd';
import { graph, organizationSchema, websiteSchema } from '@/lib/seo/schema';
import { SITE } from '@/lib/data/site';
import { languageAlternates } from '@/lib/seo/metadata';

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

// Duo dédié au carrousel de témoignages (section « Retours d'exploitation ») :
// n'affecte pas `font-sans` / `font-mono`, disponible via `var(--font-…)`.
const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-schibsted',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const FONT_VARIABLES = [
  manrope.variable,
  spaceGrotesk.variable,
  plexMono.variable,
  plexArabic.variable,
  schibstedGrotesk.variable,
  jetbrainsMono.variable,
].join(' ');

/** Génère les trois pages `/fr`, `/en`, `/ar` en statique au build. */
export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

/** Couleur de l'UI navigateur (barre d'adresse mobile, splash PWA) : fond de marque. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#06120C',
};

type LayoutParams = { params: Promise<{ locale: string }> };

/** Métadonnées globales, localisées selon la langue de l'URL. */
export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const { d } = getTranslation(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: { default: d.meta.defaultTitle, template: d.meta.titleTemplate },
    description: d.meta.description,
    keywords: d.meta.keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    applicationName: SITE.name,
    category: 'Agriculture technology',
    formatDetection: { telephone: false, address: false, email: false },
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      url: `${SITE.url}/${locale}`,
      siteName: d.meta.siteName,
      title: d.meta.defaultTitle,
      description: d.meta.description,
      images: [
        {
          url: '/og/og-default.jpg',
          width: 1200,
          height: 630,
          alt: d.meta.defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.meta.defaultTitle,
      description: d.meta.description,
      images: ['/og/og-default.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const { d, t } = getTranslation(locale);

  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      dir={getDirection(locale)}
      className={FONT_VARIABLES}
      suppressHydrationWarning
    >
      <body>
        <I18nProvider locale={locale}>
          <MotionProvider>
            <PageLoader />
            <DemoModalProvider>
              {/* Lien d'évitement pour la navigation clavier */}
              <a
                href="#contenu"
                className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-white"
              >
                {t('a11y.skipToContent')}
              </a>
              <Navbar />
              <main id="contenu">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              {/* Assistant flottant, présent sur toutes les pages */}
              <ChatWidget />
            </DemoModalProvider>
          </MotionProvider>
        </I18nProvider>

        {/* Identité de l'organisation et du site, communes à toutes les pages */}
        <JsonLd data={graph(organizationSchema(d, locale), websiteSchema(d, locale))} />
      </body>
    </html>
  );
}
