export default defineNuxtPlugin(() => {
  useProductReviewsStore().hydrate()
})
