import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: "#004C99",
        brandgreen: "#4CAF50",
        brandgold: "#FBC02D",
        lightgray: "#F8F9FB",
        darkgray: "#8E9196",
      },
      backgroundImage: {
        'hero-medical': "linear-gradient(135deg, #F8F9FB 0%, #e2efff 60%, #004C99 100%)",
      },
      borderRadius: {
        xl: "1.2rem",
      },
      boxShadow: {
        card: "0px 8px 38px 0px rgba(0,78,153,0.06)",
      },
      transitionProperty: {
        position: "top",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;