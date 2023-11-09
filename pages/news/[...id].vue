<script setup lang="ts">
import type { KirbyNewsPageResponse } from '~/queries/news'
import { getNewsPageQuery } from '~/queries/news'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql<KirbyNewsPageResponse>(
  getNewsPageQuery(kirbyPath),
)

const data = pageData?.value

// Set the current page data for the global page context
const page = data?.result
setPage(page)
</script>

<template>
  <AppPageWrapper2Columns v-if="page">
    <template #left>
      <div class="mb-gap">
        <AppBreadcrumbs />
      </div>
      <div v-reveal class="sticky top-24">
        <h4 class="" v-html="page.title" />
        <div class="small mt-gap" v-html="page.date"></div>
        <AppSocialShare class="mt-gap-2 pb-gap" />
      </div>
    </template>
    <template #right>
      <div v-reveal class="mb-gap-2 max-w-sm">
        <KirbyBlockImage :block="page.cover" />
      </div>
      <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    </template>
  </AppPageWrapper2Columns>
</template>
