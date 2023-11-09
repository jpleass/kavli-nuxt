import type { KirbyQueryRequest, KirbyQueryResponse } from '#nuxt-kql'
import { ref } from 'vue'
import type { PaginationState } from '~/@types'

export const usePagination = (
  limit: number,
  query: (limit: number, page: number) => KirbyQueryRequest,
) => {
  const pageNum = ref(0)
  const paginationState = ref<PaginationState | undefined>({
    page: 0,
    pages: 0,
    offset: 0,
    limit: 0,
    total: 0,
  })

  const loadMore = async <T>() => {
    pageNum.value++
    const queryWithPagination = query(limit, pageNum.value)
    setLoading({ loading: true })
    const response =
      await useKql<KirbyQueryResponse<T, true>>(queryWithPagination)
    setLoading({ loading: false })
    paginationState.value = response.data.value.result?.pagination
    return response
  }

  return {
    pageNum,
    paginationState,
    loadMore,
  }
}
