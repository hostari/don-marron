import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Hiragino Sans", "sans-serif"],
      serif: ["'Libre Baskerville'", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      spacing: {
        "30": "120px",
      },
      backgroundImage: {
        "noise-texture": "url('/noise.png')",
      },
      backgroundColor: {
        backgroundAlt: "#D5C4A1",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "#2D1C13",
        backgroundAlt: "#D5C4A1",
        field: "#F5E6CF",
        brown: "#3F2212",
        buttonText: "#E4D9D2",
        display: "#000000",
        displayAlt: "#6D6A6A",
        input: "#F5E6CF",
        "input-placeholder": "#8B8B8B",
        white: "#ECECEC",
        gray: "#212427B2",
        black: "#212427",
        orange: "#904216",
      },
      borderWidth: {
        button: "2px",
      },
      borderColor: {
        button: "#6F3CDC",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
