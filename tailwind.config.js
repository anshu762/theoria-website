/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theoria brand (sampled from the logo)
        navy: { DEFAULT: '#06194A', 700: '#13296A', 800: '#0C2058', 900: '#040F33' },
        brand: {
          blue: '#9FBDFF',        // book left page
          'blue-light': '#C7D8FF',
          purple: '#B88BF7',      // book right page
          'purple-dark': '#6B3FD0', // readable on white (text, active states)
        },
        // Legacy alias: older components use "gold-*" class names.
        // They now resolve to Theoria colours, so nothing breaks.
        gold: { DEFAULT: '#9FBDFF', light: '#C7D8FF', dark: '#6B3FD0' },
        paper: '#F3F6FF',
        ink: '#1B2748',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        fadeIn: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        fadeIn: 'fadeIn .35s ease both',
      },
    },
  },
  plugins: [],
};