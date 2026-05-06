import type { Config } from "tailwindcss";

// Colors driven by CSS custom properties so light/dark theme can swap
// the entire palette via a single [data-theme] attribute on <html>.
// Each token is an RGB triplet, e.g. `--bone-rgb: 245 242 251`,
// then exposed to Tailwind with /<alpha-value> for alpha-modifier support.
const tokenColor = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bone: tokenColor("bone"),
        bone2: tokenColor("bone-2"),
        ink: tokenColor("ink"),
        ink2: tokenColor("ink-2"),
        graphite: tokenColor("graphite"),
        ash: tokenColor("ash"),
        oxblood: tokenColor("oxblood"),
        oxblood2: tokenColor("oxblood-2"),
        sage: tokenColor("sage"),
        gilt: tokenColor("gilt"),
        line: "rgb(var(--line-rgb) / var(--line-a, 0.12))",
        line2: "rgb(var(--line-rgb) / var(--line-a-2, 0.06))",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Hanken Grotesk", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.012em",
        tighter2: "-0.025em",
      },
    },
  },
  plugins: [],
};
export default config;
