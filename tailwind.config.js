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
  'primary': ["Helvetica Neue", "ui-sans-serif","system-ui","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Arial","Noto Sans","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"]
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

const animation = {
  nounBubbleBackground: 'nounBubbleBackground 10s ease-in-out infinite'
}

const spacing = {
  '128': '32rem'
}

const height = {
  screen:'calc(var(--vh) * 100)',
}

const minHeight = {
  screen: 'calc(var(--vh) * 100)'
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

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      keyframes,
      animation,
      spacing,
      letterSpacing,
      height,
      minHeight
    },
  },
  plugins: []
}
