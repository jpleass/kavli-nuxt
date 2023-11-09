import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyEventPagePreviewData } from '../queries/events'

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

export const checkIfEventPageIsOver = (
  page: KirbyEventPagePreviewData,
): boolean => {
  const dates = convertDateBlocksToEventDates(page.dates)
  const isOver = dates.every((date) => {
    return checkIfEventIsOver(date)
  })
  return isOver
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

export const formatDate = (
  date: KirbyEventDate,
  options?: Intl.DateTimeFormatOptions,
) => {
  const userLocale = process.client ? navigator.language : 'en'
  if (date.start && date.end) {
    const startString = new Date(date.start).toLocaleDateString(
      userLocale,
      options
        ? options
        : {
            year: undefined,
            month: 'short',
            day: 'numeric',
          },
    )
    const endString = new Date(date.end).toLocaleDateString(
      userLocale,
      options
        ? options
        : {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
    )
    return `${startString} – ${endString}`
  } else {
    return new Date(date.start).toLocaleDateString(
      userLocale,
      options
        ? options
        : {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
    )
  }
}
