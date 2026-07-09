import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "40px",
        lg: "80px",
      },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8F8F8",
        ink: "#111111",
        gold: {
          DEFAULT: "#C7A76C",
          soft: "#D9C08F",
          deep: "#A8874E",
        },
        border: "#ECECEC",
        footer: "#111111",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        lux: "16px",
      },
      spacing: {
        section: "120px",
        "section-tablet": "90px",
        "section-mobile": "70px",
        "inner-section": "60px",
        card: "32px",
        sm2: "16px",
      },
      boxShadow: {
        subtle: "0 8px 30px -12px rgba(17, 17, 17, 0.08)",
        card: "0 20px 40px -20px rgba(17, 17, 17, 0.15)",
      },
      letterSpacing: {
        luxe: "0.08em",
        wide2: "0.12em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        sunrise: {
          "0%": { transform: "translateY(6px) scaleX(0.6)", opacity: "0" },
          "100%": { transform: "translateY(0) scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        "slow-zoom": "slow-zoom 8s ease-out forwards",
        sunrise: "sunrise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
