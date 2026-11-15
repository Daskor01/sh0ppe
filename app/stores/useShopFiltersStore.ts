import { defineStore } from 'pinia'
import type { ShopSortOption } from '~/types/product'
import { getShopDefaultPriceRange, shopProducts } from '~/data/shop'
import { hasSale } from '~/utils/productPrice'
import type { ShopCategoryFilter, ShopFiltersShareState } from '~/utils/shopFilterQuery'
import { assertNever } from '~/utils/assertNever'

const defaultPriceRange = getShopDefaultPriceRange()

const PRICE_FILTER_DEBOUNCE_MS = 300

export const useShopFiltersStore = defineStore('shopFilters', () => {
  const search = ref('')
  const category = ref<ShopCategoryFilter>('all')
  const sortBy = ref<ShopSortOption>('featured')
  const priceMin = ref(defaultPriceRange.min)
  const priceMax = ref(defaultPriceRange.max)
  const filterPriceMin = ref(defaultPriceRange.min)
  const filterPriceMax = ref(defaultPriceRange.max)
  const onSaleOnly = ref(false)
  const inStockOnly = ref(false)
  const mobilePanelOpen = ref(false)

  let priceDebounceTimer: ReturnType<typeof setTimeout> | null = null

  function commitPriceFilter() {
    let minVal = priceMin.value
    let maxVal = priceMax.value
    if (minVal > maxVal) {
      minVal = priceMax.value
      maxVal = priceMin.value
      priceMin.value = minVal
      priceMax.value = maxVal
    }
    filterPriceMin.value = minVal
    filterPriceMax.value = maxVal
  }

  function schedulePriceFilterCommit() {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer)
    }
    priceDebounceTimer = setTimeout(() => {
      commitPriceFilter()
      priceDebounceTimer = null
    }, PRICE_FILTER_DEBOUNCE_MS)
  }

  watch([priceMin, priceMax], schedulePriceFilterCommit)

  const filteredProducts = computed(() => {
    let list = shopProducts.filter((product) => {
      const query = search.value.trim().toLowerCase()
      if (query && !product.name.toLowerCase().includes(query)) {
        return false
      }
      if (category.value !== 'all' && product.category !== category.value) {
        return false
      }
      if (product.price < filterPriceMin.value || product.price > filterPriceMax.value) {
        return false
      }
      if (onSaleOnly.value && !hasSale(product)) {
        return false
      }
      if (inStockOnly.value && !product.inStock) {
        return false
      }
      return true
    })

    list = [...list]

    switch (sortBy.value) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
        break
      default:
        assertNever(sortBy.value)
    }

    return list
  })

  function openMobilePanel() {
    mobilePanelOpen.value = true
  }

  function closeMobilePanel() {
    mobilePanelOpen.value = false
  }

  function resetFilters() {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer)
      priceDebounceTimer = null
    }
    search.value = ''
    category.value = 'all'
    sortBy.value = 'featured'
    priceMin.value = defaultPriceRange.min
    priceMax.value = defaultPriceRange.max
    filterPriceMin.value = defaultPriceRange.min
    filterPriceMax.value = defaultPriceRange.max
    onSaleOnly.value = false
    inStockOnly.value = false
  }

  function applyShareState(state: ShopFiltersShareState) {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer)
      priceDebounceTimer = null
    }
    search.value = state.search
    category.value = state.category
    sortBy.value = state.sortBy
    priceMin.value = state.priceMin
    priceMax.value = state.priceMax
    onSaleOnly.value = state.onSaleOnly
    inStockOnly.value = state.inStockOnly
    commitPriceFilter()
  }

  return {
    search,
    category,
    sortBy,
    priceMin,
    priceMax,
    filterPriceMin,
    filterPriceMax,
    onSaleOnly,
    inStockOnly,
    mobilePanelOpen,
    filteredProducts,
    openMobilePanel,
    closeMobilePanel,
    resetFilters,
    applyShareState,
  }
})
