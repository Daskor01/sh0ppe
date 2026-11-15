import type { ProductReview } from '~/types/product'

const MAX_SLUGS = 100
const MAX_REVIEWS_PER_SLUG = 50

function isProductReview(value: unknown): value is ProductReview {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.author === 'string' &&
    typeof record.dateLabel === 'string' &&
    typeof record.rating === 'number' &&
    typeof record.body === 'string'
  )
}

export function parseProductReviewsBySlug(raw: unknown): Record<string, ProductReview[]> {
  if (!raw || typeof raw !== 'object') {
    return {}
  }
  const record = raw as Record<string, unknown>
  const result: Record<string, ProductReview[]> = {}
  let slugCount = 0

  for (const [slug, entries] of Object.entries(record)) {
    if (slugCount >= MAX_SLUGS || typeof slug !== 'string' || !slug) {
      continue
    }
    if (!Array.isArray(entries)) {
      continue
    }
    const reviews = entries.filter(isProductReview).slice(0, MAX_REVIEWS_PER_SLUG)
    if (reviews.length > 0) {
      result[slug] = reviews
      slugCount += 1
    }
  }

  return result
}
