import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbySiteData {
  title: string
  description: string
  navigationPages: KirbyPageData[]
  children: KirbyPageData[]
  footer: {
    copyright: string
  }
}

export type KirbySiteResponse = KirbyQueryResponse<KirbySiteData>

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    navigationPages: {
      query: 'site.navigationPages.toPages',
      select: pageQuery,
    },
    children: {
      query: 'site.children',
      select: pageQuery,
    },
    footer: {
      select: {
        copyright: 'site.footer_copyright.kt',
      },
    },
  },
}
