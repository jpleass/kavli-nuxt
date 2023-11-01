<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyNewsPagePreviewData } from '~/queries/news'
import { getLatestNewsQuery, getNewsItemsQuery } from '~/queries/news'

export type News = {
  isLocal: boolean
  page: string[] // UUID array
  limit: number
}

const props = defineProps<{
  block: KirbyBlock<'news', News>
}>()

const page = usePage()
const pageID = props.block.content.page?.length
  ? props.block.content.page[0]
  : page.value.id

const query = props.block.content.isLocal
  ? getLatestNewsQuery(pageID, props.block.content.limit)
  : getNewsItemsQuery(props.block.content.limit, 0)
const { data: pageData } = await useKql(query)

const newsItems = ref<KirbyNewsPagePreviewData[]>(pageData.value.result)
</script>

<template>
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
</template>
