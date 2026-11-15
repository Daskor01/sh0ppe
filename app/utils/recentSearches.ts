import { parseStringArray } from '~/utils/storageParse'

const STORAGE_KEY = 'shoppe-recent-searches'

/** Сколько запросов храним в localStorage (desktop показывает все). */
export const RECENT_SEARCHES_STORAGE_LIMIT = 3

/** Сколько плашек видно ниже breakpoint `lg`. */
export const RECENT_SEARCHES_MOBILE_VISIBLE = 2

export function loadRecentSearches(): string[] {
  if (!import.meta.client) {
    return []
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    return parseStringArray(JSON.parse(raw) as unknown, RECENT_SEARCHES_STORAGE_LIMIT)
  } catch {
    return []
  }
}

export function saveRecentSearches(queries: string[]) {
  if (!import.meta.client) {
    return
  }
  const normalized = queries
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, RECENT_SEARCHES_STORAGE_LIMIT)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
}

export function pushRecentSearch(query: string, current: string[]): string[] {
  const trimmed = query.trim()
  if (!trimmed) {
    return current
  }
  return [trimmed, ...current.filter((entry) => entry !== trimmed)].slice(
    0,
    RECENT_SEARCHES_STORAGE_LIMIT,
  )
}
