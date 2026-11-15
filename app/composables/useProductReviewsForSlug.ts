export function useProductReviewsForSlug(slug: MaybeRefOrGetter<string>) {
  const store = useProductReviewsStore()
  const { userBySlug, version } = storeToRefs(store)

  return computed(() => {
    const slugValue = toValue(slug)
    void userBySlug.value
    void version.value
    return store.mergedReviews(slugValue)
  })
}
