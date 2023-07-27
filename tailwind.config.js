/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      "nunito-sans": ["Nunito Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "dark-blue": "#2b3945",
        "very-dark-blue": "#202c37",
        "very-dark-blueT": "#111517",
        "dark-gray": "#858585",
        "light-gray": "#fafafa",
      },
      fontSize: {
        "4.5xl": "2.6rem",
      },
      screens: {
        md2: "920px",
      },
      colors: {
        "primary-light": "rgb(35, 31, 34)",
        "primary-dark": "rgb(227, 226, 230)",
        "dark-mode-bg": "#2e2e2e",
        "light-mode-bg": "#e1e1e1",
      },
    },
  },
  plugins: [],
};
