import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Основные цвета бренда
        ivory: {
          50: '#fefffe',
          100: '#fdfcfa', 
          200: '#faf8f4',
          300: '#f6f3eb',
          400: '#f0ede2',
          500: '#e8e4d6', // Слоновая кость
          600: '#d4cfc0',
          700: '#b8b3a2',
          800: '#9c9784',
          900: '#7d7968',
        },
        sage: {
          50: '#f6f8f6',
          100: '#edf2ed',
          200: '#d9e4d9',
          300: '#b8ceb8',
          400: '#8db28d',
          500: '#6b9a6b', // Основной зеленый
          600: '#5a855a',
          700: '#4a6f4a',
          800: '#3d5a3d',
          900: '#344a34',
        },
        poppy: {
          50: '#fef7ed',
          100: '#fdecd4',
          200: '#fad5a8',
          300: '#f6b571',
          400: '#f18a38',
          500: '#ed6c17', // Оранжевый мак
          600: '#de530d',
          700: '#b83e0e',
          800: '#943413',
          900: '#782c13',
        },
        // Переопределяем primary и secondary
        primary: "rgb(107, 154, 107)", // sage-500
        secondary: "rgb(156, 151, 132)", // ivory-800
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '3000': '3000px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require('@tailwindcss/line-clamp'),
    addVariablesForColors
  ],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
