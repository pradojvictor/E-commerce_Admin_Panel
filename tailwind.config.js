/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        colorOne:'#e8d18e',
        colorTwo:'#bab195',
        colorThree:'#626970',
        colorFour:'#2f2f4d',
        colorFive:'#11091a',
        redOne: '#ee7958',
      },
    },
  },
  plugins: [],
}
