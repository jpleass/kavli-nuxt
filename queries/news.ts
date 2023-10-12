import type {
  KirbyBlock,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbyPageData } from './page'
import { pageQuery } from './page'

export interface KirbyNewsPagePreviewData extends KirbyPageData {
  date: string
  cover: KirbyBlock<'image'>
  text: string
}
const newsPagePreviewQuery: KirbyQuerySchema['select'] = {
  date: 'page.date.toDate("D M m Y")',
  text: 'page.text.kt',
  cover: 'page.cover.toBlocks.first',
}

export interface KirbyNewsData extends KirbyPageData {
  children: KirbyNewsPagePreviewData[]
}

export type KirbyNewsPageData = KirbyNewsPagePreviewData & KirbyPageData

export const newsQuery: KirbyQuerySchema['select'] = {
  ...pageQuery,
  children: {
    query: 'page.children',
    select: { ...newsPagePreviewQuery, ...pageQuery },
  },
}

export type KirbyNewsResponse = KirbyQueryResponse<KirbyNewsData>

export const getNewsQuery = (): KirbyQuerySchema => {
  return {
    query: 'page("news")',
    select: newsQuery,
  }
}

export type KirbyNewsPageResponse = KirbyQueryResponse<KirbyNewsPageData>
export const getNewsPageQuery = (pageId: string): KirbyQuerySchema => {
  return {
    query: `page("${pageId}")`,
    select: { ...pageQuery, ...newsPagePreviewQuery },
  }
}
