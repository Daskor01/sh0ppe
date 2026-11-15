import type { ProductReviewsResponse } from '~/types/productReviewApi'
import { isFetchErrorWithStatus } from '~/utils/fetchError'

export type SubmitProductReviewInput = {
  productSlug: string
  body: string
  rating: number
  authorName: string
  isSignedIn: boolean
}

export async function submitProductReview(
  input: SubmitProductReviewInput,
): Promise<ProductReviewsResponse> {
  const body: Record<string, string | number> = {
    body: input.body,
    rating: input.rating,
  }
  if (!input.isSignedIn) {
    body.author = input.authorName
  }

  return await $fetch<ProductReviewsResponse>(`/api/products/${input.productSlug}/reviews`, {
    method: 'POST',
    body,
    credentials: 'include',
  })
}

export function reviewSubmitErrorMessage(error: unknown): string {
  if (isFetchErrorWithStatus(error, 401)) {
    return 'Please sign in again to post your review.'
  }
  if (isFetchErrorWithStatus(error, 400)) {
    return 'Could not save the review. Check the fields and try again.'
  }
  return 'Could not save your review. Please try again.'
}
