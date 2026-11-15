import type { HeroSlide } from '~/types/product'
import { shopProducts } from '~/data/shop'

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Gold big hoops',
    price: 68,
    image: '/images/hero-gold-hoops.webp',
    imageAlt: 'Model wearing gold fan-shaped hoop earrings',
    productSlug: 'gold-big-hoops',
  },
  {
    id: 'hero-2',
    title: 'Lira Earrings',
    price: 20,
    image: '/images/product-lira.webp',
    imageAlt: 'Lira gold hoop earrings',
    productSlug: 'lira-earrings',
  },
  {
    id: 'hero-3',
    title: 'Ollie Earrings',
    price: 22,
    image: '/images/product-ollie.webp',
    imageAlt: 'Ollie chain link earrings',
    productSlug: 'ollie-earrings',
  },
  {
    id: 'hero-4',
    title: 'Kaede Hair Pin',
    price: 30,
    image: '/images/product-kaede.webp',
    imageAlt: 'Kaede hair pin set with pearls',
    productSlug: 'kaede-hair-pin',
  },
]

export const latestProducts = shopProducts.filter((product) =>
  ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].includes(product.id),
)
