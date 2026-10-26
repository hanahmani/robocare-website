import type { Locale } from '@/i18n/config';
import { normalize, tokenize } from '@/lib/chat/engine';

/**
 * Formules de politesse de l'assistant (« bonjour », « ça va ? », « merci »…).
 *
 * Elles ne passent pas par la base de connaissances : ces mots sont des mots
 * vides pour la recherche lexicale, qui répondrait sinon par le message de repli.
 *
 * Une formule n'est reconnue que si le message ne contient rien d'autre : dans
 * « bonjour, combien coûte Olive Care ? », la vraie question l'emporte.
 * Les formules sont reconnues quelle que soit la langue de l'interface (y compris
 * le dialecte tunisien en lettres latines) ; la réponse suit la langue active.
 */

type SmallTalkIntent = {
  id: string;
  /** Formulations reconnues, toutes langues confondues. Normalisées au chargement. */
  phrases: readonly string[];
  answer: Record<Locale, string>;
};

/** Ordre = priorité quand plusieurs formules se combinent (« merci, au revoir »). */
const INTENTS: readonly SmallTalkIntent[] = [
  {
    id: 'goodbye',
    phrases: [
      'au revoir', 'bonne journée', 'bonne soirée', 'bonne nuit', 'à bientôt', 'à plus',
      'bye', 'bye bye', 'ciao', 'goodbye', 'see you', 'see you soon', 'have a nice day',
      'مع السلامة', 'وداعا', 'إلى اللقاء', 'بالسلامة', 'bslema', 'beslama',
    ],
    answer: {
      fr: 'Merci de votre visite et à bientôt ! L’équipe RoboCare reste joignable depuis la page Contact.',
      en: 'Thanks for stopping by — see you soon! The RoboCare team is always reachable from the Contact page.',
      ar: 'شكرًا على زيارتكم وإلى اللقاء! فريق RoboCare في الخدمة دائمًا عبر صفحة الاتصال.',
    },
  },
  {
    id: 'how-are-you',
    phrases: [
      'ça va', 'comment ça va', 'ça va bien', 'comment allez vous', 'vous allez bien',
      'tu vas bien', 'comment vas tu', 'cv',
      'how are you', 'how are you doing', 'how is it going', 'how s it going',
      'what s up', 'whats up',
      'كيف حالك', 'كيف الحال', 'لاباس', 'لا باس', 'شنحوالك', 'شنوة أحوالك',
      'labes', 'labess', 'chnahwalek', 'cava',
    ],
    answer: {
      fr: 'Très bien, merci ! 😊 Je suis là pour répondre à vos questions sur RoboCare : nos solutions par culture, la plateforme ou nos technologies. Que puis-je faire pour vous ?',
      en: 'Doing great, thanks! 😊 I’m here to answer your questions about RoboCare: our crop solutions, the platform or our technologies. How can I help?',
      ar: 'بخير، شكرًا! 😊 أنا هنا للإجابة عن أسئلتكم حول RoboCare: حلولنا حسب المحصول، المنصّة أو التكنولوجيات التي نستعملها. كيف يمكنني مساعدتكم؟',
    },
  },
  {
    id: 'thanks',
    phrases: [
      'merci', 'merci beaucoup', 'mille merci', 'merci bien', 'super', 'parfait', 'génial',
      'thanks', 'thank you', 'thank you very much', 'thx', 'great', 'perfect', 'awesome',
      'شكرا', 'شكرا جزيلا', 'بارك الله فيك', 'يعطيك الصحة', 'barcha merci', 'yaychek', 'aychek',
    ],
    answer: {
      fr: 'Avec plaisir ! N’hésitez pas si vous avez d’autres questions.',
      en: 'You’re welcome! Feel free to ask if you have any other questions.',
      ar: 'بكل سرور! لا تتردّدوا إن كانت لديكم أسئلة أخرى.',
    },
  },
  {
    id: 'greeting',
    phrases: [
      'bonjour', 'bonsoir', 'salut', 'coucou', 'bjr', 'slt',
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'مرحبا', 'أهلا', 'أهلا وسهلا', 'السلام عليكم', 'سلام', 'صباح الخير', 'مساء الخير', 'عسلامة',
      'aslema', 'asslema', 'salam', 'salem', 'ahla', 'salam alaykoum', 'salam alaykum',
    ],
    answer: {
      fr: 'Bonjour ! 😊 Je peux vous renseigner sur nos solutions par culture, la plateforme RoboCare ou nos technologies. Que souhaitez-vous savoir ?',
      en: 'Hello! 😊 I can tell you about our crop solutions, the RoboCare platform or our technologies. What would you like to know?',
      ar: 'مرحبًا! 😊 يمكنني إفادتكم حول حلولنا حسب المحصول، منصّة RoboCare أو التكنولوجيات التي نستعملها. ماذا تودّون أن تعرفوا؟',
    },
  },
  {
    id: 'ack',
    phrases: [
      'ok', 'okay', 'd accord', 'dac', 'oui', 'non', 'très bien', 'bien',
      'yes', 'no', 'sure', 'alright', 'fine', 'cool',
      'حسنا', 'نعم', 'لا', 'باهي', 'behi', 'mrigel',
    ],
    answer: {
      fr: 'Très bien. Avez-vous une autre question sur RoboCare ?',
      en: 'Got it. Do you have another question about RoboCare?',
      ar: 'حسنًا. هل لديكم سؤال آخر حول RoboCare؟',
    },
  },
];

type Phrase = { intent: SmallTalkIntent; phrase: string };

/**
 * Formules normalisées, les plus longues d'abord pour être retirées en priorité.
 * Calculées au premier appel : `engine` importe ce module, `normalize` n'est
 * donc pas encore utilisable quand il est évalué.
 */
let phrases: Phrase[] | null = null;

function getPhrases(): Phrase[] {
  phrases ??= INTENTS.flatMap((intent) =>
    intent.phrases.map((phrase) => ({ intent, phrase: normalize(phrase) })),
  ).sort((a, b) => b.phrase.length - a.phrase.length);
  return phrases;
}

/** Réponse de politesse si le message n'est qu'une formule de politesse, sinon `null`. */
export function matchSmallTalk(input: string, locale: Locale): string | null {
  let rest = ` ${normalize(input)} `;
  const found = new Set<SmallTalkIntent>();

  for (const { intent, phrase } of getPhrases()) {
    const needle = ` ${phrase} `;
    while (rest.includes(needle)) {
      rest = rest.replace(needle, ' ');
      found.add(intent);
    }
  }

  // Il ne doit rester que des mots vides (« bonjour à vous »), pas une question.
  if (found.size === 0 || tokenize(rest, locale).length > 0) return null;
  const intent = INTENTS.find((candidate) => found.has(candidate));
  return intent ? intent.answer[locale] : null;
}
