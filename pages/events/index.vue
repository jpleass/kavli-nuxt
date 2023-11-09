<script lang="ts" setup>
import { checkIfEventIsOver } from '~/composables/events'
import { type KirbyPageResponse, getPageQuery } from '~/queries'
import type { KirbyEventPagePreviewData } from '~/queries/events'
import { getEventItemsQuery } from '~/queries/events'

const query = getPageQuery('events')

const { data: pageData } = await useKql<KirbyPageResponse>(query)
// Set the current page data for the global page context
const page = pageData?.value?.result
setPage(page)

const { paginationState, loadMore } = usePagination(20, getEventItemsQuery)

const upcomingItens = ref<KirbyEventPagePreviewData[]>([])
const pastItems = ref<KirbyEventPagePreviewData[]>([])

const loadPaginationData = async () => {
  const { data } = await loadMore<KirbyEventPagePreviewData[]>()
  const items = data.value.result?.data
  console.log('items', items)
  if (items) {
    items.forEach((item) => {
      const dates = convertDateBlocksToEventDates(item.dates)
      if (dates.every((date) => checkIfEventIsOver(date))) {
        pastItems.value?.push(item)
      } else {
        upcomingItens.value?.push(item)
      }
    })
  }
}
onMounted(() => {
  loadPaginationData()
})
</script>

<template>
  <AppPageWrapper v-if="page">
    <KirbyLayouts v-if="page.layouts" :layouts="page.layouts ?? []" />

    <AppSection v-if="upcomingItens.length" class="mt-24">
      <h3 v-reveal>Upcoming Events</h3>
      <div class="flex flex-col gap-gap mt-gap-2">
        <NuxtLink
          v-for="(eventItem, i) in upcomingItens"
          :key="i"
          :to="`/${eventItem.uri}`"
        >
          <AppCardsEventCard v-reveal v-bind="eventItem" :is-past="false">
            <template #cover>
              <KirbyBlockImage
                v-if="eventItem"
                :block="eventItem.cover"
                :fill="true"
                :collection="eventItem.images"
                :caption="false"
              />
            </template>
          </AppCardsEventCard>
        </NuxtLink>
      </div>
    </AppSection>

    <AppSection v-if="pastItems.length" class="mt-24">
      <h4 class="-mb-em">Past Events</h4>
      <div class="flex flex-col gap-gap mt-gap-2">
        <NuxtLink
          v-for="(eventItem, i) in pastItems"
          :key="i"
          :to="`/${eventItem.uri}`"
        >
          <AppCardsEventCard v-bind="eventItem" :is-past="true">
            <template #cover>
              <KirbyBlockImage
                v-if="eventItem"
                :block="eventItem.cover"
                :fill="true"
                :collection="eventItem.images"
                :caption="false"
              />
            </template>
          </AppCardsEventCard>
        </NuxtLink>
      </div>
    </AppSection>

    <!-- Pagination -->
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
