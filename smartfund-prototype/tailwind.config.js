/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bnp-primary': '#3B8D68',
        'bnp-accent': '#5BA87E',
        'bnp-deep': '#2A6E50',
        'bnp-black': '#2B2B2B',
        'bnp-light-gray': '#F5F6F7',
        'bnp-neutral-gray': '#C8C9CA',
        'bnp-alert-red': '#C94A4A',
        'bnp-profit-green': '#39A86B',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        'bnp': '16px',
        'bnp-lg': '20px',
      },
    },
  },
  plugins: [],
}

