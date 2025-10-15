/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd366e',
          50: '#fff1f3',
          100: '#ffe1e8',
          200: '#ffc7d6',
          300: '#ff9fb5',
          400: '#ff6d8f',
          500: '#fd366e',
          600: '#ed1556',
          700: '#c70d47',
          800: '#a50f42',
          900: '#8b113d',
          950: '#4d031d',
        },
        secondary: {
          DEFAULT: '#fd366e',
          50: '#fff1f3',
          100: '#ffe1e8',
          200: '#ffc7d6',
          300: '#ff9fb5',
          400: '#ff6d8f',
          500: '#fd366e',
          600: '#ed1556',
          700: '#c70d47',
          800: '#a50f42',
          900: '#8b113d',
        },
        accent: {
          DEFAULT: '#fd5c8d',
          50: '#fff1f4',
          100: '#ffe3eb',
          200: '#ffccd9',
          300: '#ffa3ba',
          400: '#ff6d8f',
          500: '#fd5c8d',
          600: '#ed2663',
          700: '#cc1749',
          800: '#a91641',
          900: '#8e173c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(253, 54, 110, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(253, 54, 110, 0.8)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
