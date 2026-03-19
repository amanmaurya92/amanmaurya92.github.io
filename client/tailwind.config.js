/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1fb",
          100: "#ffe0f7",
          200: "#ffc1ea",
          300: "#ff86d8",
          400: "#ff4cc9",
          500: "#ff1fbf",
          600: "#e300a7",
          700: "#b1007d",
          800: "#84005e",
          900: "#4a0034",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "DM Sans",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Outfit", "DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgb(var(--grid) / 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--grid) / 0.09) 1px, transparent 1px)",
        "glow-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(var(--glow) / 0.28), transparent)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
