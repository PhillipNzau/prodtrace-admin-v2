/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkGreen: '#004637',
        lightGreen: '#00dd93',
        paleGreen: '#bbf7d7',
        darkOrange: '#f0ab1f',
        darkGray: '#8a8a93',
        lightGray: '#f3f3f3',
        bgPrimary: '#fffbeb',
      }
    },
  },
  plugins: [require('daisyui')],
  tailwindConfig: './styles/tailwind.config.js',
}
