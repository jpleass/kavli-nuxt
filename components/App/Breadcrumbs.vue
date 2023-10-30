<script lang="tsx" setup>
import type { KirbyPageDataSlim } from '~/queries'

const page = usePage()

const breadcrumbTrail = computed<KirbyPageDataSlim[]>(() => {
  const trail = []
  let current = page.value.parent
  while (current) {
    trail.unshift(current)
    current = current.parent
  }
  return trail
})
</script>

<template>
  <div class="flex gap-em-half items-center font-bold caption">
    <div v-if="breadcrumbTrail.length">
      <NuxtLink class="link" :to="`/`"> home </NuxtLink>
    </div>
    <div v-if="breadcrumbTrail.length" class="h-[0.65em]">
      <SVGChevron class="translate-y-[0.1em]" />
    </div>
    <div v-for="breadcrumb in breadcrumbTrail" :key="breadcrumb.uri">
      <NuxtLink class="lowercase link" :to="`/${breadcrumb.uri}`">
        {{ breadcrumb.title }}
      </NuxtLink>
    </div>
  </div>
</template>
