<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'quote'>
}>()
</script>

<template>
  <blockquote>
    <h4 class="italic font-light" v-html="block.content.text" />
  </blockquote>
</template>
