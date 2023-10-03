<script lang="tsx" setup>
import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

import { Vue3SlideUpDown } from 'vue3-slide-up-down'

const props = defineProps<{
  block: KirbyBlock<'expand'>
}>()

const layout = JSON.parse(props.block.content.layout) as KirbyLayout[]

const open = ref(false)
const onClick = () => {
  open.value = !open.value
}

const previousBlock = usePreviousBlock(props.block.id)
const isPreviousExpand = computed(() => {
  if (previousBlock) {
    return previousBlock.type === 'expand'
  } else {
    return false
  }
})
</script>

<template>
  <div
    :class="{
      '-mt-gap': isPreviousExpand,
    }"
  >
    <!-- Visible -->

    <div
      class="flex gap-4 items-center py-em transition-opacity duration-100 cursor-pointer group"
      @click="onClick"
    >
      <UILinkArrow
        class="bg-white text-black trasntiion-transform duration-300"
        :class="{
          'rotate-90': !open,
          '-rotate-90': open,
        }"
      />

      <h5 class="font-bold" v-html="block.content.title"></h5>
    </div>

    <!-- Hidden -->
    <Vue3SlideUpDown v-model="open" :duration="300" :opacity-closed="0">
      <div class="">
        <KirbyLayouts :layouts="layout" />
      </div>
    </Vue3SlideUpDown>

    <hr class="border-white" />
  </div>
</template>
