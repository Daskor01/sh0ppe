import type { Product } from '~/types/product'

export type CartLineView = {
  productId: string
  quantity: number
  product: Product
}

const ESTIMATED_SHIPPING = 22

export function useCartSummary() {
  const cart = useCartStore()
  const catalog = useCatalogStore()
  const { formatPrice } = useFormatPrice()

  const lines = computed<CartLineView[]>(() =>
    cart.lines
      .map((line) => {
        const product = catalog.allProducts.find((item) => item.id === line.productId)
        if (!product) {
          return null
        }
        return {
          productId: line.productId,
          quantity: line.quantity,
          product,
        }
      })
      .filter((line): line is CartLineView => line != null),
  )

  const totalItems = computed(() => cart.totalItems)

  const subtotal = computed(() =>
    lines.value.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  )

  const discount = computed(() => {
    if (!cart.couponApplied) {
      return 0
    }
    return Math.round(subtotal.value * 0.1 * 100) / 100
  })

  const shipping = computed(() => (totalItems.value > 0 ? ESTIMATED_SHIPPING : 0))

  const total = computed(() => Math.max(0, subtotal.value - discount.value + shipping.value))

  const itemsLabel = computed(() => {
    const count = totalItems.value
    return `${count} item${count === 1 ? '' : 's'}`
  })

  return {
    lines,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    itemsLabel,
    formatPrice,
  }
}
