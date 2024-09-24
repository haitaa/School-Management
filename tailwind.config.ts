import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        haitaSky: "#C3EBFA",
        haitaSkyLight: "#EDF9FD",
        haitaPurple: "#CFCEFF",
        haitaPurpleLight: "#F1F0FF",
        haitaYellow: "#FAE27C",
        haitaYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
