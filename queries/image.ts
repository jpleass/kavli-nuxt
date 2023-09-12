import type { KirbyQuerySchema } from '#nuxt-kql'

export interface KirbyImageData {
  uuid: string
  url: string
  src: string
  srcset: string
  caption: string
  alt: string
  width: number
  height: number
}

export const kirbyImageQuery = {
  url: true,
  uuid: true,
  src: 'file.resize(1024, 1024, 80).url',
  srcset: 'file.srcset([480, 1280, 2048])',
  caption: 'file.caption',
  width: 'file.width',
  height: 'file.height',
}

export function getImageQuery(uuid: string): KirbyQuerySchema {
  return {
    query: `site.files.find("${uuid}")`,
    select: kirbyImageQuery,
  }
}
