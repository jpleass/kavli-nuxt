<script setup lang="ts">
import type { KirbyPageResponse } from '~/queries'
import { getPageQuery } from '~/queries'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql<KirbyPageResponse>(
  getPageQuery(kirbyPath),
)

const data = await handlePageData(pageData.value)

// Set the current page data for the global page context
const page = data?.result
setPage(page)
</script>

<template>
  <AppPageWrapper v-if="page">
    <template #breadcrumbs>
      <AppBreadcrumbs />
    </template>
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
  </AppPageWrapper>
</template>
