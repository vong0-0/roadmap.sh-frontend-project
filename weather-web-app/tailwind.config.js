/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#31322d",
        "secondary": "faf4e6",
        "cs-black": "#333",
        "cs-yellow": "#fac335",
        "cs-blue": "#406eb7",
      },
      screens:{
        "ml": "992px",
        "xs": "480px",
        "xxs": "360px",
      }
    },
  },
  plugins: [],
}

