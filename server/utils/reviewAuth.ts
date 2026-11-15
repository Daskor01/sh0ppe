import type { H3Event } from 'h3'
import { getCookie } from 'h3'
import { ACCOUNT_MOCK_DISPLAY_NAME } from '~/data/accountMock'
import { ACCOUNT_SIGNED_IN_COOKIE } from '~/constants/session'

export function requireSignedInReviewer(event: H3Event): { displayName: string } {
  const signedIn = getCookie(event, ACCOUNT_SIGNED_IN_COOKIE)
  if (signedIn !== '1') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sign in to post a review.',
    })
  }
  return { displayName: ACCOUNT_MOCK_DISPLAY_NAME }
}