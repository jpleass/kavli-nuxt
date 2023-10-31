import type { KirbyBlock } from '#nuxt-kql'

export type KirbyEventDate = {
  start: string
  end?: string
}

export const convertDateBlocksToEventDates = (
  dates: (KirbyBlock<'date'> | KirbyBlock<'daterange'>)[],
): KirbyEventDate[] => {
  return dates.flatMap((date) => {
    return {
      start: date.content.start || date.content.date,
      end: date.content.end || null,
    }
  })
}

export const checkIfEventIsOver = (event: KirbyEventDate): boolean => {
  const now = new Date()
  const eventStart = new Date(event.start)
  const eventEnd = event.end ? new Date(event.end) : null

  if (eventEnd) {
    return eventEnd < now
  } else {
    return eventStart < now
  }
}
