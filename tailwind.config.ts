import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#80a9ff",
          400: "#4d7fff",
          500: "#2457ff",
          600: "#123ce0",
          700: "#0e2eb0",
          800: "#0d2789",
          900: "#0e2470",
        },
      },
    },
  },
  plugins: [],
};

export default config;
