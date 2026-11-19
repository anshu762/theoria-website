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
        navy: { DEFAULT: '#123B37', 2: '#0F3330', 3: '#1B4B47' },
        brand: { blue: '#A9CBBF', purple: '#6FA89A', 'blue-d': '#2F6B66', 'purple-d': '#24605C' },
        ivory: '#F3F1E5',
        tint: '#E8E5D2',
        ink: '#133B3A',
        muted: '#4D6967',
        line: '#DAD6C0',
      },
      fontFamily: {
        display: ['"DM Sans"'],
        sans: ['"DM Sans"'],
      },
      backgroundImage: {
        grad: 'linear-gradient(120deg,#018a86,#018a86)',
      },
      boxShadow: {
        card: '0 18px 50px -18px rgba(18,59,55,.28)',
      },
    },
  },
  plugins: [],
}