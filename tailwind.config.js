/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#38bdf8',
        dark: '#0f172a',
        light: '#f8fafc',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
