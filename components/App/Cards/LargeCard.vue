<script lang="tsx" setup>
import type { CardProps } from '~/@types'

const props = defineProps<CardProps>()

const calcStyle = computed(() => {
  if (props.style === 'transparent') return 'transparent'
  else return 'white'
})
</script>

<template>
  <div
    class="p-gap rounded-xl md:grid-cols-4 grid-cols-1 grid gap-gap border-2 border-white min-h-[13em]"
    :style="{
      backgroundColor: calcStyle,
    }"
  >
    <div class="md:col-span-1 col-span-1">
      <h4 class="font-bold mb-1" v-html="heading"></h4>
      <h6 class="italic" v-html="subheading"></h6>
    </div>
    <div class="md:col-span-3 col-span-1 flex-col h-full justify-between flex">
      <div class="mb-gap-2">
        <div router-links class="body-text" v-html="text" />
      </div>
      <KirbyBlocks :gap-class="'mb-gap'" :blocks="links" />
    </div>
  </div>
</template>
