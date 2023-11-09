<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { CardBlock } from './Card.vue'

type Cards = {
  columns: '1' | '2' | '3' | undefined
  blocks: string // JSON
}

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
      return 'md:grid-cols-1 grid-cols-1'
    case '2':
      return 'md:grid-cols-2 grid-cols-1'
    case '3':
      return 'md:grid-cols-2 lg:grid-cols-2 grid-cols-1'
    default:
      return ''
  }
})
</script>

<template>
  <div class="grid md:gap-gap-2 gap-gap mb-gap-2" :class="cols">
    <KirbyBlockCard v-for="card in blocks" :key="card.id" :block="card" />
  </div>
</template>
