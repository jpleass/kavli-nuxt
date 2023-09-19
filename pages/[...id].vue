<script setup lang="ts">
import { getPageQuery } from '~/queries'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql(getPageQuery(kirbyPath))

let data = pageData.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData } = await useKql(getPageQuery('error'))
  data = pageData.value
  setResponseStatus(useRequestEvent(), 404)
}

// Set the current page data for the global page context
const page = data?.result
setPage(page)
</script>

<template>
  <AppPageWrapper v-if="page">
    <template #breadcrumbs>
      <AppBreadcrumbs />
    </template>
    <template #content>
      <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    </template>
  </AppPageWrapper>
</template>
