<script setup lang="ts">
import type { KirbyNewsResponse } from '~/queries/news'
import { getNewsQuery } from '~/queries/news'

const query = getNewsQuery()
const { data: pageData } = await useKql<KirbyNewsResponse>(query)

const data = pageData?.value
// Set the current page data for the global page context
const page = data?.result
setPage(page)

// const placeholderNewsItems = await generatePlaceholderNewsPreviewProps(10)
</script>

<template>
  <AppPageWrapper v-if="page">
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    <div class="flex flex-col gap-gap mt-gap-2">
      <NuxtLink
        v-for="(newsItem, i) in page.children"
        :key="i"
        :to="`/${newsItem.uri}`"
      >
        <AppCardsNewsCard v-bind="newsItem">
          <template #cover>
            <KirbyBlockImage
              v-if="newsItem"
              :block="newsItem.cover"
              :fill="true"
              :collection="newsItem.images"
            />
          </template>
        </AppCardsNewsCard>
      </NuxtLink>
    </div>
  </AppPageWrapper>
</template>
