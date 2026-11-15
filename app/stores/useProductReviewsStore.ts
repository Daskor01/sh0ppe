import { defineStore } from 'pinia'
import { getStaticProductReviews } from '~/data/productPages'
import type { ProductReview } from '~/types/product'
import { formatReviewDateLabel } from '~/utils/formatReviewDate'
import { parseProductReviewsBySlug } from '~/utils/productReviewsStorage'

const STORAGE_KEY = 'shoppe-product-user-reviews'

export type AddProductReviewInput = {
  body: string
  rating: number
  author: string
}

export const useProductReviewsStore = defineStore('productReviews', () => {
  const userBySlug = ref<Record<string, ProductReview[]>>({})
  const isHydrated = ref(false)
  /** Bumped on each addReview so computed lists refresh. */
  const version = ref(0)

  function hydrate() {
    if (isHydrated.value || !import.meta.client) {
      return
    }
    isHydrated.value = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return
      }
      userBySlug.value = parseProductReviewsBySlug(JSON.parse(raw) as unknown)
    } catch {
      userBySlug.value = {}
    }
  }

  function persist() {
    if (!import.meta.client) {
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userBySlug.value))
  }

  function mergedReviews(slug: string): ProductReview[] {
    const user = userBySlug.value[slug] ?? []
    return [...user, ...getStaticProductReviews(slug)]
  }

  function addReview(slug: string, input: AddProductReviewInput): ProductReview[] {
    hydrate()
    const review: ProductReview = {
      id: createReviewId(),
      author: input.author,
      dateLabel: formatReviewDateLabel(new Date()),
      rating: input.rating,
      body: input.body,
    }
    const next = [review, ...(userBySlug.value[slug] ?? [])]
    userBySlug.value = { ...userBySlug.value, [slug]: next }
    version.value += 1
    persist()
    return mergedReviews(slug)
  }

  function createReviewId(): string {
    if (import.meta.client && typeof crypto.randomUUID === 'function') {
      return `user-${crypto.randomUUID()}`
    }
    return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  }

  return {
    userBySlug,
    version,
    isHydrated,
    hydrate,
    mergedReviews,
    addReview,
    createReviewId,
  }
})
