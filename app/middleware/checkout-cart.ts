export default defineNuxtRouteMiddleware(() => {
  const cart = useCartStore()
  if (cart.totalItems > 0) {
    return
  }
  return navigateTo('/cart')
})
