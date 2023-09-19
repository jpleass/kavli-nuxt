<script lang="tsx" setup>
import type { KirbyBlock } from '#nuxt-kql'
import type { CardProps } from '~/@types'

export type CardBlock = Omit<CardProps, 'links'> & { links: string }

const props = defineProps<{
  block: KirbyBlock<'card', CardBlock>
}>()

const cardProps = ref<CardProps>({
  heading: props.block.content.heading,
  subheading: props.block.content.subheading,
  text: props.block.content.text,
  style: props.block.content.style,
  links: [], // Can't parse links here, because it's not reactive.
})

onMounted(() => {
  // Rendering fix.
  cardProps.value.links = JSON.parse(props.block.content.links) as KirbyBlock[]
})
</script>

<template>
  <!-- TODO: Why does this have to be ClientOnly -->
  <ClientOnly>
    <AppCardsCard v-bind="cardProps" />
  </ClientOnly>
</template>
