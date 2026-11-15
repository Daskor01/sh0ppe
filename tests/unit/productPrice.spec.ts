import { describe, expect, it } from 'vitest'
import type { Product } from '~/types/product'
import { getEffectiveDiscount, hasSale } from '~/utils/productPrice'

const baseProduct: Product = {
  id: '1',
  slug: 'test',
  name: 'Test',
  price: 25,
  image: '/test.jpg',
  imageAlt: 'test',
  category: 'earrings',
  inStock: true,
}

describe('productPrice utils', () => {
  it('returns explicit discount percent', () => {
    const product = { ...baseProduct, discountPercent: 21, compareAtPrice: 29 }
    expect(getEffectiveDiscount(product)).toBe(21)
    expect(hasSale(product)).toBe(true)
  })

  it('computes discount from compareAtPrice', () => {
    const product = { ...baseProduct, compareAtPrice: 40, price: 30 }
    expect(getEffectiveDiscount(product)).toBe(25)
  })

  it('returns undefined when no sale', () => {
    expect(getEffectiveDiscount(baseProduct)).toBeUndefined()
    expect(hasSale(baseProduct)).toBe(false)
  })
})
