/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#ffdc01',
        'cs-black': '#121210',
        'cs-grey': '#afb59d',
        'cs-green': '#2b5b3f',
        'cs-red': '#b20808',
      }
    },
  },
  plugins: [],
}

