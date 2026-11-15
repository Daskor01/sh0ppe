import type { Product } from '~/types/product'

/** Диапазон ползунка (как в макете: до $180) */
export const SHOP_PRICE_MIN = 20
export const SHOP_PRICE_MAX = 180

export const shopProducts: Product[] = [
  {
    id: 'p1',
    slug: 'lira-earrings',
    name: 'Lira Earrings',
    price: 20,
    discountPercent: 21,
    compareAtPrice: 25,
    image: '/images/product-lira.webp',
    imageAlt: 'Lira gold hoop earrings on white background',
    category: 'earrings',
    inStock: true,
  },
  {
    id: 'p2',
    slug: 'hal-earrings',
    name: 'Hal Earrings',
    price: 22,
    image: '/images/product-ollie.webp',
    imageAlt: 'Hal gold earrings',
    category: 'earrings',
    inStock: true,
  },
  {
    id: 'p3',
    slug: 'kaede-hair-pin-set',
    name: 'Kaede Hair Pin Set Of 3',
    price: 30,
    image: '/images/product-kaede.webp',
    imageAlt: 'Kaede hair pin set with pearls',
    category: 'hair-pins',
    inStock: true,
  },
  {
    id: 'p4',
    slug: 'hair-pin-set-of-3',
    name: 'Hair Pin Set of 3',
    price: 30,
    image: '/images/product-hair-pin-set.webp',
    imageAlt: 'Set of three gold hair pins',
    category: 'hair-pins',
    inStock: true,
  },
  {
    id: 'p5',
    slug: 'plaine-gold-necklace',
    name: 'Plaine Necklace',
    price: 44,
    image: '/images/product-necklace.webp',
    imageAlt: 'Minimal gold necklace',
    category: 'necklaces',
    inStock: false,
    soldOut: true,
  },
  {
    id: 'p6',
    slug: 'yuki-hair-pin-set',
    name: 'Yuki Hair Pin Set of 3',
    price: 25,
    compareAtPrice: 29,
    discountPercent: 21,
    image: '/images/product-yuki.webp',
    imageAlt: 'Yuki hair pin set with discount',
    category: 'hair-pins',
    inStock: true,
  },
  {
    id: 'p7',
    slug: 'ollie-earrings',
    name: 'Ollie Earrings',
    price: 22,
    image: '/images/product-ollie.webp',
    imageAlt: 'Ollie interlocking gold earrings',
    category: 'earrings',
    inStock: true,
  },
  {
    id: 'p8',
    slug: 'kaede-hair-pin',
    name: 'Kaede Hair Pin',
    price: 30,
    image: '/images/product-kaede.webp',
    imageAlt: 'Kaede hair pins with pearls',
    category: 'hair-pins',
    inStock: true,
  },
  {
    id: 'p9',
    slug: 'gold-big-hoops',
    name: 'Gold big hoops',
    price: 68,
    image: '/images/hero-gold-hoops.webp',
    imageAlt: 'Gold fan-shaped hoop earrings',
    category: 'earrings',
    inStock: true,
  },
]

/** Стартовые значения ползунка: весь каталог виден сразу */
export function getShopDefaultPriceRange() {
  const prices = shopProducts.map((product) => product.price)
  return {
    min: Math.min(...prices),
    max: SHOP_PRICE_MAX,
  }
}
