import { getStaticProductReviews } from '~/data/productPages'
import type { ProductReviewsResponse } from '~/types/productReviewApi'
import { assertKnownProductSlug } from '../../../utils/productSlug'
import { readStoredProductReviews } from '../../../utils/reviewStore'

export default defineEventHandler(async (event): Promise<ProductReviewsResponse> => {
  const slug = assertKnownProductSlug(getRouterParam(event, 'slug'))
  const staticReviews = getStaticProductReviews(slug)
  const storedReviews = await readStoredProductReviews(slug)
  const reviews = [...staticReviews, ...storedReviews]

  return {
    reviews,
    reviewCount: reviews.length,
  }
})