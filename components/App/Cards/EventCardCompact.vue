<script lang="tsx" setup>
import type { KirbyEventPagePreviewData } from '~/queries/events'
import { formatDate } from '~/composables/events'

const props = defineProps<KirbyEventPagePreviewData>()

const handleClick = () => {
  if (props.registerLink) {
    window.open(props.registerLink, '_blank')
  }
}
</script>

<template>
  <div
    ref="el"
    class="rounded-lg border-2 overflow-hidden bg-white md:hover:bg-[#efefef] group transition-colors flex justify-between items-stretch md:min-h-44 2xl:min-h-48"
  >
    <div class="py-em px-em h-auto w-full flex flex-col justify-between">
      <div class="flex flex-col items-start h-full max-w-[40em]">
        <div
          v-if="type"
          class="small bg-kavli-bg px-3 py-2 rounded mb-em text-center"
          v-html="type"
        ></div>
        <h6 class="font-bold mb-1" v-html="heading || title" />
        <h6 v-if="subheading" class="italic" v-html="subheading" />
      </div>

      <div
        class="flex flex-row justify-start gap-gap items-center h-full mt-gap-2"
      >
        <a
          v-if="registerLink"
          :href="registerLink"
          target="_blank"
          @click.prevent="handleClick"
        >
          <UIButton :type="'primary'">Register</UIButton>
        </a>
        <div class="flex flex-col gap-1">
          <div class="flex gap-2 items-center">
            <div class="font-symbols">calendar_month</div>

            <div
              v-for="(date, i) in convertDateBlocksToEventDates(dates).filter(
                (date) => !checkIfEventIsOver(date),
              )"
              :key="i"
            >
              {{
                formatDate(date, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
