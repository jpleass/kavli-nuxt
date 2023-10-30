<script setup lang="ts">
const site = useSite()

const isPartiallyHidden = ref(false)

let lastScrollY = 0
const handleScroll = () => {
  if (window.scrollY < 50) {
    isPartiallyHidden.value = false
    return
  }
  const currentScrollY = window.scrollY
  isPartiallyHidden.value = currentScrollY > lastScrollY
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 flex w-full justify-between mb-gap-2 px-gap py-2 z-10"
  >
    <NuxtLink class="link" to="/">
      <div class="flex items-center gap-4 relative">
        <div
          class="transition-all duration-300"
          :class="{
            'w-[5em]': isPartiallyHidden,
            'w-[9em]': !isPartiallyHidden,
          }"
        >
          <SVGLogo />
        </div>
        <div
          class="font-bold leading-none w-[12em] absolute transition-all duration-300"
          :class="{
            'opacity-0 left-[calc(5em+1rem)]': isPartiallyHidden,
            'opacity-100 left-[calc(9em+1rem)]': !isPartiallyHidden,
          }"
        >
          institue of <br />
          nanoscience delft
        </div>
      </div>
    </NuxtLink>

    <nav class="flex md:gap-gap-2 gap-gap items-center">
      <nuxt-link
        v-for="page in site.navigationPages"
        :key="page.id"
        class="lowercase font-bold link"
        :to="`/${page.uri}`"
      >
        {{ page.title }}
      </nuxt-link>
    </nav>
  </header>
</template>
