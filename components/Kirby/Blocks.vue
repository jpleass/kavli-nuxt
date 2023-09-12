<script setup lang="ts">
import {
  LazyKirbyBlockExpand,
  LazyKirbyBlockGallery,
  LazyKirbyBlockGap,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
} from '#components'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
  noGaps?: boolean
  rounded?: boolean
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  gap: LazyKirbyBlockGap,
  line: LazyKirbyBlockLine,
  gallery: LazyKirbyBlockGallery,
  expand: LazyKirbyBlockExpand,
}

const getComponent = (type: string) => {
  return blockComponents[type] as Component
}
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <div
        :class="{
          'mb-em': !noGaps,
        }"
      >
        <component :is="getComponent(block.type)" :block="block" />
      </div>
    </template>
  </div>
</template>
