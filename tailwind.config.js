/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        'gold-dark': '#b8941f',
        'bg-dark': '#1a1a1a',
        'card-bg': '#2d1b0e',
        'text-secondary': '#8b7355',
      }
    },
  },
  plugins: [],
}