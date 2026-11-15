import { pushRecentSearch, saveRecentSearches } from '~/utils/recentSearches'

export function useSiteSearch() {
  const route = useRoute()
  const filters = useShopFiltersStore()

  const inputQuery = useState('header-search', () => '')
  const recents = useState<string[]>('search-recent-queries', () => [])

  let syncingInput = false

  const isShopPage = computed(() => route.path === '/shop')

  function rememberSearch(query: string) {
    const next = pushRecentSearch(query, recents.value)
    recents.value = next
    saveRecentSearches(next)
  }

  function syncInputFromFilters() {
    if (!isShopPage.value) {
      return
    }
    syncingInput = true
    inputQuery.value = filters.search
    nextTick(() => {
      syncingInput = false
    })
  }

  watch(
    () => filters.search,
    () => {
      if (syncingInput || !isShopPage.value) {
        return
      }
      syncInputFromFilters()
    },
    { immediate: true },
  )

  watch(inputQuery, (value) => {
    if (syncingInput || !isShopPage.value) {
      return
    }
    if (filters.search !== value) {
      filters.search = value
    }
  })

  watch(
    () => route.path,
    (path, previousPath) => {
      if (previousPath === '/shop' && path !== '/shop') {
        inputQuery.value = ''
        return
      }
      if (path === '/shop') {
        syncInputFromFilters()
      }
    },
  )

  function applyRecent(query: string) {
    inputQuery.value = query
    rememberSearch(query)
    if (isShopPage.value) {
      filters.search = query
      return
    }
    return navigateTo({ path: '/shop', query: { q: query } })
  }

  function submitSearch() {
    const query = inputQuery.value.trim()
    if (!query) {
      return
    }
    rememberSearch(query)
    if (isShopPage.value) {
      filters.search = query
      return
    }
    return navigateTo({ path: '/shop', query: { q: query } })
  }

  const showRecents = computed(
    () => inputQuery.value.trim().length === 0 && recents.value.length > 0,
  )

  return {
    inputQuery,
    recents,
    showRecents,
    isShopPage,
    applyRecent,
    submitSearch,
    rememberSearch,
  }
}
