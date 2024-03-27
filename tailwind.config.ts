import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
export default config;
