import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display, "Bebas Neue", "Helvetica Neue", Arial, sans-serif)', 'sans-serif'],
        sans: ['var(--font-body, "Helvetica Neue", Arial, sans-serif)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          accent: 'var(--color-brand-accent)',
          secondary: 'var(--color-brand-secondary)',
          text: 'var(--color-brand-text)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
