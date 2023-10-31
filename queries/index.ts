import type { KirbyQueryRequest, KirbyQuerySchema } from '#nuxt-kql'

export * from './page'
export * from './site'
export * from './home'
export * from './image'

export const generateQuery = (
  query: KirbyQuerySchema['query'],
  select: KirbyQuerySchema['select'],
  limit?: number,
  page?: number,
): KirbyQueryRequest => {
  return {
    query,
    select,
    pagination: limit && page ? { limit, page } : undefined,
  }
}
