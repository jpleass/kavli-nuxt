<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'

export type Program = {
  program: {
    time: string
    text: string
  }[]
}

const props = defineProps<{
  block: KirbyBlock<'program', Program>
}>()
</script>

<template>
  <div class="bg-white rounded p-gap flex flex-col gap-gap">
    <div
      v-for="(entry, index) in props.block.content.program"
      :key="index"
      class="grid sm:grid-cols-6 grid-cols-1"
    >
      <div class="font-bold pr-em mb-1" v-html="entry.time" />
      <div class="col-span-5 border-l pl-em" v-html="entry.text" />
    </div>
  </div>
</template>
