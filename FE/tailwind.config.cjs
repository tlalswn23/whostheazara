/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
      },
      dropShadow: {
        "stroke-black": ["-4px -4px 0 #000", "4px -4px 0 #000", "-4px 4px 0 #000", "4px 4px 0 #000"],
        "stroke-white": ["-4px -4px 0 #FFF", "4px -4px 0 #FFF", "-4px 4px 0 #FFF", "4px 4px 0 #FFF"],
      },
    },
    fontFamily: {
      galmuri11: ["galmuri11"],
    },
    screens: {
      "3xl": "1880px",
    },
  },
  plugins: [],
};
