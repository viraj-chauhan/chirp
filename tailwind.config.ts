import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#f0f9f9",
          100: "#d0eeee",
          200: "#96C4C4",
          300: "#6aabab",
          400: "#3d9090",
          500: "#2D7D7E",
          600: "#236969",
          700: "#1a5252",
          800: "#123c3c",
          900: "#0a2626",
        },
        amber: {
          50:  "#fff8e6",
          100: "#fdebbf",
          300: "#f7c84a",
          400: "#F5B820",
          500: "#F0A500",
          600: "#D4920A",
          700: "#a36f08",
        },
        charcoal: "#555059",
      },
    },
  },
  plugins: [],
};
export default config;
