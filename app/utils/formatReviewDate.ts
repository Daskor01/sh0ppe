/** Matches mock labels, e.g. “6 May, 2020”. */
export function formatReviewDateLabel(date: Date): string {
  const raw = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return raw.replace(/^(\d+ \w+) (\d+)$/, '$1, $2')
}