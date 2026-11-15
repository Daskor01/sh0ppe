import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ProductCard from '~/components/product/ProductCard.vue'
import type { Product } from '~/types/product'

const product: Product = {
  id: 'p6',
  slug: 'yuki-hair-pin',
  name: 'Yuki Hair Pin',
  price: 25,
  compareAtPrice: 29,
  discountPercent: 21,
  image: '/images/product-yuki.webp',
  imageAlt: 'Yuki hair pin',
  category: 'hair-pins',
  inStock: true,
}

describe('ProductCard', () => {
  it('renders name, sale badge and prices', async () => {
    const wrapper = await mountSuspended(ProductCard, {
      props: { product },
    })

    expect(wrapper.text()).toContain('Yuki Hair Pin')
    expect(wrapper.text()).toContain('-21%')
    expect(wrapper.text()).toContain('$ 29,00')
    expect(wrapper.text()).toContain('$ 25,00')
  })

  it('adds product to cart on add button click (icons variant)', async () => {
    const wrapper = await mountSuspended(ProductCard, {
      props: { product, hoverVariant: 'icons' },
    })

    await wrapper.get('[aria-label="Add to cart"]').trigger('click')

    const cart = useCartStore()
    expect(cart.totalItems).toBe(1)
  })
})
