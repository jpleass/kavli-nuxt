<script setup lang="ts">
export interface KirbyImage {
  id: string
  uuid: string
  url: string
  alt: string | null
}

import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImageData } from '~/queries'

const props = defineProps<{
  block: KirbyBlock<'image'>
  fill?: boolean
  collection?: KirbyImageData[]
}>()

const page = usePage()

// Use static data to avoid reactivity when redirecting to another page
const images = props.collection || page.value.images

const ratio = props.block.content.ratio || 'auto'
let size: { w?: string; h?: string } = {}

if (ratio !== 'auto') {
  const [w = '1', h = '1'] = ratio.split('/')
  size = { w, h }
}

// Auto sizes for `srcset` attribute if used
const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure
    ref="figure"
    :class="{
      'w-full h-full': props.fill,
    }"
  >
    <div
      :data-contain="block.content.crop === false || undefined"
      :class="{
        auto: ratio === 'auto',
        img: ratio !== 'auto',
        'w-full h-full': props.fill,
      }"
      :style="`--w: ${size.w}; --h: ${size.h};`"
    >
      <img
        v-if="block.content.location === 'web'"
        :src="block.content.src"
        :alt="block.content.alt"
        class="w-full"
        :class="{
          'w-full h-full object-cover': props.fill,
        }"
      />
      <KirbyUuidResolver
        v-else
        v-slot="{ item: image }"
        :uuid="props.block.content.image?.[0]"
        :collection="images"
      >
        <img
          v-if="image"
          :src="image.url"
          :sizes="`${width}px`"
          :alt="image.alt"
          class="w-full"
          :class="{
            'w-full h-full object-cover': props.fill,
          }"
        />
      </KirbyUuidResolver>
    </div>

    <figcaption
      v-if="block.content.caption"
      class="caption mt-em-half"
      v-html="block.content.caption"
    />
  </figure>
</template>
