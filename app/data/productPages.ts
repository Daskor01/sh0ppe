import type { Product, ProductGalleryImage, ProductPageContent, ProductReview } from '~/types/product'
import { shopProducts } from '~/data/shop'

const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

const LOREM_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.'

const ADDITIONAL_INFO =
  'Material: 14k gold plated brass. Care: Avoid contact with water and perfume. Origin: Designed in-house, responsibly sourced.'

const CATEGORY_LABELS: Record<Product['category'], string[]> = {
  earrings: ['Fashion', 'Style'],
  'hair-pins': ['Fashion', 'Accessories'],
  necklaces: ['Fashion', 'Jewelry'],
}

const galleryOverrides: Partial<Record<string, string[]>> = {
  'lira-earrings': [
    '/images/product-lira.webp',
    '/images/product-ollie.webp',
    '/images/product-yuki.webp',
    '/images/product-kaede.webp',
  ],
  'hal-earrings': [
    '/images/product-ollie.webp',
    '/images/product-lira.webp',
    '/images/product-yuki.webp',
    '/images/product-kaede.webp',
  ],
}

function buildGallery(product: Product): ProductGalleryImage[] {
  const sources = galleryOverrides[product.slug] ?? [product.image]
  const padded = [...sources]
  while (padded.length < 4) {
    padded.push(product.image)
  }

  return padded.slice(0, 4).map((src, index) => ({
    id: `${product.id}-gallery-${index}`,
    src,
    alt: `${product.imageAlt} — view ${index + 1}`,
  }))
}

const REVIEW_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

const productReviews: Partial<Record<string, ProductReview[]>> = {
  'lira-earrings': [
    {
      id: 'lira-r1',
      author: 'Scarlet withch',
      dateLabel: '6 May, 2020',
      rating: 3,
      body: REVIEW_BODY,
    },
    {
      id: 'lira-r2',
      author: 'Emma stone',
      dateLabel: '12 June, 2020',
      rating: 5,
      body: REVIEW_BODY,
    },
    {
      id: 'lira-r3',
      author: 'John Doe',
      dateLabel: '3 July, 2020',
      rating: 4,
      body: REVIEW_BODY,
    },
    {
      id: 'lira-r4',
      author: 'Anna Lee',
      dateLabel: '19 August, 2020',
      rating: 5,
      body: REVIEW_BODY,
    },
    {
      id: 'lira-r5',
      author: 'Mark Twain',
      dateLabel: '1 September, 2020',
      rating: 2,
      body: REVIEW_BODY,
    },
    {
      id: 'lira-r6',
      author: 'Lucy Gray',
      dateLabel: '15 October, 2020',
      rating: 5,
      body: REVIEW_BODY,
    },
  ],
}

const pageOverrides: Partial<
  Record<string, Pick<ProductPageContent, 'sku' | 'rating'>>
> = {
  'lira-earrings': { sku: '12', rating: 5 },
  'hal-earrings': { sku: '18', rating: 5 },
}

function getReviewsForProduct(product: Product): ProductReview[] {
  return productReviews[product.slug] ?? []
}

export function getProductPageContent(product: Product): ProductPageContent {
  const override = pageOverrides[product.slug]
  const reviews = getReviewsForProduct(product)

  return {
    sku: override?.sku ?? product.id.toUpperCase(),
    categoryLabels: CATEGORY_LABELS[product.category],
    shortDescription: LOREM_SHORT,
    description: LOREM_BODY,
    additionalInformation: ADDITIONAL_INFO,
    rating: override?.rating ?? 4,
    reviewCount: reviews.length,
    reviews,
    gallery: buildGallery(product),
  }
}

export function getSimilarProducts(product: Product, limit = 3): Product[] {
  return shopProducts
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit)
}
