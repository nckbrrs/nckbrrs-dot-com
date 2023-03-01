/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/defaultTheme')

const colors = {
  ...defaultColors,
  ...{
    primary: '#212121',
    background: '#fbf6f1',
    mtaRed: '#ee352e',
    mtaOrange: '#ff6319',
    mtaGreen: '#6cbe45',
    mtaGray: '#808183',
    mtaYellow: '#fccc0a',
    mtaBlue: '#0039a6',
    mtaBrown: '#996633',
    mtaPurple: '#b933ad',
  },
}

const fontFamilies = {
  'primary': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
}

const keyframes = {
  nounBubbleBackground: {
    '0%, 100%': { background: colors.mtaBlue},
    '10%, 13%': { background: colors.mtaOrange},
    '20%, 23%': { background: colors.mtaGreen},
    '30%, 33%': { background: colors.mtaGray},
    '40%, 43%': { background: colors.mtaYellow},
    '50%, 53%': { background: colors.mtaRed},
    '60%, 63%': { background: colors.mtaGreen},
    '70%, 73%': { background: colors.mtaGray},
    '80%, 83%': { background: colors.mtaBrown},
    '90%, 93%': { background: colors.mtaPurple},
  }
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: fontFamilies,
      keyframes: keyframes,
      animation: {
        nounBubbleBackground: 'nounBubbleBackground 10s linear infinite'
      }
    },
  },
  plugins: [],
}
