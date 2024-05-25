import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // this tells PurgeCSS to not remove classes that match the following patterns
    {
      pattern:
        /(bg|text)-(gray|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
    {
      pattern:
        /(bg|text)-(blue|red|green|brown|orange|purple|indigo|yellow)(|-(light))/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
  ],
  theme: {
    extend: {
      colors: {
        black: "#111",
        white: "#fff",
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        blue: {
          DEFAULT: "#006ADC",
          light: "#E6EDFE",
        },
        red: {
          DEFAULT: "#CA3A3A",
          light: "#FFF6F6",
        },
        green: {
          DEFAULT: "#30A46C",
          light: "#DDF3E4",
        },
        brown: {
          DEFAULT: "#AD7F58",
          light: "#F4E9DD",
        },
        orange: {
          DEFAULT: "#F59E00",
          light: "#FEFAF2",
        },
        purple: {
          DEFAULT: "#8E4EC6",
          light: "#F3E7FC",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        indigo: {
          DEFAULT: "#6888F6",
          light: "#EDEBFF",
        },
        yellow: {
          DEFAULT: "#F0C000",
          light: "#FFFBD1",
        },
      },
    },
  },
  plugins: [],
};
export default config;
