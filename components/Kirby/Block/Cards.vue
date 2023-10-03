<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { CardBlock } from './Card.vue'

type Cards = {
  columns: '1' | '2' | '3' | undefined
  blocks: string //JSON
} // TODO: Better naming convention here.

const props = defineProps<{
  block: KirbyBlock<'expand', Cards>
}>()

const blocks = JSON.parse(props.block.content.blocks) as KirbyBlock<
  'card',
  CardBlock
>[]

const cols = computed(() => {
  switch (props.block.content.columns) {
    case '1':
      return 'grid-cols-1'
    case '2':
      return 'grid-cols-2'
    case '3':
      return 'grid-cols-3'
    default:
      return ''
  }
})
</script>

<template>
  <div class="grid gap-gap-2 mb-gap-2" :class="cols">
    <KirbyBlockCard v-for="card in blocks" :key="card.id" :block="card" />
  </div>
</template>
