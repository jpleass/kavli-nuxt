export function useHeader<
  T extends Record<string, any> = Record<string, any>,
>() {
  return useState<T>('app.header', () => ({}) as T)
}

export function setHeader<T extends Record<string, any>>(state?: T) {
  if (!state) return
  useHeader().value = state
}
