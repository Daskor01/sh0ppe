import type { CreateProductReviewBody } from '~/types/productReviewApi'

const MAX_BODY_LENGTH = 4000

export function parseCreateProductReviewBody(value: unknown): CreateProductReviewBody | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }
  const record = value as Record<string, unknown>
  if (typeof record.body !== 'string') {
    return null
  }
  const body = record.body.trim()
  if (!body || body.length > MAX_BODY_LENGTH) {
    return null
  }
  const rating = record.rating
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null
  }
  return { body, rating }
}