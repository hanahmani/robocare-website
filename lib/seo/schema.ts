import { LOCALE_META, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { SITE } from '@/lib/data/site';

/**
 * Générateurs de données structurées Schema.org (JSON-LD).
 *
 * Chaque page injecte un graphe : identité de l'organisation, page courante,
 * fil d'Ariane, et le cas échéant FAQ ou fiche produit. Les libellés viennent
 * du dictionnaire actif — jamais de texte en dur ici.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

const absolute = (path: string) => `${SITE.url}${path === '/' ? '' : path}`;

/** Fiche entreprise, référencée par toutes les autres entités. */
export function organizationSchema(d: Dictionary, locale: Locale): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: d.meta.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: '2021',
    logo: {
      '@type': 'ImageObject',
      url: absolute('/brand/logo-robocare.png'),
      width: 600,
      height: 240,
    },
    image: absolute('/og/og-default.jpg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: d.common.city,
      addressCountry: 'TN',
    },
    areaServed: [
      { '@type': 'Country', name: d.common.country },
      { '@type': 'Place', name: 'MENA' },
    ],
    knowsLanguage: Object.values(LOCALE_META).map((meta) => meta.htmlLang),
    inLanguage: LOCALE_META[locale].htmlLang,
    sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.youtube],
  };
}

/** Le site lui-même. */
export function websiteSchema(d: Dictionary, locale: Locale): Json {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: d.meta.siteName,
    description: d.meta.description,
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { '@id': ORG_ID },
  };
}

/** Page courante. */
export function webPageSchema({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
}): Json {
  return {
    '@type': 'WebPage',
    '@id': `${absolute(path)}#webpage`,
    url: absolute(path),
    name: title,
    description,
    inLanguage: LOCALE_META[locale].htmlLang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absolute('/og/og-default.jpg') },
  };
}

/** Fil d'Ariane — doit refléter celui affiché à l'écran. */
export function breadcrumbSchema(trail: readonly { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/** FAQ : éligible aux résultats enrichis quand les questions sont visibles. */
export function faqSchema(items: readonly { question: string; answer: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** La plateforme, décrite comme application web. */
export function softwareApplicationSchema(d: Dictionary): Json {
  return {
    '@type': 'SoftwareApplication',
    name: `${SITE.name} Platform`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Agriculture',
    operatingSystem: 'Web',
    url: SITE.appUrl,
    description: d.platform.meta.description,
    featureList: Object.values(d.platform.modules).map((module) => module.title),
    provider: { '@id': ORG_ID },
  };
}

/** Une solution par culture, décrite comme service. */
export function serviceSchema(item: {
  name: string;
  description: string;
  slug: string;
}): Json {
  return {
    '@type': 'Service',
    '@id': `${SITE.url}/solutions#${item.slug}`,
    name: item.name,
    description: item.description,
    serviceType: 'Precision agriculture monitoring',
    provider: { '@id': ORG_ID },
  };
}

/**
 * Assemble les entités dans un graphe unique.
 * Un seul bloc `<script>` par page, plus lisible pour les moteurs.
 */
export function graph(...entities: Json[]): Json {
  return { '@context': 'https://schema.org', '@graph': entities };
}
