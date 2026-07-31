import type { Locale } from '@/i18n/config';

/**
 * Base de connaissances locale de l'assistant RoboCare.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * COMMENT AJOUTER UNE RÉPONSE
 * 1. Copier une entrée ci-dessous et lui donner un `id` unique.
 * 2. Renseigner `question` et `answer` dans les trois langues.
 * 3. Ajouter dans `keywords` les formulations alternatives que peut employer un
 *    visiteur (synonymes, fautes courantes, sigles). La question est indexée
 *    automatiquement : inutile d'y répéter ses propres mots.
 * 4. Optionnellement, pointer `link` vers une page du site. `labelKey` doit
 *    exister dans `/messages/*.json` (réutiliser les clés `actions.*`).
 * 5. Pour l'afficher parmi les réponses rapides, ajouter son `id` à
 *    `QUICK_REPLY_IDS`.
 *
 * Aucun texte de l'interface du chat ne vit ici : il est dans `chat.*` des
 * dictionnaires. Ce fichier ne contient que du contenu métier.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type KnowledgeEntry = {
  id: string;
  /** Formulations alternatives, par langue. */
  keywords: Record<Locale, readonly string[]>;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
  /** Renvoi contextuel affiché sous la réponse. */
  link?: { href: string; labelKey: string };
};

export const KNOWLEDGE: readonly KnowledgeEntry[] = [
  {
    id: 'what-is-robocare',
    keywords: {
      fr: ['robocare', 'qui etes vous', 'presentation', 'entreprise', 'societe', 'startup'],
      en: ['robocare', 'who are you', 'about', 'company', 'startup'],
      ar: ['روبوكير', 'من أنتم', 'الشركة', 'تعريف', 'شركة ناشئة'],
    },
    question: {
      fr: 'Qu’est-ce que RoboCare ?',
      en: 'What is RoboCare?',
      ar: 'ما هي RoboCare؟',
    },
    answer: {
      fr: 'RoboCare est une entreprise AgriTech fondée à Sfax en 2021. Nous combinons imagerie satellite, capteurs IoT et intelligence artificielle pour transformer chaque parcelle en décisions agronomiques précises : quelle zone irriguer, quelle dose d’azote apporter, quand traiter. Plus de 100 000 hectares sont suivis en Tunisie et dans la région MENA.',
      en: 'RoboCare is an AgriTech company founded in Sfax in 2021. We combine satellite imagery, IoT sensors and artificial intelligence to turn every field into precise agronomic decisions: which zone to irrigate, how much nitrogen to apply, when to treat. More than 100,000 hectares are monitored across Tunisia and the MENA region.',
      ar: 'RoboCare شركة تكنولوجيا فلاحية تأسّست في صفاقس سنة 2021. نجمع بين صور الأقمار الاصطناعية وحسّاسات إنترنت الأشياء والذكاء الاصطناعي لتحويل كل قطعة إلى قرارات فلاحية دقيقة: أيّ منطقة تُسقى، وكم جرعة الآزوت، ومتى تُعالَج. وتُتابَع أكثر من 100 ألف هكتار في تونس ومنطقة الشرق الأوسط وشمال إفريقيا.',
    },
    link: { href: '/about', labelKey: 'actions.ourStory' },
  },
  {
    id: 'services',
    keywords: {
      fr: ['services', 'offre', 'prestations', 'solutions', 'que proposez vous', 'produits'],
      en: ['services', 'offering', 'what do you offer', 'solutions', 'products'],
      ar: ['خدمات', 'عروض', 'ماذا تقدمون', 'حلول', 'منتجات'],
    },
    question: {
      fr: 'Quels services propose RoboCare ?',
      en: 'What services does RoboCare offer?',
      ar: 'ما الخدمات التي تقدّمها RoboCare؟',
    },
    answer: {
      fr: 'Quatre solutions calibrées par culture : Olive Care pour les oliveraies, Cereal Care pour le blé dur et l’orge, Citrus Care pour les agrumes et Greenhouse Care pour les cultures sous serre. Chacune s’appuie sur la même plateforme — suivi satellite, alertes, rapports — mais avec des seuils et des indices adaptés à la culture.',
      en: 'Four solutions calibrated by crop: Olive Care for olive groves, Cereal Care for durum wheat and barley, Citrus Care for citrus orchards and Greenhouse Care for protected crops. Each relies on the same platform — satellite monitoring, alerts, reports — but with thresholds and indices tuned to the crop.',
      ar: 'أربعة حلول معايَرة حسب المحصول: Olive Care لغابات الزياتين، وCereal Care للقمح الصلب والشعير، وCitrus Care للقوارص، وGreenhouse Care للزراعات المحميّة. وكلّها تقوم على المنصّة نفسها — متابعة فضائية وتنبيهات وتقارير — لكن بعتبات ومؤشّرات ملائمة لكل محصول.',
    },
    link: { href: '/solutions', labelKey: 'actions.allSolutions' },
  },
  {
    id: 'platform',
    keywords: {
      fr: ['plateforme', 'application', 'logiciel', 'dashboard', 'tableau de bord', 'fonctionnement', 'utiliser'],
      en: ['platform', 'application', 'software', 'dashboard', 'how does it work'],
      ar: ['منصة', 'تطبيق', 'برنامج', 'لوحة القيادة', 'كيف تعمل'],
    },
    question: {
      fr: 'Comment fonctionne votre plateforme ?',
      en: 'How does your platform work?',
      ar: 'كيف تعمل منصّتكم؟',
    },
    answer: {
      fr: 'En quatre étapes : vous créez un compte, vous dessinez le contour de vos parcelles sur la carte (ou vous importez un KML/Shapefile), chaque passage satellite met à jour l’état de végétation, et vous recevez alertes et recommandations par e-mail, SMS ou WhatsApp. Aucun matériel n’est nécessaire pour démarrer et la première analyse arrive en 24 h.',
      en: 'In four steps: you create an account, draw your field outlines on the map (or import a KML/Shapefile), each satellite pass updates the vegetation status, and you receive alerts and recommendations by email, SMS or WhatsApp. No hardware is needed to start and the first analysis arrives within 24 hours.',
      ar: 'في أربع خطوات: تُنشئ حسابًا، وترسم حدود قطعك على الخريطة (أو تستورد ملفّ KML/Shapefile)، ويحدّث كل مرور فضائي حالة الغطاء النباتي، ثمّ تصلك التنبيهات والتوصيات عبر البريد أو الرسائل القصيرة أو واتساب. ولا حاجة إلى أيّ عتاد للانطلاق، ويصل أوّل تحليل خلال 24 ساعة.',
    },
    link: { href: '/plateforme', labelKey: 'actions.discoverPlatform' },
  },
  {
    id: 'iot',
    keywords: {
      fr: ['iot', 'internet des objets', 'capteur', 'capteurs', 'sonde', 'station', 'lorawan', 'humidite du sol'],
      en: ['iot', 'internet of things', 'sensor', 'sensors', 'probe', 'station', 'lorawan', 'soil moisture'],
      ar: ['إنترنت الأشياء', 'حساس', 'حسّاسات', 'مجس', 'محطة', 'لورا', 'رطوبة التربة'],
    },
    question: {
      fr: 'Qu’est-ce que l’IoT en agriculture ?',
      en: 'What is IoT in agriculture?',
      ar: 'ما هو إنترنت الأشياء في الفلاحة؟',
    },
    answer: {
      fr: 'L’IoT désigne des objets connectés qui mesurent et transmettent des données depuis le terrain. Chez RoboCare, ce sont des stations autonomes : sondes d’humidité à plusieurs profondeurs, température du sol, conductivité électrique. Elles relèvent toutes les 15 minutes, transmettent en LoRaWAN ou 4G, et fonctionnent des années sur batterie et panneau solaire. Elles complètent le satellite, qui ne voit pas sous la surface.',
      en: 'IoT means connected devices that measure and transmit data from the field. At RoboCare these are autonomous stations: moisture probes at several depths, soil temperature, electrical conductivity. They sample every 15 minutes, transmit over LoRaWAN or 4G, and run for years on battery and solar panel. They complement the satellite, which cannot see below the surface.',
      ar: 'إنترنت الأشياء يعني أجهزة متّصلة تقيس المعطيات وتبثّها من الميدان. وفي RoboCare هي محطّات ذاتية: مجسّات رطوبة على أعماق متعدّدة، وحرارة التربة، والناقلية الكهربائية. تقيس كل 15 دقيقة وتبثّ عبر LoRaWAN أو 4G وتعمل سنوات ببطارية ولوح شمسي. وهي تكمّل القمر الاصطناعي الذي لا يرى ما تحت السطح.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'drone',
    keywords: {
      fr: ['drone', 'drones', 'vol', 'multispectral', 'thermique', 'comptage arbres'],
      en: ['drone', 'drones', 'flight', 'multispectral', 'thermal', 'tree counting'],
      ar: ['طائرة مسيرة', 'درون', 'تحليق', 'متعدد الأطياف', 'حراري', 'عد الأشجار'],
    },
    question: {
      fr: 'Comment fonctionne un drone agricole ?',
      en: 'How does an agricultural drone work?',
      ar: 'كيف تعمل الطائرة المسيّرة الفلاحية؟',
    },
    answer: {
      fr: 'Le drone vole à quelques dizaines de mètres avec une caméra multispectrale et une caméra thermique. À cette altitude, chaque pixel couvre 2 à 5 cm au sol, contre 10 m pour le satellite. On peut donc compter les arbres un par un, repérer un goutteur bouché à sa signature thermique et délimiter un foyer de maladie au mètre près. Le vol est programmé à l’avance et le rapport est généré automatiquement.',
      en: 'The drone flies a few dozen metres up with a multispectral and a thermal camera. At that altitude each pixel covers 2 to 5 cm of ground, against 10 m for the satellite. You can therefore count trees one by one, spot a blocked emitter by its thermal signature and map a disease outbreak to the metre. Flights are planned in advance and the report is generated automatically.',
      ar: 'تحلّق الطائرة المسيّرة على ارتفاع بضع عشرات من الأمتار بكاميرا متعدّدة الأطياف وأخرى حرارية. وعلى هذا الارتفاع يغطّي كل بكسل من 2 إلى 5 سنتيمترات من الأرض، مقابل 10 أمتار للقمر الاصطناعي. لذلك يمكن عدّ الأشجار واحدة واحدة، واكتشاف نقّاط مسدود من بصمته الحرارية، وتحديد بؤرة مرضية بدقّة المتر. تُبرمَج الرحلة مسبقًا ويُولَّد التقرير آليًا.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'satellite',
    keywords: {
      fr: ['satellite', 'imagerie', 'sentinel', 'landsat', 'copernicus', 'telédetection', 'teledetection', 'image'],
      en: ['satellite', 'imagery', 'sentinel', 'landsat', 'copernicus', 'remote sensing', 'image'],
      ar: ['قمر اصطناعي', 'صور', 'سنتينل', 'لاندسات', 'استشعار عن بعد'],
    },
    question: {
      fr: 'À quoi sert l’imagerie satellite ?',
      en: 'What is satellite imagery used for?',
      ar: 'فيمَ تُستعمل صور الأقمار الاصطناعية؟',
    },
    answer: {
      fr: 'Les satellites Sentinel-2 survolent la Tunisie tous les 5 jours et mesurent la lumière renvoyée par le couvert dans 13 bandes spectrales. Une plante en bonne santé absorbe le rouge et renvoie le proche infrarouge ; une plante contrainte fait l’inverse, progressivement. Ce déséquilibre est mesurable environ deux semaines avant le premier symptôme visible — c’est ce qui vous donne le temps d’intervenir.',
      en: 'Sentinel-2 satellites pass over Tunisia every 5 days and measure the light reflected by the canopy across 13 spectral bands. A healthy plant absorbs red and reflects near infrared; a stressed plant does the opposite, progressively. That imbalance is measurable roughly two weeks before the first visible symptom — which is what gives you time to act.',
      ar: 'تمرّ أقمار Sentinel-2 فوق تونس كل 5 أيام وتقيس الضوء المنعكس عن الغطاء النباتي في 13 نطاقًا طيفيًا. النبتة السليمة تمتصّ الأحمر وتعكس تحت الحمراء القريبة، والنبتة المجهَدة تفعل العكس تدريجيًا. ويصبح هذا الاختلال قابلًا للقياس نحو أسبوعين قبل أوّل عَرَض مرئي — وهذا ما يمنحك وقتًا للتدخّل.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'ndvi',
    keywords: {
      fr: ['ndvi', 'ndre', 'ndwi', 'savi', 'indice', 'indices', 'vegetation', 'carte de vigueur'],
      en: ['ndvi', 'ndre', 'ndwi', 'savi', 'index', 'indices', 'vegetation', 'vigour map'],
      ar: ['ndvi', 'مؤشر', 'مؤشرات', 'الغطاء النباتي', 'خريطة الحيوية'],
    },
    question: {
      fr: 'Qu’est-ce que le NDVI ?',
      en: 'What is NDVI?',
      ar: 'ما هو مؤشّر NDVI؟',
    },
    answer: {
      fr: 'Le NDVI (Normalized Difference Vegetation Index) est le rapport entre le proche infrarouge et le rouge renvoyés par le couvert. Il mesure la densité et la vigueur de la végétation, sur une échelle de −1 à 1 : au-dessus de 0,6, le couvert est dense et actif. Il sature sur les couverts très denses — on utilise alors le NDRE pour l’azote, le NDWI pour l’eau et le SAVI quand le sol nu occupe une large part du pixel.',
      en: 'NDVI (Normalized Difference Vegetation Index) is the ratio between the near infrared and the red reflected by the canopy. It measures vegetation density and vigour on a −1 to 1 scale: above 0.6 the canopy is dense and active. It saturates on very dense canopies — we then use NDRE for nitrogen, NDWI for water and SAVI when bare soil fills much of the pixel.',
      ar: 'مؤشّر NDVI هو النسبة بين الأشعّة تحت الحمراء القريبة والأحمر المنعكسين عن الغطاء النباتي. وهو يقيس كثافة الغطاء وحيويته على سلّم من −1 إلى 1: وفوق 0.6 يكون الغطاء كثيفًا ونشطًا. ويتشبّع على الأغطية الكثيفة جدًا — فنستعمل عندها NDRE للآزوت وNDWI للماء وSAVI حين تشغل التربة العارية جزءًا كبيرًا من البكسل.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'water',
    keywords: {
      fr: ['eau', 'irrigation', 'arrosage', 'economiser', 'economie', 'reduire', 'consommation', 'secheresse', 'stress hydrique', 'goutte a goutte'],
      en: ['water', 'irrigation', 'watering', 'water saving', 'consumption', 'drought', 'water stress', 'drip'],
      ar: ['ماء', 'ري', 'سقي', 'توفير الماء', 'استهلاك', 'جفاف', 'إجهاد مائي', 'تقطير'],
    },
    question: {
      fr: 'Comment réduire la consommation d’eau ?',
      en: 'How can I reduce water consumption?',
      ar: 'كيف أخفّض استهلاك الماء؟',
    },
    answer: {
      fr: 'En arrosant selon le besoin réel de chaque secteur plutôt qu’en volume uniforme. La plateforme calcule un bilan hydrique par secteur — évapotranspiration, coefficient cultural du stade, pluie effective, humidité mesurée par les sondes — et le révise à chaque passage satellite. Les exploitations suivies économisent en moyenne 28 % d’eau d’irrigation sur cultures pérennes, sans perte de rendement.',
      en: 'By watering according to each sector’s real need rather than a uniform volume. The platform computes a water balance per sector — evapotranspiration, crop coefficient for the stage, effective rainfall, probe moisture — and revises it at every satellite pass. Monitored farms save an average of 28 % of irrigation water on perennial crops, with no yield loss.',
      ar: 'بالسقي حسب الحاجة الفعلية لكل قطاع بدل حجم موحّد. تحسب المنصّة ميزانًا مائيًا لكل قطاع — التبخّر-النتح، ومعامل المحصول في الطور، والمطر الفعّال، ورطوبة المجسّات — وتراجعه عند كل مرور فضائي. وتوفّر الضيعات المتابَعة 28 % من مياه الريّ في المتوسّط على الزراعات المعمّرة دون خسارة في المردود.',
    },
    link: { href: '/impact', labelKey: 'actions.seeResults' },
  },
  {
    id: 'ai',
    keywords: {
      fr: ['ia', 'intelligence artificielle', 'machine learning', 'modele', 'algorithme', 'prediction', 'apprentissage'],
      en: ['ai', 'artificial intelligence', 'machine learning', 'model', 'algorithm', 'prediction'],
      ar: ['ذكاء اصطناعي', 'تعلم الآلة', 'نموذج', 'خوارزمية', 'تنبؤ'],
    },
    question: {
      fr: 'Quels sont les avantages de l’IA ?',
      en: 'What are the benefits of AI?',
      ar: 'ما فوائد الذكاء الاصطناعي؟',
    },
    answer: {
      fr: 'Un indice brut est bruité : angle du soleil, humidité de surface, stade de la culture et type de sol le font varier sans qu’il y ait de problème agronomique. L’IA sépare ce bruit du signal utile. Concrètement : segmentation d’image pour délimiter les zones de stress, détection de rupture sur la série temporelle de la parcelle, classification des maladies à partir de photos de terrain, et prévision de rendement par zone. Nos modèles sont ré-entraînés chaque saison sur des données méditerranéennes.',
      en: 'A raw index is noisy: sun angle, surface moisture, crop stage and soil type all shift it without any agronomic problem. AI separates that noise from the useful signal. In practice: image segmentation to outline stress zones, break detection on the field’s time series, disease classification from field photographs, and per-zone yield forecasting. Our models are retrained each season on Mediterranean data.',
      ar: 'المؤشّر الخام مشوَّش: زاوية الشمس ورطوبة السطح وطور المحصول ونوع التربة تجعله يتغيّر دون وجود مشكلة فلاحية. والذكاء الاصطناعي يفصل هذا الضجيج عن الإشارة المفيدة. عمليًا: تجزئة الصور لتحديد مناطق الإجهاد، ورصد الانكسار في السلسلة الزمنية للقطعة، وتصنيف الأمراض من صور ميدانية، وتوقّع المردود حسب المنطقة. ويُعاد تدريب نماذجنا كل موسم على معطيات متوسّطية.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'benefits',
    keywords: {
      fr: ['benefices', 'avantages', 'agriculteur', 'exploitant', 'gain', 'rentabilite', 'interet', 'pourquoi'],
      en: ['benefits', 'advantages', 'farmer', 'grower', 'gain', 'profitability', 'why'],
      ar: ['فوائد', 'مزايا', 'فلاح', 'مستغل', 'ربح', 'مردودية', 'لماذا'],
    },
    question: {
      fr: 'Quels sont les bénéfices pour les agriculteurs ?',
      en: 'What are the benefits for farmers?',
      ar: 'ما الفوائد بالنسبة إلى الفلّاحين؟',
    },
    answer: {
      fr: 'Sur les exploitations suivies : −28 % d’eau d’irrigation, −19 % d’azote à rendement équivalent, +12 % de rendement sur les zones suivies, et environ 14 jours d’avance sur l’apparition du stress. À cela s’ajoutent une traçabilité exportable pour les certifications et une planification de récolte anticipée de plusieurs semaines.',
      en: 'On monitored farms: 28 % less irrigation water, 19 % less nitrogen at equivalent yield, 12 % higher yield on monitored zones, and roughly 14 days of lead time before stress appears. On top of that: exportable traceability for certifications and harvest planning brought forward by several weeks.',
      ar: 'في الضيعات المتابَعة: ناقص 28 % من مياه الريّ، وناقص 19 % من الآزوت بمردود مماثل، وزائد 12 % في المردود على المناطق المتابَعة، ونحو 14 يومًا من التقدّم قبل ظهور الإجهاد. يُضاف إلى ذلك تتبّع قابل للتصدير من أجل الإشهاد، وتخطيط للحصاد مسبق بأسابيع.',
    },
    link: { href: '/impact', labelKey: 'actions.seeResults' },
  },
  {
    id: 'demo',
    keywords: {
      fr: ['demo', 'demonstration', 'essai', 'test', 'rendez vous', 'presentation', 'essayer'],
      en: ['demo', 'demonstration', 'trial', 'test', 'appointment', 'try'],
      ar: ['عرض', 'تجربة', 'اختبار', 'موعد', 'تجريب'],
    },
    question: {
      fr: 'Comment demander une démonstration ?',
      en: 'How do I request a demonstration?',
      ar: 'كيف أطلب عرضًا توضيحيًا؟',
    },
    answer: {
      fr: 'Depuis la page Contact : décrivez vos cultures, votre surface approximative et votre région. Un agronome prépare une première lecture satellite de votre zone et vous rappelle sous 48 h ouvrées pour caler une démonstration de 30 minutes, en visio ou sur place. Vous pouvez ensuite ajouter une parcelle test, sans engagement.',
      en: 'From the Contact page: describe your crops, approximate area and region. An agronomist prepares a first satellite reading of your area and calls you back within 48 working hours to set up a 30-minute demonstration, by video call or on site. You can then add a test field, with no commitment.',
      ar: 'من صفحة الاتصال: صف محاصيلك ومساحتك التقريبية وجهتك. يحضّر مهندس فلاحي قراءة فضائية أولى لمنطقتك ويعاود الاتصال بك خلال 48 ساعة عمل لتحديد عرض توضيحي مدّته 30 دقيقة، عن بُعد أو في عين المكان. ويمكنك بعدها إضافة قطعة تجريبية دون أيّ التزام.',
    },
    link: { href: '/contact', labelKey: 'actions.requestDemo' },
  },
  {
    id: 'contact',
    keywords: {
      fr: ['contact', 'contacter', 'telephone', 'email', 'mail', 'adresse', 'joindre', 'appeler', 'bureau'],
      en: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'office'],
      ar: ['اتصال', 'هاتف', 'رقم', 'بريد', 'ايميل', 'عنوان', 'مكتب', 'تواصل'],
    },
    question: {
      fr: 'Comment vous contacter ?',
      en: 'How can I contact you?',
      ar: 'كيف أتّصل بكم؟',
    },
    answer: {
      fr: 'Par e-mail à info@robocare.tn, par téléphone au +216 39 737 36 85, ou via le formulaire de la page Contact. Nos bureaux sont à Sfax, en Tunisie. Nous répondons sous 48 h ouvrées, en français, en anglais ou en arabe.',
      en: 'By email at info@robocare.tn, by phone on +216 39 737 36 85, or through the form on the Contact page. Our offices are in Sfax, Tunisia. We reply within 48 working hours, in French, English or Arabic.',
      ar: 'عبر البريد الإلكتروني info@robocare.tn، أو الهاتف ‎+216 39 737 36 85‎، أو عبر استمارة صفحة الاتصال. مكاتبنا في صفاقس بتونس. ونجيب خلال 48 ساعة عمل بالفرنسية أو الإنجليزية أو العربية.',
    },
    link: { href: '/contact', labelKey: 'nav.contact' },
  },
  {
    id: 'pricing',
    keywords: {
      fr: ['prix', 'tarif', 'tarifs', 'cout', 'coute', 'couter', 'abonnement', 'devis', 'budget', 'gratuit', 'payant'],
      en: ['price', 'pricing', 'cost', 'how much', 'subscription', 'quote', 'budget', 'free'],
      ar: ['سعر', 'اسعار', 'الاسعار', 'تسعيرة', 'كلفة', 'تكلفة', 'ثمن', 'اشتراك', 'مجاني'],
    },
    question: {
      fr: 'Comment est calculé le tarif ?',
      en: 'How is pricing calculated?',
      ar: 'كيف تُحتسَب التسعيرة؟',
    },
    answer: {
      fr: 'À la surface suivie, avec un palier dégressif au-delà de cent hectares et un tarif spécifique pour les coopératives regroupant plusieurs adhérents. Le suivi satellite est inclus ; les capteurs IoT et les vols de drone sont facturés séparément, uniquement si vous en installez. Pour un chiffrage précis, demandez un devis depuis la page Contact.',
      en: 'By monitored area, with a decreasing tier above one hundred hectares and specific pricing for cooperatives grouping several members. Satellite monitoring is included; IoT sensors and drone flights are billed separately, only if you install them. For an exact figure, request a quote from the Contact page.',
      ar: 'حسب المساحة المتابَعة، مع تدرّج تنازلي فوق مائة هكتار وتسعيرة خاصّة بالتعاضديات التي تجمع عدّة منخرطين. المتابعة الفضائية مشمولة؛ أمّا حسّاسات إنترنت الأشياء وتحليقات الطائرات المسيّرة فتُفوتر على حدة وفقط إن ركّبتها. وللحصول على تقدير دقيق، اطلب عرض سعر من صفحة الاتصال.',
    },
    link: { href: '/contact', labelKey: 'actions.requestDemo' },
  },
  {
    id: 'getting-started',
    keywords: {
      fr: ['commencer', 'demarrer', 'inscription', 'compte', 'materiel', 'installation', 'premiere analyse', 'delai'],
      en: ['start', 'get started', 'sign up', 'account', 'hardware', 'installation', 'first analysis'],
      ar: ['البدء', 'الانطلاق', 'تسجيل', 'حساب', 'عتاد', 'تركيب', 'أول تحليل'],
    },
    question: {
      fr: 'Faut-il du matériel pour démarrer ?',
      en: 'Do I need hardware to get started?',
      ar: 'هل أحتاج عتادًا للانطلاق؟',
    },
    answer: {
      fr: 'Non. Le satellite suffit : vous créez un compte, vous ajoutez une parcelle et la première analyse arrive en 24 h. L’historique remonte généralement sur trois à cinq ans d’archives, donc vous comparez la campagne en cours aux précédentes dès le premier jour. Les capteurs IoT et les vols de drone ne viennent qu’ensuite, si vos parcelles en tirent un bénéfice.',
      en: 'No. Satellite is enough: you create an account, add a field and the first analysis arrives within 24 hours. History usually goes back three to five years of archives, so you compare the current season with previous ones from day one. IoT sensors and drone flights come later, only if your fields draw a benefit from them.',
      ar: 'لا. القمر الاصطناعي يكفي: تنشئ حسابًا وتضيف قطعة فيصلك أوّل تحليل خلال 24 ساعة. ويعود السجلّ عادةً إلى ثلاث أو خمس سنوات من الأرشيف، فتقارن الموسم الجاري بالمواسم السابقة منذ اليوم الأول. أمّا حسّاسات إنترنت الأشياء وتحليقات الطائرات المسيّرة فتأتي لاحقًا، إن كانت قطعك تجني منها فائدة.',
    },
    link: { href: '/plateforme', labelKey: 'actions.seePlatform' },
  },
  {
    id: 'crops',
    keywords: {
      fr: ['culture', 'cultures', 'olivier', 'oliveraie', 'ble', 'cereales', 'agrumes', 'serre', 'vigne', 'tomate', 'pomme de terre'],
      en: ['crop', 'crops', 'olive', 'wheat', 'cereals', 'citrus', 'greenhouse', 'vine', 'tomato', 'potato'],
      ar: ['محصول', 'محاصيل', 'زيتون', 'قمح', 'حبوب', 'قوارص', 'بيوت محمية', 'كرم', 'طماطم', 'بطاطا'],
    },
    question: {
      fr: 'Quelles cultures sont couvertes ?',
      en: 'Which crops are covered?',
      ar: 'ما المحاصيل المشمولة؟',
    },
    answer: {
      fr: 'Les modèles sont calibrés sur oliviers, blé dur et orge, agrumes et cultures sous serre. Le suivi est également déployé sur vignes, tomates de plein champ et pommes de terre. Pour une culture qui ne figure pas dans cette liste, le suivi satellite générique reste possible : parlez-en à un agronome, qui vous dira ce qui est fiable et ce qui ne l’est pas encore.',
      en: 'Models are calibrated for olive, durum wheat and barley, citrus and protected crops. Monitoring is also deployed on vines, open-field tomatoes and potatoes. For a crop not on this list, generic satellite monitoring remains possible: talk to an agronomist, who will tell you what is reliable and what is not yet.',
      ar: 'النماذج معايَرة على الزيتون والقمح الصلب والشعير والقوارص والزراعات المحميّة. كما تُنشَر المتابعة على الكروم والطماطم في الحقل المكشوف والبطاطا. أمّا المحصول غير المذكور فتبقى المتابعة الفضائية العامّة ممكنة: تحدّث إلى مهندس فلاحي ليخبرك بما هو موثوق وما ليس كذلك بعد.',
    },
    link: { href: '/solutions', labelKey: 'actions.allSolutions' },
  },
  {
    id: 'disease',
    keywords: {
      fr: ['maladie', 'maladies', 'ravageur', 'oeil de paon', 'mildiou', 'detection', 'traitement', 'phytosanitaire'],
      en: ['disease', 'diseases', 'pest', 'peacock spot', 'mildew', 'detection', 'treatment', 'spraying'],
      ar: ['مرض', 'أمراض', 'آفة', 'عين الطاووس', 'البياض', 'رصد', 'معالجة', 'مبيدات'],
    },
    question: {
      fr: 'Comment détectez-vous les maladies ?',
      en: 'How do you detect diseases?',
      ar: 'كيف ترصدون الأمراض؟',
    },
    answer: {
      fr: 'Par croisement de trois signaux : une anomalie localisée sur la série d’indices, des conditions météo favorables au pathogène, et la classification d’images — orthomosaïque de drone ou photo de terrain — par un modèle de vision par ordinateur. Le résultat est toujours présenté comme une hypothèse avec un niveau de confiance, à confirmer au champ : c’est une aide au dépistage, pas un diagnostic.',
      en: 'By crossing three signals: a localised anomaly in the index series, weather conditions favourable to the pathogen, and image classification — drone orthomosaic or field photograph — by a computer vision model. The result is always presented as a hypothesis with a confidence level, to be confirmed in the field: it is scouting support, not a diagnosis.',
      ar: 'بتقاطع ثلاث إشارات: شذوذ موضعي في سلسلة المؤشّرات، وظروف مناخية ملائمة للممرض، وتصنيف للصور — فسيفساء الطائرة المسيّرة أو صورة ميدانية — بواسطة نموذج رؤية حاسوبية. وتُقدَّم النتيجة دائمًا كفرضية بدرجة ثقة تُؤكَّد في الحقل: فهي مساعدة على الاستكشاف، لا تشخيص.',
    },
    link: { href: '/technologie', labelKey: 'actions.ourTechnology' },
  },
  {
    id: 'data-security',
    keywords: {
      fr: ['donnees', 'securite', 'confidentialite', 'rgpd', 'hebergement', 'propriete', 'privacy', 'stockage'],
      en: ['data', 'security', 'privacy', 'gdpr', 'hosting', 'ownership', 'storage'],
      ar: ['بيانات', 'أمن', 'خصوصية', 'استضافة', 'ملكية', 'تخزين'],
    },
    question: {
      fr: 'Mes données sont-elles protégées ?',
      en: 'Is my data protected?',
      ar: 'هل بياناتي محميّة؟',
    },
    answer: {
      fr: 'Oui. Vos contours de parcelles, vos relevés et votre historique vous appartiennent : ils ne sont ni revendus ni transmis à un tiers. L’hébergement est assuré dans des centres de données européens certifiés ISO 27001, avec chiffrement TLS 1.3 en transit, chiffrement au repos et sauvegardes quotidiennes. L’export complet ou la suppression définitive s’obtiennent sur simple demande.',
      en: 'Yes. Your field outlines, readings and history belong to you: they are never sold or passed to third parties. Hosting is in ISO 27001 certified European data centres, with TLS 1.3 encryption in transit, encryption at rest and daily backups. A full export or permanent deletion is available on request.',
      ar: 'نعم. حدود قطعك وقياساتك وسجلّك ملك لك: لا تُباع ولا تُنقل إلى طرف ثالث. والاستضافة في مراكز بيانات أوروبية معتمدة وفق ISO 27001، مع تشفير TLS 1.3 أثناء النقل وتشفير عند التخزين ونسخ احتياطية يومية. والتصدير الكامل أو الحذف النهائي متاحان بمجرّد الطلب.',
    },
    link: { href: '/plateforme', labelKey: 'actions.seePlatform' },
  },
  {
    id: 'languages',
    keywords: {
      fr: ['langue', 'langues', 'arabe', 'francais', 'anglais', 'traduction'],
      en: ['language', 'languages', 'arabic', 'french', 'english', 'translation'],
      ar: ['لغة', 'لغات', 'عربية', 'فرنسية', 'إنجليزية', 'ترجمة'],
    },
    question: {
      fr: 'Dans quelles langues travaillez-vous ?',
      en: 'Which languages do you work in?',
      ar: 'بأيّ لغات تعملون؟',
    },
    answer: {
      fr: 'Français, anglais et arabe — pour l’interface, les rapports, les alertes et les échanges avec nos agronomes, à l’écrit comme au téléphone. Aucune des trois versions n’est dégradée : le sélecteur de langue en haut de page change tout le site instantanément.',
      en: 'French, English and Arabic — for the interface, reports, alerts and conversations with our agronomists, in writing and by phone. None of the three versions is degraded: the language switcher at the top of the page changes the whole site instantly.',
      ar: 'الفرنسية والإنجليزية والعربية — للواجهة والتقارير والتنبيهات والتواصل مع مهندسينا، كتابةً وهاتفيًا. ولا نسخة منقوصة بين الثلاث: فمبدّل اللغة أعلى الصفحة يغيّر الموقع كلّه فورًا.',
    },
  },
  {
    id: 'coverage',
    keywords: {
      fr: ['pays', 'region', 'tunisie', 'mena', 'etranger', 'international', 'ou', 'zone'],
      en: ['country', 'region', 'tunisia', 'mena', 'abroad', 'international', 'where', 'area'],
      ar: ['بلد', 'جهة', 'تونس', 'الخارج', 'دولي', 'أين', 'منطقة'],
    },
    question: {
      fr: 'Travaillez-vous hors de Tunisie ?',
      en: 'Do you work outside Tunisia?',
      ar: 'هل تعملون خارج تونس؟',
    },
    answer: {
      fr: 'Oui, la plateforme est ouverte à la région MENA depuis 2025. Le suivi satellite fonctionne partout dans le monde, puisqu’il ne dépend d’aucune infrastructure au sol. En revanche, les capteurs IoT et les vols de drone dépendent de la couverture réseau locale et de la réglementation aérienne du pays.',
      en: 'Yes, the platform has been open to the MENA region since 2025. Satellite monitoring works anywhere in the world, since it relies on no ground infrastructure. IoT sensors and drone flights, however, depend on local network coverage and the country’s aviation rules.',
      ar: 'نعم، المنصّة مفتوحة لمنطقة الشرق الأوسط وشمال إفريقيا منذ 2025. وتعمل المتابعة الفضائية في أيّ مكان في العالم لأنّها لا تعتمد على أيّ بنية أرضية. أمّا حسّاسات إنترنت الأشياء وتحليقات الطائرات المسيّرة فتتوقّف على تغطية الشبكة المحلّية وعلى التشريع الجوّي للبلد.',
    },
  },
];

/** Réponses rapides proposées à l'ouverture du chat. */
export const QUICK_REPLY_IDS = [
  'what-is-robocare',
  'services',
  'platform',
  'ndvi',
  'water',
  'demo',
  'pricing',
  'contact',
] as const;

const BY_ID = new Map(KNOWLEDGE.map((entry) => [entry.id, entry]));

export function findEntry(id: string): KnowledgeEntry | undefined {
  return BY_ID.get(id);
}

export const QUICK_REPLIES: readonly KnowledgeEntry[] = QUICK_REPLY_IDS.map((id) => {
  const entry = BY_ID.get(id);
  if (!entry) throw new Error(`QUICK_REPLY_IDS: entrée « ${id} » introuvable.`);
  return entry;
});
