<script setup lang="ts">
import type { KirbyHomePageResponse } from '~/queries'
import { getHomePageQuery } from '~/queries'
import { type KirbyEventPagePreviewData } from '~/queries/events'
import { checkIfEventPageIsOver } from '~/composables/events'

const query = getHomePageQuery()
const { data } = await useKql<KirbyHomePageResponse>(query)

const page = data.value?.result
setPage(page)

const body = ref<HTMLElement | null>(null)
const bodyInView = ref(false)
const hideTopSection = ref(false)
const onScroll = () => {
  hideTopSection.value = window.scrollY > window.innerHeight
  if (body.value) {
    const pastTop = window.scrollY > body.value.offsetTop
    const aboveBottom =
      window.scrollY + window.innerHeight <
      body.value.offsetTop + body.value.offsetHeight
    bodyInView.value = pastTop && aboveBottom
  }
}

const promotedEvent = ref<KirbyEventPagePreviewData | null | undefined>(
  page?.promotedEvent,
)

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="h-auto">
    <!-- Background -->
    <div class="block w-full h-screen fixed top-0 left-0 bg-[#6CE746]">
      <!-- <div class="w-full h-full absolute top-0 left-0">
        <img
          src="https://media.macphun.com/img/uploads/macphun/blog/2063/_1.jpeg?q=75&w=1710&h=906&resize=cover"
          class="w-full h-full object-cover"
        />
      </div> -->
      <AppCanvasVideo
        v-reveal
        class="relative z-10 -scale-x-100"
        :play-video="!bodyInView"
        :color="{
          red: 243,
          green: 177,
          blue: 129,
        }"
      />
      <!-- <ClientOnly>
        <Vue3Lottie
          :animation-link="'https://lottie.host/c31ddb92-a7e7-4d69-95dc-d221db1bd6fd/hBsqedAden.json'"
        /> 
      </ClientOnly> -->
    </div>

    <!-- Top -->
    <div
      class="w-full h-[90vh] flex items-center sticky top-0 z-10"
      :class="{
        'opacity-0 pointer-events-none': hideTopSection,
      }"
    >
      <AppPageWrapper v-if="page" class="-mt-16 w-full">
        <h2 class="max-w-[12em] leading-[1.1]" v-html="page.heading" />
      </AppPageWrapper>
    </div>

    <ClientOnly>
      <div
        v-if="promotedEvent && !checkIfEventPageIsOver(promotedEvent)"
        class="z-20 right-gap-2 hidden md:block absolute -translate-y-full"
      >
        <div class="pb-gap-2">
          <NuxtLink :to="`/${promotedEvent.id}`">
            <AppCardsEventCardCompact v-bind="promotedEvent" />
          </NuxtLink>
        </div>
      </div>
    </ClientOnly>

    <!-- Body -->
    <div ref="body" class="bg-kavli-bg w-full relative z-10">
      <AppPageWrapper v-if="page" class="lg:pt-gap pt-0">
        <KirbyLayouts
          v-if="page && page.layouts"
          :layouts="page.layouts ?? []"
        />
      </AppPageWrapper>
    </div>

    <!-- Bottom -->
    <AppPageWrapper v-if="page" class="lg:pt-gap pt-0 relative z-10">
      <KirbyLayouts
        v-if="page && page.bottomLayout"
        :layouts="page.bottomLayout ?? []"
      />
    </AppPageWrapper>
  </div>
</template>
