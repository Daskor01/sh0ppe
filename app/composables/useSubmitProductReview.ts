import type { ProductReviewsResponse } from '~/types/productReviewApi'
export type SubmitProductReviewInput = {
  productSlug: string
  body: string
  rating: number
  authorName: string
}

export function submitProductReview(input: SubmitProductReviewInput): ProductReviewsResponse {
  const store = useProductReviewsStore()
  const reviews = store.addReview(input.productSlug, {
    body: input.body,
    rating: input.rating,
    author: input.authorName,
  })
  return {
    reviews,
    reviewCount: reviews.length,
  }
}

export function reviewSubmitErrorMessage(_error: unknown): string {
  return 'Could not save your review. Please try again.'
}
