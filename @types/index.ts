import type { KirbyBlock } from '#nuxt-kql'

export interface CardProps {
  heading: string
  subheading: string
  text: string
  links: KirbyBlock<'link'>[]
  image: KirbyBlock<'image'>[]
  style: 'default' | 'transparent'
}

export interface NewsPreviewProps {
  title: string
  text: string
  date: string
  cover?: KirbyBlock<'image'>
}
