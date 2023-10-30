import type {
  KirbyBlock,
  KirbyQueryRequest,
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
  date: 'page.date.toDate("D M m, Y")',
  text: 'page.text.kt',
  cover: 'page.cover.toBlocks.first',
}

export type KirbyNewsPageData = KirbyNewsPagePreviewData & KirbyPageData
export type KirbyNewsResponse = KirbyQueryResponse<KirbyPageData>
export type KirbyNewsItemsResponse =
  KirbyQueryResponse<KirbyNewsPagePreviewData>
export const getNewsItemsQuery = (
  limit: number,
  page: number,
): KirbyQueryRequest => {
  return {
    query: 'page("news").children.listed',
    select: { ...pageQuery, ...newsPagePreviewQuery },
    pagination: { limit, page },
  }
}

export const getNewsQuery = (): KirbyQueryRequest => {
  return {
    query: 'page("news")',
    select: {
      ...pageQuery,
    },
  }
}

export type KirbyNewsPageResponse = KirbyQueryResponse<KirbyNewsPageData>
export const getNewsPageQuery = (pageId: string): KirbyQuerySchema => {
  return {
    query: `page("${pageId}")`,
    select: { ...pageQuery, ...newsPagePreviewQuery },
  }
}
