/** @type {import('tailwindcss').Config} */
import { theme } from './src/theme.js';

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: theme.colors.primary,
          foreground: theme.colors.secondary,
        },
        secondary: {
          DEFAULT: theme.colors.secondary,
          foreground: theme.colors.dark,
        },
        dark: {
          DEFAULT: theme.colors.dark,
          foreground: theme.colors.secondary,
        },
        background: theme.colors.background,
        foreground: theme.colors.dark,
        card: {
          DEFAULT: theme.colors.background,
          foreground: theme.colors.dark,
        },
        popover: {
          DEFAULT: theme.colors.background,
          foreground: theme.colors.dark,
        },
        muted: {
          DEFAULT: theme.colors.secondary,
          foreground: theme.colors.primary,
        },
        accent: {
          DEFAULT: theme.colors.secondary,
          foreground: theme.colors.primary,
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: theme.colors.secondary,
        input: theme.colors.secondary,
        ring: theme.colors.primary,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
