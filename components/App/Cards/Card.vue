<script lang="tsx" setup>
import type { CardProps } from '~/@types'

const props = defineProps<CardProps>()

const calcStyle = computed(() => {
  if (props.style === 'transparent') return 'transparent'
  else return 'white'
})

const hasImage = computed(() => {
  return props.image.length > 0
})
</script>

<template>
  <div
    class="rounded-lg flex flex-col md:flex-row overflow-hidden"
    :class="{
      'border-2 border-white': calcStyle === 'transparent',
    }"
    :style="{
      backgroundColor: calcStyle,
    }"
  >
    <template v-if="hasImage">
      <UtilsImageBlockToImageProps
        v-for="imageBlock in image"
        v-slot="{ imageData }"
        :key="imageBlock.id"
        :block="imageBlock"
      >
        <div
          :style="{
            flexBasis: '50%',
          }"
        >
          <img
            :src="imageData.src"
            :srcset="imageData.srcset"
            :alt="imageData.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </UtilsImageBlockToImageProps>
    </template>

    <div class="p-gap flex flex-col justify-between w-full">
      <div>
        <h6 class="font-bold" v-html="heading"></h6>
        <span class="italic" v-html="subheading"></span>
      </div>
      <div>
        <div class="mb-gap-2">
          <div router-links class="body-text" v-html="text" />
        </div>
        <KirbyBlocks :gap-class="'mb-em-half'" :blocks="links" />
      </div>
    </div>
  </div>
</template>
