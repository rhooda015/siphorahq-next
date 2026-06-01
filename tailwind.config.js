/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)',   'DM Sans',            'system-ui', 'sans-serif'],
      },
      colors: {
        bg:           'var(--color-bg)',
        'bg-dark':    'var(--color-bg-dark)',
        text:         'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        gold:         'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        ivory:        'var(--color-ivory)',
        border:       'var(--color-border)',
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
