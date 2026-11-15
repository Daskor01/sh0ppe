import { defineStore } from 'pinia'
import { heroSlides, latestProducts } from '~/data/home'
import { shopProducts } from '~/data/shop'

export const useCatalogStore = defineStore('catalog', () => {
  const slides = ref(heroSlides)
  const products = ref(latestProducts)
  const allProducts = ref(shopProducts)

  function getProductBySlug(slug: string) {
    return allProducts.value.find((product) => product.slug === slug)
  }

  return {
    slides,
    products,
    allProducts,
    getProductBySlug,
  }
})
