<script lang="ts" setup>
import type { LinkProps } from '~/components/UI/Link.vue'

const props = defineProps<LinkProps>()

const getPageUrl = async (uuid: string) => {
  const { data } = await useKql({
    query: `page("${uuid}")`,
    select: {
      uri: true,
    },
  })
  return '/' + data.value.result?.uri
}

const getFileUrl = async (uuid: string) => {
  const { data } = await useKql({
    query: `site.files.find("${uuid}")`,
    select: {
      url: true,
    },
  })
  return data.value.result?.url
}

const getURL = async ({ type, value }: LinkProps) => {
  switch (type) {
    case 'page':
      return getPageUrl(value)
    case 'url':
      return value
    case 'email':
      return `mailto:${value}`
    case 'tel':
      return `tel:${value}`
    case 'file':
      return getFileUrl(value)
    default:
      return value
  }
}

const url = ref(await getURL(props))
</script>

<template>
  <slot :url="url" />
</template>
