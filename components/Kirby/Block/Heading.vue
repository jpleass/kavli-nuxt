<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { LinkProps } from '~/queries/links'

type CustomKirbyHeading = {
  level: string
  text: string
  link?: LinkProps
}

defineProps<{
  block: KirbyBlock<'heading', CustomKirbyHeading>
}>()
</script>

<template>
  <div class="flex justify-between items-end">
    <component :is="block.content.level" class="w-full">
      <span v-html="block.content.text" />
    </component>
    <div v-if="block.content.link" class="flex-shrink-0">
      <UtilsLinkResolver v-slot="uiLinkProps" v-bind="block.content.link">
        <UILink v-bind="uiLinkProps" />
      </UtilsLinkResolver>
    </div>
  </div>
</template>
