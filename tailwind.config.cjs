/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      // heading: [],
      body: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        prim: {
          200: '#4496b5',
          300: '#2c89ac',
          400: '#157ca3',
          500: '#116382',
          600: '#0d4a62',
        },
        // sec: '#818fff',
        txt: {
          dark: '#212529',
          light: '#666',
        },
      },
    },
  },
  plugins: [],
};
