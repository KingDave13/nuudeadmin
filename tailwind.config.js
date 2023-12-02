/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        secondary: "#EDD574",
        mainRed: "#E30613",
        primaryalt: "#434343",
        textalt: "#898989",
        maintext: "#575656"
      },
      fontFamily: {
        manierRegular: "manier-regular",
        manierBold: "manier-bold",
        manierMedium: "manier-medium",
        manierLight: "manier-light",
        manierHeavy: "manier-heavy",
        manierBlack: "manier-black",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};