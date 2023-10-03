<script lang="tsx" setup>
import type { LinkProps } from '~/queries/links'

export type UILinkProps = {
  url: string
  text: string
  target: string
  type: LinkProps['type']
  icon?: Component
}

defineProps<UILinkProps>()
</script>

<template>
  <NuxtLink class="group" :to="url" :target="target">
    <div class="flex gap-em-half items-center">
      <component
        :is="icon"
        v-if="icon"
        :class="{
          'text-kavli-blue':
            type === 'url' || type === 'file' || type === 'page',
        }"
      />
      <div
        :class="{
          'font-bold text-kavli-blue':
            type === 'url' || type === 'file' || type === 'page',
          'underline underline-offset-4 decoration-kavli-bg': type === 'email',
        }"
        class="link"
        v-html="text"
      ></div>
    </div>
  </NuxtLink>
</template>
