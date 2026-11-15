export function getFetchErrorStatus(error: unknown): number | null {
  if (typeof error !== 'object' || error === null) {
    return null
  }
  const record = error as { statusCode?: number; status?: number }
  return record.statusCode ?? record.status ?? null
}

export function isFetchErrorWithStatus(error: unknown, status: number): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  const record = error as { statusCode?: number; status?: number }
  const code = record.statusCode ?? record.status
  return code === status
}
