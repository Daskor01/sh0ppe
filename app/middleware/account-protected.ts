import { ACCOUNT_SIGNED_IN_COOKIE } from '~/constants/session'
import { accountSignInRoute } from '~/utils/accountRedirect'

const PROTECTED_PATHS = [
  '/account/orders',
  '/account/wishlist',
  '/account/addresses',
  '/account/details',
]

export default defineNuxtRouteMiddleware((to) => {
  if (!PROTECTED_PATHS.includes(to.path)) {
    return
  }

  const signedInCookie = useCookie<string | null>(ACCOUNT_SIGNED_IN_COOKIE)
  const signedIn = signedInCookie.value === '1'

  if (import.meta.client) {
    const { isSignedIn, syncFromCookie } = useAccountSession()
    if (signedIn) {
      syncFromCookie()
    }
    if (!isSignedIn.value) {
      return navigateTo(accountSignInRoute(to.fullPath))
    }
    return
  }

  if (!signedIn) {
    return navigateTo(accountSignInRoute(to.fullPath))
  }
})
