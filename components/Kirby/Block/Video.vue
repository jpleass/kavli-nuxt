<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

type Video = {
  url: string
  caption?: string
  credits?: string
}

defineProps<{
  block: KirbyBlock<'video', Video>
}>()
</script>

<template>
  <figure>
    <MediaVideo :url="block.content.url" />
    <figcaption
      v-if="block.content.caption || block.content.credits"
      class="flex gap-2 mt-2"
    >
      <div
        v-if="block.content.caption"
        class="text-bluecity-grey-dark"
        v-html="block.content.caption"
      />
      <div
        v-if="block.content.credits"
        class="text-bluecity-grey-dark"
        v-html="block.content.credits"
      />
    </figcaption>
  </figure>
</template>
