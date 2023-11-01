<script setup lang="ts">
import { type KirbyPageResponse, getPageQuery } from '~/queries'

const query = getPageQuery('community')
const { data: pageData } = await useKql<KirbyPageResponse>(query)
// Set the current page data for the global page context
const page = pageData?.value?.result
setPage(page)
</script>

<template>
  <AppPageWrapper v-if="page">
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />

    <div class="flex flex-col gap-gap mt-gap-2 pt-gap-2">
      <NuxtLink
        v-for="(item, i) in page.children"
        :key="i"
        :to="`/${item.uri}`"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
  </AppPageWrapper>
</template>
