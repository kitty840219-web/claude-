import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#22213f",
          50: "#f2f1f8",
          100: "#e2e0f1",
          200: "#c2bfe0",
          300: "#948dc4",
          400: "#6a63a4",
          500: "#4c4680",
          600: "#3a3564",
          700: "#2c2850",
          800: "#211d3d",
          900: "#181530",
          950: "#100e21",
        },
        night: {
          DEFAULT: "#2b2a5c",
          light: "#3f3a78",
          dark: "#181542",
        },
        lavender: {
          DEFAULT: "#a89cd6",
          light: "#cfc6ea",
          dark: "#7e71ab",
        },
        paper: {
          DEFAULT: "#faf6ee",
          dark: "#f2e9d8",
        },
        gold: {
          DEFAULT: "#d6a94f",
          light: "#ecce8f",
          dark: "#a97c2e",
        },
        blush: "#f0b6a3",
        sage: "#6b7a56",
        cocoa: "#8a5f3c",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-tc)", "Noto Serif TC", "serif"],
        sans: ["var(--font-noto-sans-tc)", "Noto Sans TC", "sans-serif"],
        hand: ["var(--font-ma-shan-zheng)", "cursive"],
      },
      backgroundImage: {
        "night-sky":
          "radial-gradient(ellipse at top, #3f3a78 0%, #2b2a5c 45%, #181542 100%)",
        "paper-warm":
          "linear-gradient(180deg, #faf6ee 0%, #f2e9d8 100%)",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(43, 42, 92, 0.25)",
        card: "0 8px 24px -6px rgba(43, 42, 92, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
