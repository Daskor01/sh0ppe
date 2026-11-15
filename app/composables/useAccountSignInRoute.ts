import { accountSignInRoute } from '~/utils/accountRedirect'

export function useAccountSignInRoute() {
  const route = useRoute()

  return computed(() => accountSignInRoute(route.fullPath))
}