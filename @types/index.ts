import type { KirbyBlock } from '#nuxt-kql'

export interface CardProps {
  heading: string
  subheading: string
  text: string
  links: KirbyBlock[]
  style: 'default' | 'transparent'
}
