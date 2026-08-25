import { differenceInCalendarDays, format, isValid } from "date-fns"

const WEEKDAY_WINDOW_DAYS = 7

export function formatRelativeTimestamp(iso: string, now = new Date()): string {
  const date = new Date(iso)

  if (!isValid(date)) {
    return ""
  }

  const dayDiff = differenceInCalendarDays(now, date)

  if (dayDiff <= 0) {
    return format(date, "h:mm a")
  }

  if (dayDiff < WEEKDAY_WINDOW_DAYS) {
    return format(date, "EEEE")
  }

  return format(date, "MMM d")
}
