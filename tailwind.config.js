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
        "main-light": "#231f22",
        "main-dark": "#e3e2e6",
        "dark-mode": "#1f2220",
        "light-mode": "#e3e2e6",
      },
    },
  },
  plugins: [],
};
