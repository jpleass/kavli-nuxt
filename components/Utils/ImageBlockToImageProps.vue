<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImageData } from '~/queries'

// TODO: I'm not sure if this is necessary. It could be a function.
const props = defineProps<{
  block: KirbyBlock<'image'>
}>()
const imageData = ref<KirbyImageData>({
  uuid: '',
  url: props.block.content.src,
  alt: props.block.content.alt,
  src: props.block.content.src,
  srcset: props.block.content.src,
  caption: props.block.content.caption,
  width: 0,
  height: 0,
})
const page = usePage()
const images = page.value.images
const image = computed<KirbyImageData>(() => {
  return images.find(
    (image: KirbyImageData) => image.uuid === props.block.content.image?.[0],
  )
})

if (image) {
  imageData.value = image.value
}
</script>

<template>
  <slot :image-data="imageData" />
</template>
