import type { ProductReview } from '~/types/product'

const STORAGE_PREFIX = 'product:'

function storageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`
}

export async function readStoredProductReviews(slug: string): Promise<ProductReview[]> {
  const storage = useStorage('reviews')
  const value = await storage.getItem<ProductReview[]>(storageKey(slug))
  return Array.isArray(value) ? value : []
}

export async function appendStoredProductReview(
  slug: string,
  review: ProductReview,
): Promise<ProductReview[]> {
  const storage = useStorage('reviews')
  const current = await readStoredProductReviews(slug)
  const next = [...current, review]
  await storage.setItem(storageKey(slug), next)
  return next
}