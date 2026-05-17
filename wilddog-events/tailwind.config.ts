import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        anton:  ['var(--font-anton)',  'Impact', 'sans-serif'],
        bebas:  ['var(--font-bebas)',  'sans-serif'],
        archivo: ['var(--font-archivo)', 'sans-serif'],
      },
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        text:    'var(--text)',
        dim:     'var(--dim)',
        tg:      'var(--tg)',
        dc:      'var(--dc)',
      },
      screens: {
        wolf: '860px',
      },
    },
  },
  plugins: [],
}

export default config
