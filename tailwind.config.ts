/** @type {import('tailwindcss').Config} */
import Color from 'color'

const lineHeight = 1.4

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Helvetica', 'sans-serif'],
        symbols: ['Material Symbols Rounded'],
      },
      lineHeight: {
        default: lineHeight,
      },
      spacing: {
        linebreak: `calc(1em * ${lineHeight})`,
        em: '1em',
        'em-half': '0.5em',
        'em-2': '2em',
        gap: '1.25em',
        'gap-2': '2.5em',
      },
      colors: {
        black: 'rgba(33, 34, 39, 1)',
        'kavli-bg': 'rgba(225, 230, 242, 1)',
        'kavli-blue': 'rgba(15, 98, 254, 1)',
        'kavli-peach': '#FFBD8D',
        'kavli-peach-dark': Color('#FFBD8D').darken(0.1).hex(),
      },
      animation: {
        'horizontal-bounce': 'horizontal-bounce 0.5s ease-in-out',
      },
      keyframes: {
        'horizontal-bounce': {
          '0%, 100%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0.25em) ',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
}
