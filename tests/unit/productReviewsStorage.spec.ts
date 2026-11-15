import { describe, expect, it } from 'vitest'
import { parseProductReviewsBySlug } from '~/utils/productReviewsStorage'

describe('parseProductReviewsBySlug', () => {
  it('parses valid entries', () => {
    const parsed = parseProductReviewsBySlug({
      'lira-earrings': [
        {
          id: 'u1',
          author: 'Ann',
          dateLabel: '1 Jan, 2026',
          rating: 5,
          body: 'Great',
        },
      ],
    })
    expect(parsed['lira-earrings']).toHaveLength(1)
    expect(parsed['lira-earrings']![0].author).toBe('Ann')
  })

  it('rejects invalid shapes', () => {
    expect(parseProductReviewsBySlug(null)).toEqual({})
    expect(parseProductReviewsBySlug({ slug: 'bad' })).toEqual({})
  })
})
