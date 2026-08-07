import { LOCALE_META, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { SITE } from '@/lib/data/site';

/**
 * Générateurs de données structurées Schema.org (JSON-LD).
 *
 * Chaque page injecte un graphe : identité de l'organisation, page courante,
 * fil d'Ariane, et le cas échéant FAQ ou fiche produit. Les libellés viennent
 * du dictionnaire actif — jamais de texte en dur ici.
 *
 * Toutes les entités portent un `@id` stable et se référencent entre elles
 * (Organization ← WebSite ← WebPage ← BreadcrumbList/FAQPage/Service) : un
 * même nœud n'est jamais dupliqué, un moteur qui résout le graphe retombe
 * toujours sur la même identité.
 */

type Json = Record<string, unknown>;

// Entités globales : un seul `@id` stable, indépendant de la langue de
// rendu — trois graphes par organisation créeraient trois entités distinctes
// aux yeux du knowledge graph au lieu d'une seule, correctement `inLanguage`.
const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
// La plateforme est un seul produit, servi sur un sous-domaine indépendant
// de la langue de la page qui en parle (accueil ou /plateforme) : son `@id`
// suit donc la même logique que l'organisation, pas celle des pages.
const APP_ID = `${SITE.url}/#platform`;

/** URL d'un asset statique (logo, image sociale) — jamais préfixée par la langue. */
const asset = (path: string) => `${SITE.url}${path}`;

/** URL d'une page — chaque langue a sa propre URL, donc sa propre ressource. */
const page = (locale: Locale, path: string) => `${SITE.url}/${locale}${path === '/' ? '' : path}`;

const webPageId = (locale: Locale, path: string) => `${page(locale, path)}#webpage`;
const breadcrumbId = (locale: Locale, path: string) => `${page(locale, path)}#breadcrumb`;
const faqId = (locale: Locale, path: string) => `${page(locale, path)}#faq`;

/**
 * Zone desservie — mêmes valeurs pour l'organisation et chaque service :
 * une même entité ne doit pas se contredire d'un nœud à l'autre du graphe.
 * Traduite (les noms de pays suivent `d`), la liste reste stable.
 *
 * RoboCare opère en Tunisie (marché principal) et, depuis peu, en Algérie —
 * pas dans l'ensemble de la région MENA. `Place: 'MENA'` survendait la
 * couverture réelle ; corrigé pour refléter les deux marchés effectifs.
 */
const areaServed = (d: Dictionary): Json[] => [
  { '@type': 'Country', name: d.common.country },
  { '@type': 'Country', name: d.common.countryExpansion },
];

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
      url: asset('/brand/logo-robocare.png'),
      width: 600,
      height: 240,
    },
    image: asset('/og/og-default.jpg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: d.common.city,
      addressCountry: 'TN',
    },
    areaServed: areaServed(d),
    // Champs d'expertise réels du site (mêmes mots-clés que les métadonnées
    // de page, jamais de texte inventé ici) : aide un moteur ou une IA à
    // classer l'entité au-delà du seul nom.
    knowsAbout: d.meta.keywords,
    knowsLanguage: Object.values(LOCALE_META).map((meta) => meta.htmlLang),
    inLanguage: LOCALE_META[locale].htmlLang,
    sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.youtube],
    // Point de contact structuré : plus explicite que les champs plats
    // ci-dessus pour les moteurs qui alimentent un panneau de connaissance.
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: 'TN',
        availableLanguage: ['French', 'English', 'Arabic'],
      },
    ],
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

/**
 * Page courante.
 *
 * `hasBreadcrumb` / `hasFaq` ajoutent une référence (`@id`) vers le
 * `BreadcrumbList` ou le `FAQPage` de la même page quand ils existent —
 * l'accueil n'a pas de fil d'Ariane, seules l'accueil et le contact ont
 * une FAQ visible.
 */
export function webPageSchema({
  title,
  description,
  path,
  locale,
  hasBreadcrumb = true,
  hasFaq = false,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  hasBreadcrumb?: boolean;
  hasFaq?: boolean;
}): Json {
  return {
    '@type': 'WebPage',
    '@id': webPageId(locale, path),
    url: page(locale, path),
    name: title,
    description,
    inLanguage: LOCALE_META[locale].htmlLang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: asset('/og/og-default.jpg') },
    ...(hasBreadcrumb ? { breadcrumb: { '@id': breadcrumbId(locale, path) } } : {}),
    ...(hasFaq ? { mainEntity: { '@id': faqId(locale, path) } } : {}),
  };
}

/**
 * Fil d'Ariane — doit refléter celui affiché à l'écran.
 * Son `@id` se déduit du dernier maillon (la page courante), pour que
 * `webPageSchema()` puisse le référencer sans paramètre supplémentaire.
 */
export function breadcrumbSchema(
  locale: Locale,
  trail: readonly { name: string; path: string }[],
): Json {
  const current = trail[trail.length - 1];
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(locale, current.path),
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: page(locale, crumb.path),
    })),
  };
}

/**
 * FAQ : éligible aux résultats enrichis quand les questions sont visibles.
 * `locale`/`path` identifient la page qui la porte, pour que
 * `webPageSchema({ hasFaq: true })` pointe vers le même `@id`.
 */
export function faqSchema(
  locale: Locale,
  path: string,
  items: readonly { question: string; answer: string }[],
): Json {
  return {
    '@type': 'FAQPage',
    '@id': faqId(locale, path),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** La plateforme, décrite comme application web — un seul produit, un seul `@id`. */
export function softwareApplicationSchema(d: Dictionary): Json {
  return {
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
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
export function serviceSchema(
  d: Dictionary,
  locale: Locale,
  item: { name: string; description: string; slug: string },
): Json {
  return {
    '@type': 'Service',
    '@id': `${page(locale, '/solutions')}#${item.slug}`,
    name: item.name,
    description: item.description,
    serviceType: 'Precision agriculture monitoring',
    areaServed: areaServed(d),
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
