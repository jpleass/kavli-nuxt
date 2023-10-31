<script lang="tsx" setup>
import type { KirbyNewsPagePreviewData } from '~/queries/news'
import { getLatestNewsQuery } from '~/queries/news'

const page = usePage()
const query = getLatestNewsQuery(page.value.id)
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
