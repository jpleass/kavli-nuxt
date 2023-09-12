<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'

type Gallery = {
  gallery: string // JSON string.
  'columns-sm': number
  'columns-md': number
  'columns-lg': number
  'columns-xl': number
}
const props = defineProps<{
  block: KirbyBlock<'carousel', Gallery>
}>()

const gallery = JSON.parse(props.block.content.gallery) as KirbyBlock<'image'>[]
const columns = computed(() => ({
  sm: props.block.content['columns-sm'] || 1,
  md: props.block.content['columns-md'] || 2,
  lg: props.block.content['columns-lg'] || 3,
  xl: props.block.content['columns-xl'] || 4,
}))

const columnsClasses = computed(() => {
  const classes = []
  if (columns.value.sm) classes.push(`grid-cols-${columns.value.sm}`)
  else classes.push('sm:grid-cols-1')

  if (columns.value.md) classes.push(`md:grid-cols-${columns.value.md}`)
  else classes.push('md:grid-cols-2')

  if (columns.value.lg) classes.push(`lg:grid-cols-${columns.value.lg}`)
  else classes.push('lg:grid-cols-4')

  if (columns.value.xl) classes.push(`xl:grid-cols-${columns.value.xl}`)
  else classes.push('xl:grid-cols-5')
  return classes.join(' ')
})
</script>

<template>
  <div class="grid gap-8" :class="columnsClasses">
    <KirbyBlockImage v-for="image in gallery" :key="image.id" :block="image" />
  </div>
</template>
