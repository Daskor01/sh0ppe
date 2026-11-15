import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProductReviewsStore } from '~/stores/useProductReviewsStore'

describe('useProductReviewsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('adds review and persists to localStorage', () => {
    const store = useProductReviewsStore()
    store.hydrate()
    const reviews = store.addReview('lira-earrings', {
      body: 'Nice product',
      rating: 5,
      author: 'Tester',
    })
    expect(reviews.some((r) => r.body === 'Nice product')).toBe(true)
    const raw = localStorage.getItem('shoppe-product-user-reviews')
    expect(raw).toContain('Nice product')
  })
})
