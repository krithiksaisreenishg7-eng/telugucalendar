/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Indian palette - 2026 style
        primary: {
          50: '#fef5e7',
          100: '#fde6c0',
          200: '#fbd796',
          300: '#f9c86c',
          400: '#f7bc4d',
          500: '#f5b02e', // Vibrant saffron/gold
          600: '#e6a022',
          700: '#d48e15',
          800: '#c17c08',
          900: '#a56200',
        },
        accent: {
          50: '#fff0f0',
          100: '#ffd9d9',
          200: '#ffb3b3',
          300: '#ff8c8c',
          400: '#ff6b6b',
          500: '#ff4d4d', // Vibrant red
          600: '#e63939',
          700: '#cc2626',
          800: '#b31414',
          900: '#990000',
        },
        sacred: {
          50: '#fff5ed',
          100: '#ffe5cf',
          200: '#ffcca0',
          300: '#ffb270',
          400: '#ff9a4a',
          500: '#ff8124', // Sacred orange
          600: '#f56d0d',
          700: '#d95a00',
          800: '#bd4800',
          900: '#a13600',
        },
        divine: {
          50: '#f0f4ff',
          100: '#d9e3ff',
          200: '#b3c9ff',
          300: '#8caeff',
          400: '#6b96ff',
          500: '#4d7eff', // Divine blue
          600: '#2e64e6',
          700: '#1449cc',
          800: '#0030b3',
          900: '#001a99',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mandala': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
