import { getStaticProductReviews } from '~/data/productPages'
import type { ProductReview } from '~/types/product'
import type { ProductReviewsResponse } from '~/types/productReviewApi'
import { formatReviewDateLabel } from '~/utils/formatReviewDate'
import { parseCreateProductReviewBody } from '~/utils/parseCreateProductReviewBody'
import { assertKnownProductSlug } from '#server/utils/productSlug'
import { resolveReviewAuthor } from '#server/utils/reviewAuthor'
import { appendStoredProductReview, readStoredProductReviews } from '#server/utils/reviewStore'

export default defineEventHandler(async (event): Promise<ProductReviewsResponse> => {
  const slug = assertKnownProductSlug(getRouterParam(event, 'slug'))

  const payload = parseCreateProductReviewBody(await readBody(event))
  if (!payload) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid review data.',
    })
  }

  const author = resolveReviewAuthor(event, payload)

  const review: ProductReview = {
    id: `user-${crypto.randomUUID()}`,
    author,
    dateLabel: formatReviewDateLabel(new Date()),
    rating: payload.rating,
    body: payload.body,
  }

  await appendStoredProductReview(slug, review)

  const staticReviews = getStaticProductReviews(slug)
  const storedReviews = await readStoredProductReviews(slug)
  const reviews = [...staticReviews, ...storedReviews]

  return {
    reviews,
    reviewCount: reviews.length,
  }
})
