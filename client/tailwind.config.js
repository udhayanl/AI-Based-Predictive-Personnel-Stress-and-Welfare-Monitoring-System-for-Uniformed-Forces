/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crpf: {
          navy: '#0b1d3a',
          dark: '#071224',
          subtle: '#162846',
          accent: '#1e40af',
          gold: '#d97706',
          emerald: '#059669',
          crimson: '#dc2626',
          shield: '#2563eb'
        },
        welfare: {
          stable: '#10b981',
          monitor: '#f59e0b',
          elevated: '#f97316',
          critical: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Instrument Serif"', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
