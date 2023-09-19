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
    class="p-gap rounded-lg border-2 border-white flex flex-col justify-between"
    :style="{
      backgroundColor: calcStyle,
    }"
  >
    <div>
      <h6 class="font-bold" v-html="heading"></h6>
      <span class="italic" v-html="subheading"></span>
    </div>
    <div>
      <div class="mb-gap-2">
        <div router-links class="body-text" v-html="text" />
      </div>
      <KirbyBlocks :gap-class="'mb-em-half'" :blocks="links" />
    </div>
  </div>
</template>
