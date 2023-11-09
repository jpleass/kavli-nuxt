<script setup lang="ts">
const router = useRouter()
const site = useSite()

const isPartiallyHidden = ref(false)

// const lastScrollY = 0
const handleScroll = () => {
  if (window.scrollY < 30) {
    isPartiallyHidden.value = false
    return
  } else {
    isPartiallyHidden.value = true
  }
  // const currentScrollY = window.scrollY
  // isPartiallyHidden.value = currentScrollY > lastScrollY
  // lastScrollY = currentScrollY
}
const isActive = ref(false)
const onMenuClick = () => (isActive.value = !isActive.value)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => {
    return router.currentRoute.value
  },
  () => {
    isActive.value = false
  },
)
</script>

<template>
  <header
    class="fixed top-0 left-0 flex w-full items-center justify-between mb-gap-2 px-gap py-2 z-50 transition-all duration-150 overflow-x-hidden"
    :class="{
      'bg-white shadow-md': isPartiallyHidden,
      'bg-transparent shadow-none': !isPartiallyHidden,
    }"
  >
    <NuxtLink class="link h-full" to="/">
      <div class="flex items-center gap-4 relative">
        <div
          class="transition-all duration-300"
          :class="{
            'lg:w-[5em] w-[4em]': isPartiallyHidden,
            'lg:w-[9em] w-[4em]': !isPartiallyHidden,
          }"
        >
          <SVGLogo />
        </div>
        <div
          class="font-bold leading-none w-[12em] absolute transition-all duration-300 hidden lg:block"
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

    <!-- Desktop -->
    <nav class="hidden lg:flex md:gap-em-2 gap-gap items-center">
      <nuxt-link
        v-for="page in site.navigationPages"
        :key="page.id"
        class="lowercase font-bold link"
        :to="`/${page.uri}`"
      >
        {{ page.title }}
      </nuxt-link>
    </nav>

    <!-- Mobile -->
    <Transition name="fade">
      <nav
        v-if="isActive"
        class="lg:hidden fixed top-0 left-0 bg-kavli-peach w-full h-full"
      >
        <div class="flex flex-col gap-gap p-gap mt-[15px]">
          <nuxt-link
            v-for="page in site.navigationPages"
            :key="page.id"
            class="lowercase font-bold link h4"
            :to="`/${page.uri}`"
          >
            {{ page.title }}
          </nuxt-link>
        </div>
      </nav>
    </Transition>

    <div class="flex lg:hidden items-center">
      <button
        class="flex pointer-events-auto hamburger hamburger--squeeze"
        :class="{ 'is-active': isActive }"
        type="button"
        aria-label="Menu"
        @click="onMenuClick"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </header>
</template>

<style lang="scss">
@import 'hamburgers/_sass/hamburgers/hamburgers.scss';
$hamburger-padding-x: 0px;
$hamburger-padding-y: 0px;
$hamburger-layer-width: 40px;
$hamburger-layer-height: 2px;
$hamburger-layer-spacing: 8px;
$hamburger-layer-spacing: 8px;
$hamburger-layer-border-radius: 0px;
$hamburger-hover-opacity: 1;
$hamburger-types: (squeeze);
$hamburger-layer-color: currentColor;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
