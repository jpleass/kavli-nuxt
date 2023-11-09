<script setup lang="ts">
import { Vue3SlideUpDown } from 'vue3-slide-up-down'

const router = useRouter()
const site = useSite()

const isPartiallyHidden = ref(false)
const isAboveThreshold = ref(true)

let lastScrollY = 0
const threshold = 100
const handleScroll = () => {
  if (window.scrollY < threshold) {
    isPartiallyHidden.value = false
    isAboveThreshold.value = true
    return
  } else {
    isPartiallyHidden.value = true
    isAboveThreshold.value = false
  }
  const currentScrollY = window.scrollY
  isPartiallyHidden.value = currentScrollY > lastScrollY
  lastScrollY = currentScrollY
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
    class="fixed top-0 left-0 w-full px-gap py-2 z-50 transition-all duration-150 overflow-x-hidden"
    :class="{
      ' -translate-y-full': isPartiallyHidden,
      'bg-white shadow-md':
        !isPartiallyHidden && !isAboveThreshold && !isActive,
      'delay-300 duration-300': !isActive && isAboveThreshold,
      'bg-kavli-peach shadow-md': isActive,
    }"
  >
    <div class="flex flex-row w-full items-center">
      <div class="flex w-full justify-between">
        <NuxtLink class="link h-full" to="/">
          <div class="flex items-center gap-4 relative">
            <div class="transition-all duration-300 lg:w-[9em] w-[6.75em]">
              <SVGLogo />
            </div>
            <div
              class="font-bold leading-none w-[12em] absolute transition-all duration-300 hidden lg:block opacity-100 left-[calc(9em+1rem)]"
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

        <!-- Mobile button. -->
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
      </div>
    </div>

    <!-- Mobile -->

    <Vue3SlideUpDown v-model="isActive" :duration="300" :opacity-closed="0">
      <nav v-if="isActive" class="lg:hidden w-full">
        <div class="flex flex-col gap-gap mt-[15px] pb-gap">
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
    </Vue3SlideUpDown>
  </header>
</template>

<style lang="scss">
$hamburger-padding-x: 0px;
$hamburger-padding-y: 0px;
$hamburger-layer-width: 40px;
$hamburger-layer-height: 3px;
$hamburger-layer-spacing: 8px;
$hamburger-layer-spacing: 8px;
$hamburger-layer-border-radius: 0px;
$hamburger-hover-opacity: 1;
$hamburger-types: (squeeze);
$hamburger-layer-color: currentColor;

@import 'hamburgers/_sass/hamburgers/hamburgers.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
