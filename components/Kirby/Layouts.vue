<script setup lang="ts">
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
  noGaps?: boolean
  rounded?: boolean
}>()

const getCols = (width: string) => {
  switch (width) {
    case '1/1':
      return 'md:col-span-2 col-span-1'
    case '1/2':
      return 'col-span-1'
    default:
      return 'md:col-span-2 col-span-1'
  }
}
</script>

<template>
  <div
    v-for="layout in layouts"
    :id="layout.id"
    :key="layout.id"
    class="grid grid-cols-1 md:gap-gap-2 md:grid-cols-2"
    :class="{
      'items-end': layout.attrs.align && layout.attrs.align === 'bottom',
      'items-center': layout.attrs.align && layout.attrs.align === 'center',
    }"
  >
    <div
      v-for="(column, index) in layout.columns"
      :key="index"
      :class="getCols(column.width)"
    >
      <KirbyBlocks
        :blocks="column.blocks"
        :no-gaps="noGaps"
        :rounded="rounded"
      />
    </div>
  </div>
</template>
