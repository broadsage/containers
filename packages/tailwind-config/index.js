/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd366e',
          50: '#fff1f4',
          100: '#ffe3ea',
          200: '#ffc7d6',
          300: '#ff9bb3',
          400: '#ff5e8a',
          500: '#fd366e',
          600: '#ea1350',
          700: '#c70a42',
          800: '#a50c3d',
          900: '#8b0f38',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
