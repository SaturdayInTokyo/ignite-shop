/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        gray900: '#121214',
        gray800: '#202024',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e'
      },
      fontFamily: {
        roboto:['var(--font-roboto)']
      },
      fontSize:{
        'ignite-md':'1.125rem',
        'ignite-lg':'1.25rem',
        'ignite-xl':'1.5rem',
        'ignite-2xl':'2rem'
      }
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
  ],
}
