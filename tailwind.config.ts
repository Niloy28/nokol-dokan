import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        darkTheme: {
          primary: "#e700ff",
          secondary: "#00a7ff",
          accent: "#008998",
          neutral: "#0d1914",
          "base-100": "#212e33",
          info: "#00e7ff",
          success: "#00d263",
          warning: "#fd9000",
          error: "#ff0054",
        },
      },
      {
        lightTheme: {
          primary: "#c700ff",
          secondary: "#00c400",
          accent: "#008cff",
          neutral: "#0f1d04",
          "base-100": "#fcfcfc",
          info: "#0084ac",
          success: "#00c290",
          warning: "#c90000",
          error: "#d5003c",
        },
      },
    ],
  },
};
export default config;
