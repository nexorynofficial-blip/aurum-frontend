import type { Config } from 'tailwindcss';

/**
 * AURUM Design Language (ADL)
 * Tokens sourced from UIUX.md — the single source of truth.
 * Never introduce colors, spacing, or radii outside this scale.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // ---- Color System (§5) ----
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',

      obsidian: '#0B0B0D', // primary background
      charcoal: '#141416', // cards / nav / footer
      slate: '#1D1D20', // elevated surfaces
      brass: {
        DEFAULT: '#A27B3F', // accent — gold thread (<5% of viewport)
        soft: '#BE9A5C',
        deep: '#7E5F30',
      },
      ivory: '#F4F2EE', // text primary
      stone: '#B2B2B2', // text secondary
      graphite: '#2D2D31', // dividers
      crimson: '#8B3A3A', // error
      forest: '#3D7356', // success
    },

    // ---- Typography (§6–7) ----
    fontFamily: {
      display: ['var(--font-fraunces)', 'Fraunces', 'serif'],
      body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'monospace'],
    },
    fontSize: {
      micro: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }], // 12
      caption: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }], // 14
      small: ['1rem', { lineHeight: '1.6' }], // 16
      body: ['1.125rem', { lineHeight: '1.7' }], // 18
      'body-lg': ['1.25rem', { lineHeight: '1.7' }], // 20
      h4: ['1.5rem', { lineHeight: '1.3' }], // 24
      h3: ['2rem', { lineHeight: '1.2' }], // 32
      h2: ['2.5rem', { lineHeight: '1.12' }], // 40
      h1: ['3.5rem', { lineHeight: '1.05' }], // 56
      hero: ['4.5rem', { lineHeight: '1.02' }], // 72
    },

    // ---- Spacing (§9) — strict 8-point scale ----
    spacing: {
      0: '0',
      px: '1px',
      0.5: '0.125rem', // 2
      1: '0.25rem', // 4
      2: '0.5rem', // 8
      3: '0.75rem', // 12
      4: '1rem', // 16
      6: '1.5rem', // 24
      8: '2rem', // 32
      10: '2.5rem', // 40
      12: '3rem', // 48
      16: '4rem', // 64
      20: '5rem', // 80
      24: '6rem', // 96
      30: '7.5rem', // 120
      40: '10rem', // 160
    },

    // ---- Border Radius (§10) ----
    borderRadius: {
      none: '0',
      input: '16px',
      card: '20px',
      image: '24px',
      modal: '28px',
      full: '999px',
    },

    // ---- Breakpoints (§43) ----
    screens: {
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
    },

    extend: {
      maxWidth: {
        container: '1440px',
        content: '1280px',
        prose: '68ch',
      },
      letterSpacing: {
        luxe: '0.18em', // eyebrow / kicker labels
        wide: '0.06em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)', // §14 signature easing
      },
      transitionDuration: {
        220: '220ms',
        350: '350ms',
        700: '700ms',
        900: '900ms',
      },
      boxShadow: {
        // §11 — elevation from spacing, never heavy
        subtle: '0 1px 2px rgba(0,0,0,0.4)',
        raised: '0 12px 40px -12px rgba(0,0,0,0.55)',
        drawer: '-24px 0 60px -20px rgba(0,0,0,0.7)',
      },
      zIndex: {
        base: '0',
        raised: '10',
        sticky: '20',
        overlay: '40',
        drawer: '50',
        modal: '60',
        toast: '70',
        max: '100',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 700ms cubic-bezier(0.16,1,0.3,1) both',
        'fade-up': 'fade-up 700ms cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
