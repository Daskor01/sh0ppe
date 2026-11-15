export type ProductCategory = 'earrings' | 'hair-pins' | 'necklaces'

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  compareAtPrice?: number
  discountPercent?: number
  image: string
  imageAlt: string
  category: ProductCategory
  inStock: boolean
  soldOut?: boolean
}

export interface HeroSlide {
  id: string
  title: string
  price: number
  image: string
  imageAlt: string
  productSlug: string
}

export type ShopSortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export interface ProductGalleryImage {
  id: string
  src: string
  alt: string
}

export interface ProductReview {
  id: string
  author: string
  dateLabel: string
  rating: number
  body: string
}

export interface ProductPageContent {
  sku: string
  categoryLabels: string[]
  shortDescription: string
  description: string
  additionalInformation: string
  rating: number
  reviewCount: number
  reviews: ProductReview[]
  gallery: ProductGalleryImage[]
}
