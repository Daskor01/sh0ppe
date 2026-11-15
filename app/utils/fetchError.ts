export function isFetchErrorWithStatus(error: unknown, status: number): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  const record = error as { statusCode?: number; status?: number }
  const code = record.statusCode ?? record.status
  return code === status
}
