import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        line: "var(--line)",
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        "brand-soft": "var(--brand-soft)",
        massage: "var(--massage)",
        pool: "var(--pool)",
        "pool-soft": "var(--pool-soft)",
        kids: "var(--kids)",
        "kids-soft": "var(--kids-soft)",
      },
      fontFamily: {
        display: ["Onest", "'Golos Text'", "system-ui", "sans-serif"],
        sans: ["'Golos Text'", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72ch" },
      borderRadius: { card: "var(--r-card)", soft: "var(--r-soft)", pill: "var(--r-pill)" },
      boxShadow: { card: "var(--shadow-card)", lift: "var(--shadow-lift)" },
    },
  },
  plugins: [],
};
export default config;
