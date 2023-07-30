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
        "fade-out-in": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "slide-left": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(100)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-100)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        "fade-out-in": "fade-out-in 2s",
        "slide-left": "slide-left 1.5s linear",
        "slide-right": "slide-right 1.5s linear",
        "slide-up": "slide-up 1.5s linear",
        "slide-down": "slide-down 1.5s linear",
      },
      dropShadow: {
        "stroke-black": ["-4px -4px 0 #000", "4px -4px 0 #000", "-4px 4px 0 #000", "4px 4px 0 #000"],
        "stroke-black-sm": ["-0.8px -0.8px 0 #000", "0.8px -0.8px 0 #000", "-0.8px 0.8px 0 #000", "0.8px 0.8px 0 #000"],
        "stroke-white": ["-4px -4px 0 #FFF", "4px -4px 0 #FFF", "-4px 4px 0 #FFF", "4px 4px 0 #FFF"],
        "stroke-white-sm": ["-0.8px -0.8px 0 #FFF", "0.8px -0.8px 0 #FFF", "-0.8px 0.8px 0 #FFF", "0.8px 0.8px 0 #FFF"],
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
