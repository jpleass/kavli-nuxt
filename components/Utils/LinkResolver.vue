<script lang="ts" setup>
import type { LinkProps } from '~/queries/links'
import { LazyUILinkArrow, LazyUILinkEmail, LazyUILinkPhone } from '#components'

const props = defineProps<LinkProps>()

const getPageUrl = async (uuid: string) => {
  const { data } = await useKql({
    query: `page("${uuid}")`,
    select: {
      uri: true,
      title: true,
    },
  })
  pageTitle.value = data.value.result?.title
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

const getIcon = (type: LinkProps['type']) => {
  switch (type) {
    case 'email':
      return LazyUILinkEmail
    case 'tel':
      return LazyUILinkPhone
    default:
      return LazyUILinkArrow
  }
}

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

const pageTitle = ref()
const url = ref(await getURL(props))
const text = ref(props.text || pageTitle.value || props.value)
const icon = shallowRef(getIcon(props.type))
const target = ref(getTarget(props.type))
</script>

<template>
  <slot :url="url" :text="text" :icon="icon" :target="target" :type="type" />
</template>
