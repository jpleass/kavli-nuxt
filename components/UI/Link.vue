<script lang="tsx" setup>
export type LinkProps = {
  type: 'page' | 'url' | 'email' | 'tel' | 'file'
  value: string
  text: string
}

const props = defineProps<LinkProps>()
const getTarget = (type: LinkProps['type']) => {
  switch (type) {
    case 'email':
      return '_self'
    case 'tel':
      return '_self'
    case 'page':
      return '_self'
    default:
      return '_blank'
  }
}
</script>

<template>
  <div class="flex gap-em-half items-center">
    <UIArrowContainer>
      <SVGArrow />
    </UIArrowContainer>
    <div class="text-kavli-blue font-bold">
      <UtilsLinkResolver v-slot="{ url }" v-bind="{ ...props }">
        <NuxtLink v-if="url" :to="url" :target="getTarget(type)">
          {{ text }}
        </NuxtLink>
        <div v-else v-html="text"></div>
      </UtilsLinkResolver>
    </div>
  </div>
</template>
