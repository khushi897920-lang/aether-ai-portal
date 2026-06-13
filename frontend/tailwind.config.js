/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary dark void background for sidebar and left panel
        void: {
          950: '#060911',
          900: '#03050a',
          800: '#090d16',
          700: '#1e293b',
        },
        // Interactive forest green elements
        forest: {
          900: '#022c22', // Hover state
          800: '#054432', // Main interactive forest green
          700: '#065f46', // Dark accent green
          600: '#0f5132',
        },
        // Semantic active green pills
        mint: {
          100: '#d1fae5', // Active pill background
          800: '#065f46', // Active pill text
        },
        // Light application canvas base
        canvas: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
        }
      },
      fontFamily: {
        // Elegant serif family for corporate editorial headings
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        // Clean sans-serif for UI labels
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Clean, tight, geometric display family for carved headers
        display: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Sharp monospaced font family for technical indicators
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
