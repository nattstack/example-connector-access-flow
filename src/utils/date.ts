const MS_PER_DAY = 86_400_000
const WEEKDAY_WINDOW_DAYS = 7

export function formatRelativeTimestamp(iso: string, now = new Date()): string {
  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  const dayDiff = Math.round((startOfLocalDay(now) - startOfLocalDay(date)) / MS_PER_DAY)

  if (dayDiff <= 0) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (dayDiff < WEEKDAY_WINDOW_DAYS) {
    return date.toLocaleDateString(undefined, { weekday: "long" })
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  })
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}
