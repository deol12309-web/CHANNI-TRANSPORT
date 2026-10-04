/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#FAF7F2',
          dark: '#100F0D',
        },
        fg: {
          light: '#141210',
          dark: '#F4EFE6',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B16A',
          dark: '#B8923F',
          muted: 'rgba(201, 169, 110, 0.15)',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1B1915',
        },
        line: {
          light: '#E6DFD2',
          dark: '#2D2921',
        },
        muted: {
          light: '#6B6458',
          dark: '#A39B8B',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', '"Noto Sans Devanagari"', '"Noto Sans Gurmukhi"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
