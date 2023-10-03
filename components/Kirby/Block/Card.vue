<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { CardProps } from '~/@types'

export type CardBlock = Omit<CardProps, 'links, image'> & {
  links: string
  image: string
}

const props = defineProps<{
  block: KirbyBlock<'card', CardBlock>
}>()

const cardProps = ref<CardProps>({
  heading: props.block.content.heading,
  subheading: props.block.content.subheading,
  text: props.block.content.text,
  style: props.block.content.style,
  links: [], // Can't parse links here, because it's not reactive.
  image: [],
})

onMounted(() => {
  // Rendering fix.
  const { links, image } = props.block.content
  if (links) cardProps.value.links = JSON.parse(links) as KirbyBlock<'link'>[]
  if (image) cardProps.value.image = JSON.parse(image) as KirbyBlock<'image'>[]
})
</script>

<template>
  <!-- TODO: Why does this have to be ClientOnly -->
  <ClientOnly>
    <AppCardsCard v-bind="cardProps" />
  </ClientOnly>
</template>
