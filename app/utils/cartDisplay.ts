import type { Product } from '~/types/product'

const VARIANT_BY_CATEGORY: Record<Product['category'], string> = {
  earrings: 'Gold / One size',
  'hair-pins': 'Gold / Set',
  necklaces: 'Gold / One size',
}

export function getCartVariantLabel(product: Product): string {
  return VARIANT_BY_CATEGORY[product.category]
}
