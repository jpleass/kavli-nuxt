<script setup lang="ts">
import { Vue3SlideUpDown } from 'vue3-slide-up-down'
import { mapClamped } from '~/composables/math'

const router = useRouter()
const site = useSite()
const headerStore = useHeader()
const translate = ref(0)

let lastScrollY = 0
const threshold = 1
const handleScroll = () => {
  if (window.scrollY < threshold) {
    setHeader({
      isHidden: false,
      isAboveThreshold: true,
    })
  } else {
    setHeader({
      isHidden: true,
      isAboveThreshold: false,
    })
  }
  const currentScrollY = window.scrollY
  if (window.scrollY > threshold) {
    setHeader({
      isHidden: currentScrollY > lastScrollY,
    })
  }
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
    class="fixed top-0 left-0 w-full px-gap py-2 z-50 overflow-x-hidden md:h-[100px]"
    :style="{
      transition: headerStore.isAboveThreshold
        ? 'background-color 300ms ease'
        : 'transform 350ms ease, background-color 200ms ease',
      transform: headerStore.isAboveThreshold
        ? `translateY(${translate}px)`
        : undefined,
    }"
    :class="{
      'bg-white shadow-md':
        !headerStore.isHidden && !headerStore.isAboveThreshold && !isActive,
      'delay-300 duration-300': !isActive && headerStore.isAboveThreshold,
      'bg-kavli-peach shadow-md': isActive,
      '-translate-y-[100px]':
        !headerStore.isAboveThreshold && headerStore.isHidden,
    }"
  >
    <div class="flex flex-row w-full items-center">
      <div class="flex w-full justify-between">
        <NuxtLink class="link h-full" to="/">
          <div class="flex items-center gap-4 relative">
            <div class="transition-all duration-300 lg:w-[9em] w-[5.5em]">
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
            class="lowercase font-bold link text-[1.7em]"
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
$hamburger-layer-width: 32px;
$hamburger-layer-height: 2px;
$hamburger-layer-spacing: 6px;
$hamburger-layer-spacing: 6px;
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
