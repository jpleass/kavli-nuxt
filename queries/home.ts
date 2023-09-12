import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbyImageData } from './image'
import { kirbyImageQuery } from './image'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbyHomePageData extends KirbyPageData {
  images: KirbyImageData[]
  layouts: KirbyLayout[]
}

export const homePageQuery: KirbyQuerySchema['select'] = {
  ...pageQuery,
  images: {
    query: 'page.images',
    select: kirbyImageQuery,
  },
  layouts: 'page.layout.toLayouts',
}

export type KirbyHomePageResponse = KirbyQueryResponse<KirbyHomePageData>
export const getHomePageQuery = (): KirbyQuerySchema => {
  return {
    query: `page("home")`,
    select: { ...pageQuery, ...homePageQuery },
  }
}
