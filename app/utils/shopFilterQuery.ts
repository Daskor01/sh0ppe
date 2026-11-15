import type { LocationQuery, LocationQueryValue } from 'vue-router'
import type { ProductCategory, ShopSortOption } from '~/types/product'
import { SHOP_PRICE_MAX, SHOP_PRICE_MIN } from '~/data/shop'

export type ShopCategoryFilter = ProductCategory | 'all'

export const SHOP_FILTER_QUERY_KEYS = ['q', 'category', 'sort', 'min', 'max', 'sale', 'stock'] as const

export type ShopFiltersShareState = {
  search: string
  category: ShopCategoryFilter
  sortBy: ShopSortOption
  priceMin: number
  priceMax: number
  onSaleOnly: boolean
  inStockOnly: boolean
}

const CATEGORIES: ProductCategory[] = ['earrings', 'hair-pins', 'necklaces']
const SORT_OPTIONS: ShopSortOption[] = ['featured', 'price-asc', 'price-desc', 'name']

function firstQueryValue(value: LocationQueryValue | LocationQueryValue[] | undefined): string | undefined {
  if (value == null) {
    return undefined
  }
  if (Array.isArray(value)) {
    return value[0] ?? undefined
  }
  return value
}

function parseCategory(raw: string | undefined): ShopCategoryFilter | undefined {
  if (!raw) {
    return undefined
  }
  if (raw === 'all') {
    return 'all'
  }
  return CATEGORIES.includes(raw as ProductCategory) ? (raw as ProductCategory) : undefined
}

function parseSort(raw: string | undefined): ShopSortOption | undefined {
  if (!raw) {
    return undefined
  }
  return SORT_OPTIONS.includes(raw as ShopSortOption) ? (raw as ShopSortOption) : undefined
}

function parsePrice(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined
  }
  const value = Number(raw)
  if (!Number.isFinite(value)) {
    return undefined
  }
  return Math.min(SHOP_PRICE_MAX, Math.max(SHOP_PRICE_MIN, Math.round(value)))
}

export function hasShopFilterQueryKeys(query: LocationQuery): boolean {
  return SHOP_FILTER_QUERY_KEYS.some((key) => firstQueryValue(query[key]) != null)
}

export function parseShopFilterQuery(
  query: LocationQuery,
  defaults: { min: number; max: number },
): ShopFiltersShareState {
  const minRaw = firstQueryValue(query.min)
  const maxRaw = firstQueryValue(query.max)

  let priceMin = parsePrice(minRaw) ?? defaults.min
  let priceMax = parsePrice(maxRaw) ?? defaults.max
  if (priceMin > priceMax) {
    ;[priceMin, priceMax] = [priceMax, priceMin]
  }

  return {
    search: firstQueryValue(query.q)?.trim() ?? '',
    category: parseCategory(firstQueryValue(query.category)) ?? 'all',
    sortBy: parseSort(firstQueryValue(query.sort)) ?? 'featured',
    priceMin,
    priceMax,
    onSaleOnly: firstQueryValue(query.sale) === '1',
    inStockOnly: firstQueryValue(query.stock) === '1',
  }
}

export function buildShopFilterQuery(
  state: ShopFiltersShareState,
  defaults: { min: number; max: number },
): Record<string, string> {
  const query: Record<string, string> = {}

  const search = state.search.trim()
  if (search) {
    query.q = search
  }

  if (state.category !== 'all') {
    query.category = state.category
  }

  if (state.sortBy !== 'featured') {
    query.sort = state.sortBy
  }

  if (state.priceMin !== defaults.min) {
    query.min = String(state.priceMin)
  }

  if (state.priceMax !== defaults.max) {
    query.max = String(state.priceMax)
  }

  if (state.onSaleOnly) {
    query.sale = '1'
  }

  if (state.inStockOnly) {
    query.stock = '1'
  }

  return query
}

export function shopFilterQueriesEqual(
  a: Record<string, string>,
  b: Record<string, string>,
): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if ((a[key] ?? '') !== (b[key] ?? '')) {
      return false
    }
  }
  return true
}

export function pickShopFilterQuery(query: LocationQuery): Record<string, string> {
  const picked: Record<string, string> = {}
  for (const key of SHOP_FILTER_QUERY_KEYS) {
    const value = firstQueryValue(query[key])
    if (value != null && value !== '') {
      picked[key] = value
    }
  }
  return picked
}
