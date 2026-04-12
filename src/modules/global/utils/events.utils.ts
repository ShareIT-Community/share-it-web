import type { ShareITEvent } from 'src/modules/global/constants/events.const'

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000
const ARG_TIMEZONE = 'America/Argentina/Buenos_Aires'

export type EventStatus = 'live' | 'upcoming' | 'past'

export function getEventStatus(
  event: ShareITEvent,
  now = new Date(),
): EventStatus {
  if (!event.startDate || !event.endDate) return 'upcoming'

  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  if (now >= start && now <= end) return 'live'
  if (now < start) return 'upcoming'
  return 'past'
}

export function formatEventDate(dateStr: string) {
  if (!dateStr) {
    return {
      month: '---',
      day: '??',
      weekday: 'Fecha por definir',
      time: 'Hora por definir',
    }
  }

  const date = new Date(dateStr)
  const argOptions: Intl.DateTimeFormatOptions = { timeZone: ARG_TIMEZONE }

  return {
    month: date
      .toLocaleString('es-ES', { ...argOptions, month: 'short' })
      .replace('.', ''),
    day: date.toLocaleString('es-ES', { ...argOptions, day: 'numeric' }),
    weekday: date.toLocaleString('es-ES', { ...argOptions, weekday: 'long' }),
    time:
      date.toLocaleString('es-ES', {
        ...argOptions,
        hour: '2-digit',
        minute: '2-digit',
      }) + 'hs',
  }
}

export function getGroupedEvents(events: ShareITEvent[], now = new Date()) {
  const sortAsc = (a: ShareITEvent, b: ShareITEvent) => {
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  }
  const sortDesc = (a: ShareITEvent, b: ShareITEvent) => {
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  }

  const community = events.filter((e) => e.type === 'meetup')
  const learning = events.filter((e) => e.type === 'workshop')

  return {
    upcomingCommunity: community
      .filter((e) => !e.endDate || new Date(e.endDate) > now)
      .sort(sortAsc),
    pastCommunity: community
      .filter((e) => {
        if (!e.endDate) return false
        const end = new Date(e.endDate)
        return end <= now && now.getTime() - end.getTime() < FOURTEEN_DAYS_MS
      })
      .sort(sortDesc),
    upcomingLearning: learning
      .filter((e) => !e.endDate || new Date(e.endDate) > now)
      .sort(sortAsc),
    pastLearning: learning
      .filter((e) => !!e.endDate && new Date(e.endDate) <= now)
      .sort(sortDesc),
  }
}
