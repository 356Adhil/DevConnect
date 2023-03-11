/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#122332",
        secondary: '#F0D39F',
        'secondary-200' :'#CFA965'
      }
    },
  },
  plugins: [],
}
