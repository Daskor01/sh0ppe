import { getShopDefaultPriceRange } from '~/data/shop'
import {
  buildShopFilterQuery,
  hasShopFilterQueryKeys,
  parseShopFilterQuery,
  pickShopFilterQuery,
  shopFilterQueriesEqual,
} from '~/utils/shopFilterQuery'

const SEARCH_QUERY_DEBOUNCE_MS = 400

export function useShopFiltersQuery() {
  const route = useRoute()
  const router = useRouter()
  const filters = useShopFiltersStore()
  const defaultPriceRange = getShopDefaultPriceRange()

  let syncingFromRoute = false
  let syncingToRoute = false
  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

  function applyRouteQueryToStore() {
    if (route.path !== '/shop') {
      return
    }

    if (!hasShopFilterQueryKeys(route.query)) {
      filters.resetFilters()
      return
    }

    const state = parseShopFilterQuery(route.query, defaultPriceRange)
    filters.applyShareState(state)
  }

  function pushStoreToRoute() {
    if (route.path !== '/shop' || syncingFromRoute) {
      return
    }

    const state = {
      search: filters.search,
      category: filters.category,
      sortBy: filters.sortBy,
      priceMin: filters.filterPriceMin,
      priceMax: filters.filterPriceMax,
      onSaleOnly: filters.onSaleOnly,
      inStockOnly: filters.inStockOnly,
    }

    const nextQuery = buildShopFilterQuery(state, defaultPriceRange)
    const currentQuery = pickShopFilterQuery(route.query)

    if (shopFilterQueriesEqual(currentQuery, nextQuery)) {
      return
    }

    syncingToRoute = true
    router
      .replace({ path: '/shop', query: nextQuery })
      .finally(() => {
        syncingToRoute = false
      })
  }

  function schedulePushStoreToRoute() {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer)
    }
    searchDebounceTimer = setTimeout(() => {
      searchDebounceTimer = null
      pushStoreToRoute()
    }, SEARCH_QUERY_DEBOUNCE_MS)
  }

  watch(
    () => route.query,
    () => {
      if (syncingToRoute) {
        return
      }
      syncingFromRoute = true
      applyRouteQueryToStore()
      nextTick(() => {
        syncingFromRoute = false
      })
    },
    { immediate: true },
  )

  watch(
    () => [
      filters.category,
      filters.sortBy,
      filters.filterPriceMin,
      filters.filterPriceMax,
      filters.onSaleOnly,
      filters.inStockOnly,
    ],
    () => {
      if (syncingFromRoute) {
        return
      }
      pushStoreToRoute()
    },
  )

  watch(
    () => filters.search,
    () => {
      if (syncingFromRoute) {
        return
      }
      schedulePushStoreToRoute()
    },
  )

  onUnmounted(() => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer)
      searchDebounceTimer = null
    }
  })
}
