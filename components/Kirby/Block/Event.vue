<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyEventPageResponse } from '~/queries/events'
import { getEventPageQuery } from '~/queries/events'

export type Event = {
  event: string[] // UUID
}
const props = defineProps<{
  block: KirbyBlock<'event', Event>
}>()

const { data: pageData } = await useKql<KirbyEventPageResponse>(
  getEventPageQuery(props.block.content.event[0]),
)
const event = pageData.value?.result
if (!event) {
  throw new Error('Event data is missing')
}

if (!event.type || !event.heading || !event.subheading || !event.dates) {
  throw new Error('Event data is incomplete')
}
</script>

<template>
  <NuxtLink v-if="event" :to="`/${event.id}`">
    <AppCardsEventCardLarge v-bind="event" :is-past="false">
      <template #cover>
        <KirbyBlockImage
          v-if="event"
          :block="event.cover"
          :fill="true"
          :collection="event.images"
          :caption="false"
        />
      </template>
    </AppCardsEventCardLarge>
  </NuxtLink>
</template>
