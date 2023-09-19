<script lang="tsx" setup>
import type { KirbyBlock, KirbyLayout } from '#nuxt-kql'

import { Vue3SlideUpDown } from 'vue3-slide-up-down'

type Expand = {
  title: string
  layout: string // JSON
}

const props = defineProps<{
  block: KirbyBlock<'expand', Expand>
}>()

const layout = JSON.parse(props.block.content.layout) as KirbyLayout[]

const open = ref(false)
const onClick = () => {
  open.value = !open.value
}
</script>

<template>
  <div>
    <!-- Visible -->

    <div
      class="flex gap-4 items-center mb-2 transition-opacity duration-100 cursor-pointer md:hover:opacity-50"
      @click="onClick"
    >
      <div>Little arrow</div>
      <h5 v-html="block.content.title"></h5>
    </div>

    <!-- Hidden -->
    <Vue3SlideUpDown v-model="open" :duration="300" :opacity-closed="0">
      <div class="">
        <KirbyLayouts :layouts="layout" />
      </div>
    </Vue3SlideUpDown>
    <div class="mb-8">
      <hr class="border-white" />
    </div>
  </div>
</template>
