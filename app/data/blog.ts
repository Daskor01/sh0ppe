import type { BlogPost } from '~/types/blog'

const sharedExcerpt =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'

const sharedBody = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.`

export const BLOG_PAGE_SIZE = 4

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'top-trends-from-spring',
    title: 'Top Trends From Spring',
    category: 'Fashion',
    publishedAt: '2020-10-08',
    excerpt: sharedExcerpt,
    image: '/images/hero-gold-hoops.webp',
    imageAlt: 'Gold jewelry styled for a spring fashion editorial',
    body: sharedBody,
  },
  {
    id: 'b2',
    slug: 'everyday-earring-styling',
    title: 'Everyday Earring Styling',
    category: 'Fashion',
    publishedAt: '2020-10-08',
    excerpt: sharedExcerpt,
    image: '/images/product-lira.webp',
    imageAlt: 'Lira earrings on a minimal white background',
    body: sharedBody,
  },
  {
    id: 'b3',
    slug: 'layering-delicate-necklaces',
    title: 'Layering Delicate Necklaces',
    category: 'Fashion',
    publishedAt: '2020-10-08',
    excerpt: sharedExcerpt,
    image: '/images/product-necklace.webp',
    imageAlt: 'Delicate gold necklace close-up',
    body: sharedBody,
  },
  {
    id: 'b4',
    slug: 'hair-accessories-for-fall',
    title: 'Hair Accessories For Fall',
    category: 'Fashion',
    publishedAt: '2020-10-08',
    excerpt: sharedExcerpt,
    image: '/images/product-kaede.webp',
    imageAlt: 'Pearl hair pins arranged on a table',
    body: sharedBody,
  },
  {
    id: 'b5',
    slug: 'building-a-capsule-jewelry-box',
    title: 'Building A Capsule Jewelry Box',
    category: 'Fashion',
    publishedAt: '2020-09-22',
    excerpt: sharedExcerpt,
    image: '/images/product-ollie.webp',
    imageAlt: 'Gold earrings for a capsule wardrobe',
    body: sharedBody,
  },
  {
    id: 'b6',
    slug: 'gift-guide-for-the-holidays',
    title: 'Gift Guide For The Holidays',
    category: 'Fashion',
    publishedAt: '2020-09-22',
    excerpt: sharedExcerpt,
    image: '/images/product-yuki.webp',
    imageAlt: 'Hair pin set packaged as a gift',
    body: sharedBody,
  },
  {
    id: 'b7',
    slug: 'metals-and-care-basics',
    title: 'Metals And Care Basics',
    category: 'Fashion',
    publishedAt: '2020-09-22',
    excerpt: sharedExcerpt,
    image: '/images/product-hair-pin-set.webp',
    imageAlt: 'Hair accessories with gold finish',
    body: sharedBody,
  },
  {
    id: 'b8',
    slug: 'behind-the-shoppe-collection',
    title: 'Behind The Shoppe Collection',
    category: 'Fashion',
    publishedAt: '2020-09-22',
    excerpt: sharedExcerpt,
    image: '/images/hero-gold-hoops.webp',
    imageAlt: 'Editorial photo from the Shoppe collection',
    body: sharedBody,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export function getBlogTotalPages(): number {
  return Math.max(1, Math.ceil(blogPosts.length / BLOG_PAGE_SIZE))
}

export function getBlogPostsForPage(page: number): BlogPost[] {
  const totalPages = getBlogTotalPages()
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * BLOG_PAGE_SIZE
  return blogPosts.slice(start, start + BLOG_PAGE_SIZE)
}
