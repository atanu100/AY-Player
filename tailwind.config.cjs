/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        primary: '#3b82f6',
        secondary: '#8b5cf6'
      },
    },
  },
  plugins: [],
} 