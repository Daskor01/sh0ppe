import { describe, expect, it } from 'vitest'
import { parseCreateProductReviewBody } from '~/utils/parseCreateProductReviewBody'

describe('parseCreateProductReviewBody', () => {
  it('accepts valid payload', () => {
    expect(parseCreateProductReviewBody({ body: 'Nice!', rating: 5 })).toEqual({
      body: 'Nice!',
      rating: 5,
    })
    expect(parseCreateProductReviewBody({ body: 'Ok', rating: 4, author: 'Alex' })).toEqual({
      body: 'Ok',
      rating: 4,
      author: 'Alex',
    })
  })

  it('rejects empty body and invalid rating', () => {
    expect(parseCreateProductReviewBody({ body: '   ', rating: 5 })).toBeNull()
    expect(parseCreateProductReviewBody({ body: 'Ok', rating: 0 })).toBeNull()
    expect(parseCreateProductReviewBody({ body: 'Ok', rating: 6 })).toBeNull()
    expect(parseCreateProductReviewBody(null)).toBeNull()
  })
})
