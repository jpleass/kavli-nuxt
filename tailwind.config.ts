/** @type {import('tailwindcss').Config} */

const lineHeight = 1.5

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
      },
    },
  },
}
