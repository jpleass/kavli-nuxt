<script lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
type Gap = {}

defineProps<{
  block: KirbyBlock<'gap', Gap>
}>()
</script>
<template>
  <div class="h-8 mb-0"></div>
</template>
