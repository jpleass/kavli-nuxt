<script lang="tsx" setup>
import type { NewsPreviewProps } from '~/@types'

defineProps<NewsPreviewProps>()
</script>

<template>
  <div
    class="rounded-xl border-2 overflow-hidden border-white flex md:flex-row flex-col justify-between items-stretch"
  >
    <div v-if="image" class="lg:w-1/6 md:w-1/4 w-full flex-shrink-0">
      <KirbyBlockImage
        :block="{
          content: {
            location: 'web',
            image: [image.uuid],
            src: image.src,
            alt: image.alt,
            caption: image.caption,
            ratio: '1/1',
            crop: true,
          },
          id: heading,
          isHidden: false,
          type: 'image',
        }"
      />
    </div>

    <div class="py-gap px-em h-auto w-full">
      <div
        class="flex flex-col items-start justify-between h-full max-w-[40em]"
      >
        <h6 class="font-bold" v-html="heading"></h6>
        <div router-links class="body-text" v-html="text" />
        <div class="small flex gap-em-half">
          <span>
            {{ date }}
          </span>
          <span>•</span>
          <span>6 min read</span>
        </div>
      </div>
    </div>
  </div>
</template>
