<script lang="tsx" setup>
import type { NewsPreviewProps } from '~/@types'

defineProps<NewsPreviewProps>()
</script>

<template>
  <div
    ref="el"
    class="rounded-lg border-2 group overflow-hidden bg-white md:hover:bg-[#efefef] group transition-colors flex md:flex-row flex-col justify-between items-stretch md:h-44 2xl:h-48"
  >
    <div
      v-if="cover"
      class="md:w-48 md:h-full h-52 flex-shrink-0 relative overflow-hidden"
    >
      <div
        class="w-full h-full group-hover:scale-110 transition-transform duration-300"
      >
        <slot name="cover" />
      </div>
    </div>

    <div class="py-em px-em h-auto w-full">
      <div class="flex flex-col h-full max-w-[40em]">
        <h6 class="font-bold h-[2em] mb-[1em]" v-html="title" />
        <div class="h-full flex justify-between flex-col">
          <div router-links class="body-text line-clamp-2" v-html="text" />
          <div class="small flex gap-em-half mt-em">
            <span v-html="date" />
            <span>•</span>
            <span v-if="timeToRead" v-html="timeToRead + ' min read'"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
