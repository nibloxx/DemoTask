/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        fraunces: ["var(--font-fraunces)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: "#F4EFE6",
        bone: "#FBF8F2",
        ink: "#1F1B14",
        "ink-2": "#43392E",
        mute: "#7A7468",
        hair: "#D8CFBE",
        "hair-soft": "#E5DDCC",
        terra: "#B14A2C",
        "terra-deep": "#8A341B",
        moss: "#3F5E48",
      },
    },
  },
  plugins: [],
};
