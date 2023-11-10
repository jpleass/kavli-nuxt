export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.directive('reveal', {
    created(el) {
      el.style.opacity = '0'
    },

    async mounted(el) {
      const duration = 350
      const existingTransition = el.style.transition
      const distanceFromTop = el.getBoundingClientRect().top
      const delay = distanceFromTop * 0.5

      await new Promise((resolve) => setTimeout(resolve, delay))
      el.style.transition = `opacity ${duration}ms ease-in-out`
      el.style.opacity = '1'
      await new Promise((resolve) => setTimeout(resolve, duration))
      el.style.transition = existingTransition
    },
  })
})
