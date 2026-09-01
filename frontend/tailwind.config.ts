import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#004b23',
          greenDark: '#003619',
          greenLight: '#007034',
          gold: '#d4af37',
          goldLight: '#f3e5ab',
          red: '#c1121f',
          redDark: '#8b0000',
          dark: '#111827',
          gray: '#1f2937',
          cream: '#fdfbf7',
          border: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Noto Sans Arabic', 'serif'],
      },
      lineHeight: {
        none: '1.6',
        tight: '1.85',
        snug: '2.0',
        normal: '2.15',
        relaxed: '2.35',
        loose: '2.6',
        nastaliq: '2.5',
        'nastaliq-tight': '2.2',
        'nastaliq-loose': '2.8',
      },
      animation: {
        ticker: 'ticker 35s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
