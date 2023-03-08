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

const fontFamily = {
  'sans': ["Helvetica Neue", "ui-sans-serif", "system-ui", "-apple-system", "Arial", "sans-serif"]
}

const letterSpacing = {
  tightest: '-.075em',
  tighter: '-.05em',
  tight: '-.025em',
  tightish: '-0.01em',
  normal: '0',
  wide: '.025em',
  wider: '.05em',
  widest: '.1em',
}

const height = {
  screen:'calc(var(--vh) * 100)',
}

const minHeight = {
  screen: 'calc(var(--vh) * 100)'
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      letterSpacing,
      height,
      minHeight
    },
  },
  plugins: []
}
