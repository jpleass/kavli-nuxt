import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImageData } from '../queries/image'

export interface CardProps {
  heading: string
  subheading: string
  text: string
  links: KirbyBlock<'link'>[]
  image: KirbyBlock<'image'>[]
  style: 'default' | 'transparent'
}

export interface NewsPreviewProps {
  heading: string
  text: string
  date: string
  image?: KirbyImageData
}
