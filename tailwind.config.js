/** @type {import('tailwindcss').Config} */
const ink = (n) => `rgb(var(--ink-${n}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    { pattern: /(ring|border)-(gold|violet|emerald|amber|sky|rose|fuchsia)-300/, variants: ["hover"] },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        // Surface = card background. Light: white, Dark: lifted slate.
        surface: "rgb(var(--surface) / <alpha-value>)",
        // Neutral ramp is CSS-variable backed so it inverts cleanly in dark mode.
        ink: {
          50: ink(50),
          100: ink(100),
          200: ink(200),
          300: ink(300),
          400: ink(400),
          500: ink(500),
          600: ink(600),
          700: ink(700),
          800: ink(800),
          900: ink(900),
          950: ink(950),
        },
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd3ff",
          300: "#8eb6ff",
          400: "#598dff",
          500: "#3366ff",
          600: "#1f47f5",
          700: "#1735e1",
          800: "#192db6",
          900: "#1a2c8f",
          950: "#141c57",
        },
        gold: {
          50: "#fdfaf0",
          100: "#fcf3d7",
          200: "#f8e3a3",
          300: "#f3cd64",
          400: "#eeb52f",
          500: "#e69a13",
          600: "#cb750d",
          700: "#a9530f",
          800: "#894114",
          900: "#713615",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,17,25,0.04), 0 8px 24px -12px rgba(16,17,25,0.18)",
        glow: "0 0 0 1px rgba(51,102,255,0.15), 0 12px 40px -12px rgba(51,102,255,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
