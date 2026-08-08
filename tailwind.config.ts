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
        cream: '#FBF7F0',
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
      borderRadius: {
        card: '24px',
        tile: '22px',
        field: '14px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,18,12,.04), 0 22px 46px -30px rgba(6,18,12,.22)',
        lift: '0 34px 64px -30px rgba(11,32,21,.34)',
        hover: '0 40px 70px -34px rgba(11,32,21,.36)',
        glass: '0 50px 90px -40px rgba(0,0,0,.8)',
        lime: '0 18px 40px -18px rgba(158,216,75,.8)',
        leaf: '0 18px 40px -18px rgba(77,158,47,.9)',
      },
      backgroundImage: {
        'index-scale':
          'linear-gradient(90deg,#8C3B12 0%,#C88A2E 22%,#D9C657 40%,#7FA98B 62%,#1F8049 80%,#9ED84B 100%)',
        'grid-lime':
          'linear-gradient(rgba(158,216,75,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(158,216,75,.09) 1px, transparent 1px)',
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
        gridPan: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '64px 64px' },
        },
      },
      animation: {
        sweep: 'sweep 6.5s cubic-bezier(.5,0,.5,1) infinite',
        'ping-slow': 'pingSlow 2.4s ease-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        'floaty-alt': 'floatyAlt 8s ease-in-out infinite',
        'spin-slow': 'spinSlow 6s linear infinite',
        marquee: 'marquee 34s linear infinite',
        'grid-pan': 'gridPan 14s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
