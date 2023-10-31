<script lang="tsx" setup>
import type { KirbyEventPagePreviewData } from '~/queries/events'

const props = defineProps<KirbyEventPagePreviewData & { isPast: boolean }>()

const handleClick = () => {
  if (props.registerLink) {
    window.open(props.registerLink, '_blank')
  }
}
</script>

<template>
  <div
    ref="el"
    class="rounded-lg border-2 overflow-hidden bg-white flex md:flex-row flex-col justify-between items-stretch md:min-h-44 2xl:min-h-48"
  >
    <div
      v-if="cover"
      class="md:h-44 2xl:h-48 2xl:w-48 md:w-44 flex-shrink-0 relative"
    >
      <slot name="cover" />
    </div>

    <div class="py-em px-em h-auto w-full flex justify-between">
      <div class="flex flex-col items-start h-full max-w-[40em]">
        <div
          v-if="type"
          class="small bg-kavli-bg px-3 py-2 rounded mb-em min-w-[7em] text-center"
          v-html="type"
        ></div>
        <h6 class="font-bold mb-1" v-html="heading || title" />
        <h6 v-if="subheading" class="italic" v-html="subheading" />
      </div>

      <div
        class="flex flex-col justify-between items-start h-full pr-em min-w-44"
      >
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <div class="font-symbols">calendar_month</div>
            <div class="small">
              <UtilsDates :dates="dates" />
            </div>
          </div>
          <div class="flex gap-1">
            <div class="font-symbols">location_on</div>
            <div class="small pt-1" v-html="location"></div>
          </div>
        </div>

        <a
          v-if="!isPast && registerLink"
          :href="registerLink"
          target="_blank"
          class="mt-gap"
          @click.prevent="handleClick"
        >
          <UIButton :type="'primary'">Register</UIButton>
        </a>
      </div>
    </div>
  </div>
</template>
