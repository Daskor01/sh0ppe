import type { H3Event } from 'h3'
import { getCookie } from 'h3'
import { ACCOUNT_MOCK_DISPLAY_NAME } from '~/data/accountMock'
import { ACCOUNT_SIGNED_IN_COOKIE } from '~/constants/session'
import type { CreateProductReviewBody } from '~/types/productReviewApi'

export function isAccountSignedIn(event: H3Event): boolean {
  return getCookie(event, ACCOUNT_SIGNED_IN_COOKIE) === '1'
}

export function resolveReviewAuthor(event: H3Event, payload: CreateProductReviewBody): string {
  if (isAccountSignedIn(event)) {
    return ACCOUNT_MOCK_DISPLAY_NAME
  }
  if (!payload.author) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Author name is required.',
    })
  }
  return payload.author
}
