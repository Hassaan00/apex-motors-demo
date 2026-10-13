import type { Config } from "tailwindcss";
const volt = { 50: "#fff3ef", 100: "#ffe1d8", 200: "#ffc0ad", 300: "#ff9475", 400: "#ff6a45", 500: "#ff3b1f", 600: "#e5260c", 700: "#be1d0a", 800: "#9a1b0f", 900: "#7d1a11" };
const carbon = { 50: "#f5f6f7", 100: "#e7e9ec", 200: "#c9cdd3", 300: "#a3a9b2", 400: "#767d88", 500: "#555b65", 600: "#3a3f47", 700: "#24272d", 800: "#17191d", 900: "#101114", 950: "#09090b" };
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { volt, carbon, accent: volt, ink: carbon },
    fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], display: ["var(--font-display)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
    keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } }, sweep: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } } },
    animation: { marquee: "marquee 35s linear infinite", sweep: "sweep 3.5s ease-in-out infinite" },
  } }, plugins: [] };
export default config;
