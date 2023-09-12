import type { KirbyQueryResponse, KirbyQuerySchema } from '#nuxt-kql'

export interface KirbyPageData {
  id: string
  uri: string
  title: string
  intendedTemplate: string
  children: KirbyPageData[]
  parent: Partial<KirbyPageData>
}

const childQuery: KirbyQuerySchema['select'] = {
  id: true,
  uri: true,
  title: true,
  intendedTemplate: true,
}

export const pageQuery: KirbyQuerySchema['select'] = {
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

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: pageQuery,
  }
}
