/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(160, 12%, 11%)",
        foreground: "hsl(150, 12%, 95%)",
        primary: {
          DEFAULT: "hsl(84, 82%, 56%)",
          foreground: "hsl(160, 20%, 10%)",
        },
        muted: {
          DEFAULT: "hsl(160, 12%, 18%)",
          foreground: "hsl(150, 6%, 62%)",
        },
        border: "hsl(160, 10%, 20%)",
        card: {
          DEFAULT: "hsl(160, 12%, 15%)",
          hover: "hsl(160, 12%, 18%)",
        },
        charcoal: {
          950: "#0e1311",
          900: "#141a18",
          800: "#1a221f",
          700: "#242e2a",
          600: "#323f3a",
        },
        lime: {
          DEFAULT: "#a3f32c",
          bright: "#b1ff33",
          dark: "#82c81e",
          glow: "rgba(163, 243, 44, 0.25)",
        }
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        widest: "0.14em",
      },
      lineHeight: {
        tighter: "0.92",
        tight: "0.98",
      },
      keyframes: {
        pulseLime: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.96)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      },
      animation: {
        'pulse-lime': 'pulseLime 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanline 8s linear infinite',
      }
    },
  },
  plugins: [],
}
