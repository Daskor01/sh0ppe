import type { ProductReview } from '~/types/product'
import { getStaticProductReviews } from '~/data/productPages'

export function useProductReviewsForSlug(slug: MaybeRefOrGetter<string>) {
  const store = useProductReviewsStore()
  const { userBySlug, version } = storeToRefs(store)

  return computed((): ProductReview[] => {
    const slugValue = toValue(slug)
    void userBySlug.value
    void version.value
    const user = userBySlug.value[slugValue] ?? []
    return [...getStaticProductReviews(slugValue), ...user]
  })
}
