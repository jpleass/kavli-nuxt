<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import { type KirbyEventDate, checkIfEventIsOver } from '~/composables/events'

const props = defineProps<{
  dates: (KirbyBlock<'date'> | KirbyBlock<'daterange'>)[]
}>()

const calcDates = computed(() => {
  return convertDateBlocksToEventDates(props.dates)
})

const formatDate = (date: KirbyEventDate) => {
  const userLocale = process.client ? navigator.language : 'en'
  if (date.start && date.end) {
    const startString = new Date(date.start).toLocaleDateString(userLocale, {
      year: undefined,
      month: 'long',
      day: 'numeric',
    })
    const endString = new Date(date.end).toLocaleDateString(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return `${startString} – ${endString}`
  } else {
    return new Date(date.start).toLocaleDateString(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}
</script>

<template>
  <div>
    <div v-for="(date, index) in calcDates" :key="index">
      <span
        :class="{
          'opacity-30': checkIfEventIsOver(date),
        }"
        v-html="formatDate(date)"
      ></span>
    </div>
  </div>
</template>
