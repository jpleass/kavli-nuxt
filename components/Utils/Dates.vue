<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import { checkIfEventIsOver, formatDate } from '~/composables/events'

const props = defineProps<{
  dates: (KirbyBlock<'date'> | KirbyBlock<'daterange'>)[]
}>()

const calcDates = computed(() => {
  return convertDateBlocksToEventDates(props.dates).sort((a, b) => {
    return new Date(b.start).getHours() - new Date(a.start).getHours()
  })
})
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
