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
  <div
    class="flex flex-row lg:flex-row lg:justify-between lg:items-end items-center gap-em-half"
    :class="{
      'pb-em-half': block.content.link,
    }"
  >
    <component :is="block.content.level" class="w-full">
      <span v-html="block.content.text" />
    </component>
    <div v-if="block.content.link" class="flex-shrink-0 hidden">
      <UtilsLinkResolver v-slot="uiLinkProps" v-bind="block.content.link">
        <UILink v-bind="uiLinkProps" />
      </UtilsLinkResolver>
    </div>
  </div>
</template>
