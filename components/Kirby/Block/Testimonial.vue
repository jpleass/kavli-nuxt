<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'

export type Testimonial = {
  image: string // JSON
  text: string
}
const props = defineProps<{
  block: KirbyBlock<'testimonial', Testimonial>
}>()

const imageBlocks = computed(() => {
  return JSON.parse(props.block.content.image) as KirbyBlock<'image'>[]
})
const image = computed(() => {
  if (!imageBlocks.value) return null
  if (!imageBlocks.value.length) return null
  return imageBlocks.value[0]
})
</script>

<template>
  <div class="flex gap-gap items-center">
    <UtilsImageBlockToImageProps
      v-if="image"
      v-slot="{ imageData }"
      :block="image"
    >
      <div class="w-[4em] h-[4em] block rounded-full overflow-hidden">
        <img
          class="object-cover w-full h-full"
          :src="imageData.src"
          :srcset="imageData.srcset"
        />
      </div>
    </UtilsImageBlockToImageProps>
    <div v-html="block.content.text"></div>
  </div>
</template>
