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
      },
      colors: {
        black: 'rgba(32, 32, 32, 1)',
        'kavli-blue': 'rgba(225, 230, 242, 1)',
      },
    },
  },
}
