export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.directive('reveal', {
    created(el) {
      el.style.opacity = '0'
      el.style.transition = 'all 0 ease-in-out'
    },

    async mounted(el) {
      const distanceFromTop = el.getBoundingClientRect().top
      const delay = distanceFromTop * 0.5 + 150

      await new Promise((resolve) => setTimeout(resolve, delay))
      el.style.transition = 'opacity 500ms ease-in-out'

      el.style.opacity = '1'
    },

    beforeUnmount(el) {},
  })
})
