<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { LinkProps } from '~/components/UI/Link.vue'

type LinkBlock = {
  link: LinkProps
}

defineProps<{
  block: KirbyBlock<'carousel', LinkBlock>
}>()
</script>

<template>
  <UILink v-bind="{ ...block.content.link }" />
</template>
