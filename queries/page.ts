import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from '#nuxt-kql'
import type { KirbyImageData } from './image'
import { kirbyImageQuery } from './image'

export interface KirbyPageDataSlim {
  id: string
  uri: string
  title: string
  intendedTemplate: string
  children: KirbyPageDataSlim[]
  parent: Partial<KirbyPageData>
  // breadcrumb: Partial<KirbyPageData>
}

export type KirbyPageDataChild = {
  id: string
  uri: string
  title: string
  intendedTemplate: string
}

const childQuery: KirbyQuerySchema['select'] = {
  id: true,
  uri: true,
  title: true,
  intendedTemplate: true,
}

export interface KirbyPageData extends KirbyPageDataSlim {
  images: KirbyImageData[]
  layouts: KirbyLayout[]
}

export const pageQuerySlim: KirbyQuerySchema['select'] = {
  id: true,
  uri: true,
  title: true,
  intendedTemplate: true,
  children: {
    query: 'page.children',
    select: childQuery,
  },
  parent: {
    query: 'page.parent',
    select: {
      id: true,
      uri: true,
      title: true,
      intendedTemplate: true,
    },
  },
}

export const pageQuery: KirbyQuerySchema['select'] = {
  ...pageQuerySlim,
  images: {
    query: 'page.images',
    select: kirbyImageQuery,
  },
  layouts: 'page.layout.toLayouts',
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: pageQuery,
  }
}

export type KirbyErrorResponse = KirbyQueryResponse<KirbyPageData>
export function getErrorQuery(): KirbyQuerySchema {
  return {
    query: `page("error")`,
    select: pageQuery,
  }
}
