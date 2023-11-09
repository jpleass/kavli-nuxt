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
    class="rounded-lg border-2 overflow-hidden bg-kavli-peach group md:hover:bg-kavli-peach-dark transition-colors min-h-[340px] flex md:flex-row flex-col justify-between items-stretch"
  >
    <div
      v-if="cover"
      class="flex-shrink-0 md:w-72 md:h-auto w-full h-72 relative"
    >
      <slot name="cover" />
    </div>

    <div
      class="py-em px-em h-auto w-full flex flex-col lg:flex-row lg:justify-between"
    >
      <div class="flex flex-col items-start h-full lg:pr-gap mb-gap lg:mb-0">
        <div
          v-if="type"
          class="small bg-white px-3 py-2 rounded mb-em text-center"
          v-html="type"
        ></div>
        <h5 class="font-bold lg:mb-1" v-html="heading || title" />
        <h5 v-if="subheading" class="italic font-normal" v-html="subheading" />
      </div>

      <div
        class="flex flex-col justify-between items-start h-full lg:pr-em lg:w-[12em]"
      >
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <div class="font-symbols">calendar_month</div>
            <div class="caption">
              <UtilsDates :dates="dates" />
            </div>
          </div>
          <div class="flex gap-1 mt-1">
            <div class="font-symbols">location_on</div>
            <div class="caption pt-1" v-html="location"></div>
          </div>
        </div>

        <button
          v-if="!isPast && registerLink"
          :href="registerLink"
          target="_blank"
          class="mt-gap text-center w-full"
          @click.prevent="handleClick"
        >
          <UIButton :type="'primary'" class="bg-white md:hover:bg-kavli-bg"
            >Register</UIButton
          >
        </button>
      </div>
    </div>
  </div>
</template>
