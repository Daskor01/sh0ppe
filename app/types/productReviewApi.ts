import type { ProductReview } from '~/types/product'

export type ProductReviewsResponse = {
  reviews: ProductReview[]
  reviewCount: number
}

export type CreateProductReviewBody = {
  body: string
  rating: number
  /** Display name when posting as a guest. */
  author?: string
}
