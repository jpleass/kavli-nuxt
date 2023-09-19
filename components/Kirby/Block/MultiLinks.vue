<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'

export type Multilinks = {
  links: string // JSON
}

const props = defineProps<{
  block: KirbyBlock<'multilinks', Multilinks>
}>()

const blocks = JSON.parse(props.block.content.links) as KirbyBlock[]
// Split the blocks into two columns
const midPoint = Math.ceil(blocks.length / 2)
const leftColBlocks = blocks.slice(0, midPoint)
const rightColBlocks = blocks.slice(midPoint)
</script>

<template>
  <div class="grid sm:grid-cols-2 grid-cols-1 grid-gap-gap">
    <div class="mb-em-half">
      <KirbyBlocks :gap-class="'mb-em-half'" :blocks="leftColBlocks" />
    </div>
    <KirbyBlocks :gap-class="'mb-em-half'" :blocks="rightColBlocks" />
  </div>
</template>
