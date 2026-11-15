import { shopProducts } from '~/data/shop'

export function assertKnownProductSlug(slug: string | undefined): string {
  if (!slug || !shopProducts.some((product) => product.slug === slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return slug
}