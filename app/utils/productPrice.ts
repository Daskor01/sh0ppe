import type { Product } from '~/types/product'

export function getEffectiveDiscount(product: Product): number | undefined {
  if (product.discountPercent != null) {
    return product.discountPercent
  }
  if (product.compareAtPrice != null && product.compareAtPrice > product.price) {
    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
    )
  }
  return undefined
}

export function hasSale(product: Product): boolean {
  return getEffectiveDiscount(product) != null
}
