/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Preflight off: the existing Theoria stylesheet was designed against
  // browser defaults, so this guarantees zero visual change.
  corePlugins: { preflight: false },
  theme: {
    // Same breakpoints as the mockup (max 1020px / max 640px)
    screens: { sm: '641px', md: '768px', lg: '1021px', xl: '1280px' },
    extend: {
      colors: {
        navy: { DEFAULT: '#060C29', 2: '#0D1740', 3: '#16245C' },
        brand: { blue: '#9DBEFF', purple: '#B68AF6', 'blue-d': '#5B7CF0', 'purple-d': '#7C4DDB' },
        ivory: '#F6F8FF',
        tint: '#EEF2FF',
        ink: '#101B38',
        muted: '#5D6785',
        line: '#E1E6F3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        grad: 'linear-gradient(120deg,#9DBEFF,#B68AF6)',
      },
      boxShadow: {
        card: '0 18px 50px -18px rgba(6,12,41,.28)',
      },
    },
  },
  plugins: [],
}