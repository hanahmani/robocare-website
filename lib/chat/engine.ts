import type { Locale } from '@/i18n/config';
import { KNOWLEDGE, type KnowledgeEntry } from '@/lib/chat/knowledge';

/**
 * Moteur de l'assistant RoboCare.
 *
 * Deux couches volontairement séparées :
 *
 *  1. `matchKnowledge()` — recherche lexicale dans la base locale. Aucun appel
 *     réseau, fonctionne hors ligne, réponse instantanée.
 *  2. `ChatProvider` — interface d'échange. `localProvider` interroge la base ;
 *     `createRemoteProvider()` interroge une API d'IA (OpenAI, Claude, Gemini…)
 *     et retombe sur la base locale en cas d'erreur.
 *
 * Brancher une IA plus tard ne demande donc **aucune modification du composant
 * d'interface** : il suffit de fournir un autre provider à `<ChatWidget>`.
 */

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

// Diacritiques arabes (harakat), tatweel et signes coraniques.
const ARABIC_MARKS = /[\u0610-\u061A\u064B-\u065F\u0640\u06D6-\u06ED]/g;

/**
 * Ramène une chaîne à une forme comparable :
 * minuscules, sans accents latins ni diacritiques arabes, sans ponctuation.
 * `النَّخْلَة` et `النخلة` deviennent identiques, comme « générale » et « generale ».
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // accents latins
    .replace(ARABIC_MARKS, '')
    .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627') // آ أ إ ٱ → ا
    .replace(/\u0629/g, '\u0647') // ة → ه
    .replace(/\u0649/g, '\u064A') // ى → ي
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    // Article défini arabe : « الهاتف » doit rejoindre « هاتف ». On ne le retire
    // que si le mot reste assez long pour rester porteur de sens.
    .replace(/(^|\s)\u0627\u0644(\p{L}{3,})/gu, '$1$2');
}

/** Mots vides : trop fréquents pour discriminer une intention. */
const STOPWORDS: Record<Locale, ReadonlySet<string>> = {
  fr: new Set([
    'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'a', 'au', 'aux',
    'en', 'est', 'ce', 'que', 'qui', 'quoi', 'quel', 'quelle', 'quels', 'quelles',
    'pour', 'par', 'sur', 'dans', 'avec', 'vous', 'nous', 'je', 'tu', 'il', 'elle',
    'votre', 'vos', 'mon', 'ma', 'mes', 'son', 'sa', 'ses', 'ne', 'pas', 'plus',
    'comment', 'pourquoi', 'combien', 'sont', 'etre', 'avoir', 'faire', 'y', 'se',
    'cette', 'ces', 'me', 'moi', 'donc', 'si', 'bonjour', 'salut', 'svp', 'merci',
    'ca', 'cela', 'veux', 'voudrais', 'peut', 'peux', 'faut', 'dois', 'sur',
  ]),
  en: new Set([
    'the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'for', 'with', 'is',
    'are', 'be', 'do', 'does', 'did', 'i', 'you', 'we', 'it', 'my', 'your', 'our',
    'what', 'which', 'who', 'how', 'why', 'when', 'where', 'can', 'could', 'would',
    'should', 'me', 'us', 'that', 'this', 'these', 'those', 'not', 'there', 'have',
    'has', 'hello', 'hi', 'thanks', 'please', 'about',
  ]),
  ar: new Set([
    'في', 'من', 'على', 'الى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك', 'التي', 'الذي',
    'ما', 'ماذا', 'كيف', 'لماذا', 'متى', 'اين', 'هل', 'او', 'و', 'ثم', 'كان',
    'هو', 'هي', 'انا', 'انت', 'نحن', 'هم', 'لكم', 'لنا', 'كل', 'بعض', 'قد',
    'لا', 'نعم', 'مرحبا', 'شكرا', 'من فضلك', 'يوجد', 'عند',
  ]),
};

function tokenize(text: string, locale: Locale): string[] {
  const stop = STOPWORDS[locale];
  return normalize(text)
    .split(' ')
    .filter((token) => token.length > 1 && !stop.has(token));
}

/* ------------------------------------------------------------------ */
/* Correspondance lexicale                                             */
/* ------------------------------------------------------------------ */

export type Match = { entry: KnowledgeEntry; score: number };

/** Index pré-calculé : les tokens de chaque entrée, par langue. */
const INDEX = new Map<string, Map<Locale, Set<string>>>();

function entryTokens(entry: KnowledgeEntry, locale: Locale): Set<string> {
  let perLocale = INDEX.get(entry.id);
  if (!perLocale) {
    perLocale = new Map();
    INDEX.set(entry.id, perLocale);
  }
  let tokens = perLocale.get(locale);
  if (!tokens) {
    // La question est indexée d'office : les mots-clés ne servent qu'aux
    // formulations qu'elle ne contient pas.
    tokens = new Set([
      ...tokenize(entry.question[locale], locale),
      ...entry.keywords[locale].flatMap((keyword) => tokenize(keyword, locale)),
    ]);
    perLocale.set(locale, tokens);
  }
  return tokens;
}

/** Un token compte pleinement s'il est identique, partiellement s'il est un préfixe. */
function tokenScore(token: string, pool: Set<string>): number {
  if (pool.has(token)) return 1;
  if (token.length < 4) return 0;
  for (const candidate of pool) {
    if (candidate.length >= 4 && (candidate.startsWith(token) || token.startsWith(candidate))) {
      return 0.65;
    }
  }
  return 0;
}

/** En dessous de ce score, on préfère avouer qu'on ne sait pas. */
const CONFIDENCE_THRESHOLD = 0.34;

/**
 * Classe les entrées de la base par pertinence pour une question donnée.
 * Le score est normalisé par le nombre de tokens utiles de la question,
 * pour qu'une question longue ne soit pas mécaniquement avantagée.
 */
export function rankKnowledge(input: string, locale: Locale): Match[] {
  const tokens = tokenize(input, locale);
  if (tokens.length === 0) return [];

  const normalized = normalize(input);

  return KNOWLEDGE.map((entry) => {
    const pool = entryTokens(entry, locale);
    const raw = tokens.reduce((sum, token) => sum + tokenScore(token, pool), 0);
    let score = raw / tokens.length;

    // Bonus : la question posée est contenue dans la question de référence
    // (cas du clic sur une réponse rapide, ou d'une reformulation proche).
    const reference = normalize(entry.question[locale]);
    if (normalized.length > 6 && reference.includes(normalized)) score = Math.max(score, 0.95);

    return { entry, score };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
}

export type KnowledgeResult = {
  /** Entrée retenue, ou `null` si aucune n'atteint le seuil de confiance. */
  entry: KnowledgeEntry | null;
  /** Pistes proposées au visiteur quand la confiance est insuffisante. */
  suggestions: KnowledgeEntry[];
};

export function matchKnowledge(input: string, locale: Locale): KnowledgeResult {
  const ranked = rankKnowledge(input, locale);
  const best = ranked[0];

  if (best && best.score >= CONFIDENCE_THRESHOLD) {
    return { entry: best.entry, suggestions: [] };
  }
  return {
    entry: null,
    suggestions: ranked.slice(0, 3).map((match) => match.entry),
  };
}

/* ------------------------------------------------------------------ */
/* Providers                                                           */
/* ------------------------------------------------------------------ */

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

export type ChatAnswer = {
  text: string;
  /** Entrée de la base à l'origine de la réponse, le cas échéant. */
  entry: KnowledgeEntry | null;
  suggestions: KnowledgeEntry[];
};

export type ChatProvider = {
  id: string;
  ask: (input: string, locale: Locale, history: readonly ChatTurn[]) => Promise<ChatAnswer>;
};

/** Base locale : instantané, hors ligne, aucune dépendance. */
export const localProvider: ChatProvider = {
  id: 'local',
  async ask(input, locale) {
    const { entry, suggestions } = matchKnowledge(input, locale);
    return {
      text: entry ? entry.answer[locale] : '',
      entry,
      suggestions,
    };
  },
};

export type RemoteProviderConfig = {
  /** Route interne à créer le moment venu, ex. `/api/chat`. */
  endpoint: string;
  /** Nombre de tours d'historique transmis pour le contexte. */
  historyDepth?: number;
  /** Délai au-delà duquel on bascule sur la base locale. */
  timeoutMs?: number;
};

/**
 * Provider distant, prêt à brancher sur une API d'IA.
 *
 * Le contrat attendu côté serveur est volontairement minimal :
 *   POST { message, locale, history } → { text: string }
 *
 * Toute erreur — réseau, délai dépassé, réponse vide — retombe silencieusement
 * sur la base locale : le visiteur obtient toujours une réponse.
 */
export function createRemoteProvider({
  endpoint,
  historyDepth = 6,
  timeoutMs = 12000,
}: RemoteProviderConfig): ChatProvider {
  return {
    id: `remote:${endpoint}`,
    async ask(input, locale, history) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: input,
            locale,
            history: history.slice(-historyDepth),
          }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: unknown = await response.json();
        const text =
          typeof data === 'object' && data !== null && 'text' in data
            ? String((data as { text: unknown }).text ?? '')
            : '';
        if (!text.trim()) throw new Error('Réponse vide');

        return { text, entry: null, suggestions: [] };
      } catch {
        return localProvider.ask(input, locale, history);
      } finally {
        clearTimeout(timer);
      }
    },
  };
}

/**
 * Provider utilisé par l'interface.
 * Définir `NEXT_PUBLIC_CHAT_ENDPOINT` suffit à passer sur une IA distante.
 */
export function resolveProvider(): ChatProvider {
  const endpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;
  return endpoint ? createRemoteProvider({ endpoint }) : localProvider;
}
