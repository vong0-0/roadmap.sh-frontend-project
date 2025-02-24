/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        "cs-black": "var(--black-clr)",
      }
    },
  },
  plugins: [],
}

