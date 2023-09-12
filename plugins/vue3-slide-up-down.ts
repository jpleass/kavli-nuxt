import { Vue3SlideUpDown } from 'vue3-slide-up-down'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp
  vueApp.use(Vue3SlideUpDown as any)
})
