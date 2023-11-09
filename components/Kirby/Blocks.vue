<script setup lang="ts">
import {
  LazyKirbyBlockCard,
  LazyKirbyBlockCards,
  LazyKirbyBlockEvent,
  LazyKirbyBlockExpand,
  LazyKirbyBlockGap,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLargeCard,
  LazyKirbyBlockLine,
  LazyKirbyBlockLink,
  LazyKirbyBlockList,
  LazyKirbyBlockMultiLinks,
  LazyKirbyBlockNews,
  LazyKirbyBlockProgram,
  LazyKirbyBlockQuote,
  LazyKirbyBlockTestimonial,
  LazyKirbyBlockText,
  LazyKirbyBlockVideo,
} from '#components'
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  blocks: KirbyBlock<string>[]
  rounded?: boolean
  gapClass?: string
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  gap: LazyKirbyBlockGap,
  line: LazyKirbyBlockLine,
  link: LazyKirbyBlockLink,
  multilinks: LazyKirbyBlockMultiLinks,
  expand: LazyKirbyBlockExpand,
  'large-card': LazyKirbyBlockLargeCard,
  card: LazyKirbyBlockCard,
  video: LazyKirbyBlockVideo,
  cards: LazyKirbyBlockCards,
  testimonial: LazyKirbyBlockTestimonial,
  news: LazyKirbyBlockNews,
  program: LazyKirbyBlockProgram,
  event: LazyKirbyBlockEvent,
}

const doesComponentExist = (type: string) => {
  return Object.keys(blockComponents).includes(type)
}

const getComponent = (type: string) => {
  return blockComponents[type] as Component
}

const calcGapClass = computed(() => {
  if (props.gapClass) {
    return props.gapClass
  }
  return 'mb-gap'
})
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <div
        :class="{
          [calcGapClass]: index < blocks.length - 1,
        }"
      >
        <component
          :is="getComponent(block.type)"
          v-if="doesComponentExist(block.type)"
          :block="block"
        />
        <div v-else class="small border border-red-500 p-1">
          <span class="font-mono font-bold text-red-500">
            {{ block.type }} block
          </span>
          does not exist.
        </div>
      </div>
    </template>
  </div>
</template>
