<script setup lang="ts">
import {
  LazyKirbyBlockExpand,
  LazyKirbyBlockGap,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockLink,
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
  link: LazyKirbyBlockLink,
  expand: LazyKirbyBlockExpand,
}

const doesComponentExist = (type: string) => {
  return Object.keys(blockComponents).includes(type)
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
          'mb-gap': !noGaps,
        }"
      >
        <component
          :is="getComponent(block.type)"
          v-if="doesComponentExist(block.type)"
          :block="block"
        />
        <div v-else class="small border border-red-500 p-1">
          <span class="font-mono font-bold text-red-500"
            >{{ block.type }} block</span
          >
          does not exist.
        </div>
      </div>
    </template>
  </div>
</template>
