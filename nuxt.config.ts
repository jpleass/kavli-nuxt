import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  alias: {
    types: '/types',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  kql: {
    auth: 'bearer',
    prefetch: {
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
    // Optionally, cache the queries on the server for an hour
    server: {
      // cache: true,
      // maxAge: 60 * 60,
    },
  },

  nitro: {
    prerender: {
      // Prerender the index page
      routes: [],
    },
  },

  devServer: {
    host: '0.0.0.0',
  },

  experimental: {
    typescriptBundlerResolution: true,
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['@/assets/css/main.css'],

  typescript: {
    // Recommended: type check on build
    // typeCheck: 'build',
    shim: false,
  },
})
