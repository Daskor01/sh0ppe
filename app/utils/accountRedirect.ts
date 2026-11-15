import type { RouteLocationRaw } from 'vue-router'

/** Без open-redirect: только относительные пути на том же origin. */
export function parseAccountRedirect(value: unknown): string | null {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) {
    return null
  }
  return value
}

export function resolveAfterAccountAuth(redirect: unknown): string {
  return parseAccountRedirect(redirect) ?? '/account'
}

function shouldAttachRedirect(fromFullPath: string): boolean {
  const pathOnly = fromFullPath.split('?')[0] ?? fromFullPath
  if (pathOnly === '/account') {
    return false
  }
  return !pathOnly.startsWith('/account/reset-password')
}

/** Ссылка на вход с возвратом на текущую страницу после авторизации. */
export function accountSignInRoute(fromFullPath: string): RouteLocationRaw {
  if (!shouldAttachRedirect(fromFullPath)) {
    return { path: '/account' }
  }
  return {
    path: '/account',
    query: { redirect: fromFullPath },
  }
}