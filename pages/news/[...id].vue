<script setup lang="ts">
import type { KirbyNewsPageResponse } from '~/queries/news'
import { getNewsPageQuery } from '~/queries/news'
const headerStore = useHeader()
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
      <!-- <div class="mb-gap">
        <AppBreadcrumbs />
      </div> -->
      <div
        class="sticky top-gap transition-transform duration-200"
        :class="{
          'md:translate-y-24':
            !headerStore.isHidden && !headerStore.isAboveThreshold,
        }"
      >
        <h4 v-html="page.title" />
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
