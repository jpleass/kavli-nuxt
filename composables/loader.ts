export function useLoading<
  T extends Record<string, any> = Record<string, any>,
>() {
  return useState<T>('app.loading', () => ({}) as T)
}

export function setLoading<T extends Record<string, any>>(loading?: T) {
  if (!loading) return
  useLoading().value = loading
}
