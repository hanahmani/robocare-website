import type { FooterColumn, NavItem } from '@/types';

/** Constantes globales non traduisibles (URL, coordonnées, réseaux). */
export const SITE = {
  name: 'RoboCare',
  url: 'https://robocare.tn',
  email: 'info@robocare.tn',
  phone: '+216 39 737 36 85',
  phoneHref: 'tel:+21639737368',
  appUrl: 'https://app.satellite.robocare.tn',
  appHost: 'app.satellite.robocare.tn',
  appLoginUrl: 'https://app.satellite.robocare.tn/',
  appRegisterUrl: 'https://app.satellite.robocare.tn/signup',
  social: {
    linkedin: 'https://www.linkedin.com/company/robocare',
    facebook: 'https://www.facebook.com/robocare',
    youtube: 'https://www.youtube.com/@robocare',
  },
} as const;

/** Navigation principale — une entrée par page. */
export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'solutions', href: '/solutions' },
  { key: 'platform', href: '/plateforme' },
  { key: 'technology', href: '/technologie' },
  { key: 'about', href: '/about' },
  { key: 'impact', href: '/impact' },
  { key: 'contact', href: '/contact' },
] as const;

/** Colonnes de liens du pied de page. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    titleKey: 'footer.explore',
    links: [
      { labelKey: 'nav.solutions', href: '/solutions' },
      { labelKey: 'nav.platform', href: '/plateforme' },
      { labelKey: 'nav.technology', href: '/technologie' },
      { labelKey: 'nav.impact', href: '/impact' },
    ],
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'nav.about', href: '/about' },
      { labelKey: 'footer.team', href: '/about#equipe' },
      { labelKey: 'footer.partners', href: '/about#partenaires' },
      { labelKey: 'footer.media', href: '/about#medias' },
    ],
  },
  {
    titleKey: 'footer.contact',
    links: [
      { label: SITE.email, href: `mailto:${SITE.email}`, ltr: true },
      { label: SITE.phone, href: SITE.phoneHref, ltr: true },
      { labelKey: 'actions.requestDemo', href: '/contact' },
      { labelKey: 'actions.accessPlatform', href: SITE.appUrl },
    ],
  },
] as const;
