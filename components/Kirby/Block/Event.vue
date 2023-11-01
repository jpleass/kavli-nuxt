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
