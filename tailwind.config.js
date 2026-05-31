/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: "var(--color-bg)",
        "bg-dark": "var(--color-bg-dark)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        gold: "var(--color-gold)",
        "gold-light": "var(--color-gold-light)",
        emerald: "var(--color-emerald)",
        burgundy: "var(--color-burgundy)",
        ivory: "var(--color-ivory)",
        border: "var(--color-border)",
      }
    },
  },
  plugins: [],
}
