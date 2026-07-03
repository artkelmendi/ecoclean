import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EAF2FE",
          100: "#D5E5FD",
          200: "#A9CBFB",
          300: "#7DB0F9",
          400: "#5296F7",
          500: "#297BF5",
          600: "#0F62E0",
          700: "#0C4EB3",
          800: "#093B86",
          900: "#062A61",
        },
        ink: {
          DEFAULT: "#0B1526",
          soft: "#3D4A5F",
          faint: "#8B96A7",
        },
        paper: "#FFFFFF",
        mist: "#F4F7FB",
        sector: {
          orange: "#F5A24B",
          cyan: "#29C4F5",
          green: "#6DBE6A",
          grey: "#9AA1A9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
