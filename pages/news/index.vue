<script setup lang="ts">
import type { KirbyPageResponse } from '~/queries'
import type { KirbyNewsPagePreviewData } from '~/queries/news'

import { getNewsItemsQuery, getNewsQuery } from '~/queries/news'

const query = getNewsQuery()
const { data: pageData } = await useKql<KirbyPageResponse>(query)
// Set the current page data for the global page context
const page = pageData?.value?.result
setPage(page)

const { paginationState, loadMore } = usePagination(20, getNewsItemsQuery)
const newsItems = ref<KirbyNewsPagePreviewData[]>([])
const loadPaginationData = async () => {
  const { data } = await loadMore<KirbyNewsPagePreviewData[]>()
  const items = data.value.result?.data
  if (items) newsItems.value?.push(...items)
}
onMounted(() => {
  loadPaginationData()
})

// const placeholderNewsItems = await generatePlaceholderNewsPreviewProps(10)
</script>

<template>
  <AppPageWrapper v-if="page">
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />
    <div class="flex flex-col gap-gap mt-gap-2">
      <NuxtLink
        v-for="(newsItem, i) in newsItems"
        :key="i"
        :to="`/${newsItem.uri}`"
      >
        <AppCardsNewsCard
          v-bind="{
            title: newsItem.title,
            text: newsItem.text,
            date: newsItem.date,
            cover: newsItem.cover,
            timeToRead: calcTimeToRead(newsItem.layouts),
          }"
        >
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
    <div
      v-if="paginationState && paginationState.page < paginationState.pages"
      class="flex items-center justify-center mt-gap-2"
    >
      <UIButton :type="'secondary'" @click="loadPaginationData">
        Show more
      </UIButton>
    </div>
  </AppPageWrapper>
</template>
