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
        deep: theme.colors.primaryDeep,
        gold: theme.colors.gold,
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
          DEFAULT: theme.colors.surface,
          foreground: theme.colors.dark,
        },
        popover: {
          DEFAULT: theme.colors.background,
          foreground: theme.colors.dark,
        },
        muted: {
          DEFAULT: theme.colors.secondary,
          foreground: theme.colors.muted,
        },
        accent: {
          DEFAULT: theme.colors.gold,
          foreground: theme.colors.primaryDeep,
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: theme.colors.border,
        input: theme.colors.border,
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
