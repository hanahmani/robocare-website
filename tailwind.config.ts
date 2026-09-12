import type { Config } from 'tailwindcss';

/**
 * Jetons de design RoboCare.
 * Les valeurs reprennent exactement la maquette validée (couleurs, rayons,
 * ombres, échelle typographique) — ne pas improviser de nouvelles teintes.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        // md = tablet (768), lg = laptop (1024), xl = desktop (1440)
        xl: '1440px',
      },
      colors: {
        forest: {
          950: '#06120C',
          900: '#0B2015',
          800: '#123322',
        },
        ink: {
          900: '#08170F',
          700: '#22382C',
          500: '#556B5E',
          400: '#5F7367',
          300: '#8A9C90',
        },
        sage: {
          50: '#F4F8F3',
          100: '#F1F9EC',
          200: '#EAF4E3',
          300: '#D6E5CE',
        },
        leaf: {
          500: '#4D9E2F',
          600: '#2F7D32',
          700: '#1F8049',
        },
        lime: {
          100: '#DCF3C9',
          400: '#B4E668',
          500: '#9ED84B',
        },
        ocre: {
          400: '#E4A93C',
          500: '#C88A2E',
          600: '#B87514',
        },
        cream: '#EAF4E3',
        danger: '#D8232A',
      },
      fontFamily: {
        // `--font-arabic` est placé juste après la police latine : le navigateur
        // fait le repli caractère par caractère, donc le latin garde sa police
        // et l'arabe est rendu avec IBM Plex Sans Arabic.
        sans: ['var(--font-manrope)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'var(--font-arabic)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        headline: '-0.035em',
        display: '-0.045em',
      },
      /**
       * Échelle typographique fluide. Chaque `clamp()` interpole entre la
       * valeur mobile (375px) et la valeur desktop (1440px) : plus de palier
       * brutal au franchissement d'un breakpoint, et surtout plus de titre
       * surdimensionné sur la plage tablette, où l'ancienne échelle sautait
       * directement de `sm:` à `lg:`.
       *
       * L'interlettrage reste géré par la règle de base sur h1–h4 (et par sa
       * neutralisation en arabe) : ne pas le réintroduire ici.
       */
      fontSize: {
        display: ['clamp(2.375rem, 1.495rem + 3.756vw, 4.875rem)', { lineHeight: '1.03' }],
        h1: ['clamp(2.125rem, 1.641rem + 2.066vw, 3.5rem)', { lineHeight: '1.06' }],
        h2: ['clamp(1.875rem, 1.391rem + 2.066vw, 3.25rem)', { lineHeight: '1.07' }],
        // Titre de section secondaire : remplace les cinq échelles voisines
        // (→40, →40, →44, →44, →48px) qui coexistaient d'une page à l'autre.
        'h2-alt': ['clamp(1.75rem, 1.398rem + 1.502vw, 2.75rem)', { lineHeight: '1.09' }],
        // Titre de bloc dense (preuve sociale, architecture).
        'h3-lg': ['clamp(1.5rem, 1.368rem + 0.563vw, 1.875rem)', { lineHeight: '1.15' }],
        h3: ['clamp(1.1875rem, 1.099rem + 0.376vw, 1.4375rem)', { lineHeight: '1.3' }],
        lead: ['clamp(1.03125rem, 0.954rem + 0.329vw, 1.25rem)', { lineHeight: '1.6' }],
        body: ['clamp(1rem, 0.978rem + 0.094vw, 1.0625rem)', { lineHeight: '1.7' }],
      },
      spacing: {
        /** Rythme vertical d'une section : 72px en mobile → 120px en desktop, sans palier. */
        section: 'clamp(4.5rem, 3.444rem + 4.507vw, 7.5rem)',
        /** Respiration entre l'en-tête d'une section et sa grille de contenu. */
        'section-gap': 'clamp(2rem, 1.3rem + 3vw, 3.5rem)',
        /** Même rôle, pour les blocs larges (frises, comparatifs, colonnes). */
        'section-gap-lg': 'clamp(3rem, 2.648rem + 1.502vw, 4rem)',
      },
      borderRadius: {
        // Une seule famille de rayons, du plus petit au plus grand conteneur.
        field: '14px',
        chip: '18px',
        tile: '22px',
        card: '24px',
        panel: '32px',
      },
      transitionDuration: {
        // Échelle miroir de `DURATION` dans `lib/motion.ts`.
        fast: '180ms',
        base: '260ms',
        slow: '380ms',
        reveal: '550ms',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,18,12,.04), 0 22px 46px -30px rgba(6,18,12,.22)',
        lift: '0 34px 64px -30px rgba(11,32,21,.34)',
        hover: '0 40px 70px -34px rgba(11,32,21,.36)',
        glass: '0 50px 90px -40px rgba(0,0,0,.8)',
        lime: '0 18px 40px -18px rgba(158,216,75,.8)',
        leaf: '0 18px 40px -18px rgba(77,158,47,.9)',
        /** Ombre resserrée de l'état enfoncé : la surface « touche » le fond. */
        press: '0 2px 8px -4px rgba(11,32,21,.45)',
      },
      backgroundImage: {
        'index-scale':
          'linear-gradient(90deg,#8C3B12 0%,#C88A2E 22%,#D9C657 40%,#7FA98B 62%,#1F8049 80%,#9ED84B 100%)',
        'grid-lime':
          'linear-gradient(rgba(158,216,75,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(158,216,75,.09) 1px, transparent 1px)',
        'cream-fade': 'linear-gradient(135deg, #FFFFFF 0%, #F6FAF4 45%, #EAF4E3 100%)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(.2,.8,.2,1)',
      },
      keyframes: {
        sweep: {
          '0%': { top: '-6%', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { top: '104%', opacity: '0' },
        },
        pingSlow: {
          '0%': { opacity: '.7', transform: 'scale(.5)' },
          '100%': { opacity: '0', transform: 'scale(2.6)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatyAlt: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        sweep: 'sweep 6.5s cubic-bezier(.5,0,.5,1) infinite',
        'ping-slow': 'pingSlow 2.4s ease-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        'floaty-alt': 'floatyAlt 8s ease-in-out infinite',
        'spin-slow': 'spinSlow 6s linear infinite',
        marquee: 'marquee 34s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
