export function useCheckoutSummary() {
  const cartSummary = useCartSummary()

  const shipping = computed(() => 0)

  const total = computed(() =>
    Math.max(0, cartSummary.subtotal.value - cartSummary.discount.value + shipping.value),
  )

  return {
    lines: cartSummary.lines,
    totalItems: cartSummary.totalItems,
    subtotal: cartSummary.subtotal,
    discount: cartSummary.discount,
    shipping,
    total,
    itemsLabel: cartSummary.itemsLabel,
    formatPrice: cartSummary.formatPrice,
    shippingLabel: computed(() => 'Free shipping'),
  }
}
