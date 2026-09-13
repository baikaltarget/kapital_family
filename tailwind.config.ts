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
        massage: "var(--massage)",
        pool: "var(--pool)",
        kids: "var(--kids)",
      },
      fontFamily: {
        display: ["Literata", "Georgia", "serif"],
        sans: ["'Golos Text'", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72ch" },
    },
  },
  plugins: [],
};
export default config;
