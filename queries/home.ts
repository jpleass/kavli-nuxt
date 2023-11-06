import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbyEventPagePreviewData } from './events'

import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbyHomePageData extends KirbyPageData {
  heading: string
  promotedEvent: KirbyEventPagePreviewData | null
  bottomLayout: KirbyLayout[]
}

export const homePageQuery: KirbyQuerySchema['select'] = {
  heading: 'page.heading',
  promotedEvent: {
    query: 'page.promotedEvent.toPage',
    select: {
      ...pageQuery,
      type: 'page.type',
      heading: 'page.heading',
      subheading: 'page.subheading',
      dates: 'page.dates.toBlocks',
      location: 'page.location',
      registerLink: 'page.registerLink',
      cover: 'page.cover.toBlocks.first',
    },
  },
  bottomLayout: 'page.bottomLayout.toLayouts',
}

export type KirbyHomePageResponse = KirbyQueryResponse<KirbyHomePageData>
export const getHomePageQuery = (): KirbyQuerySchema => {
  return {
    query: `page("home")`,
    select: { ...pageQuery, ...homePageQuery },
  }
}
