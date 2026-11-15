<template>
  <form
    ref="formRef"
    class="shop-filters-form"
    :class="formVariantClass"
    @submit.prevent
    @focusin="onFormFocusIn()"
    @focusout="onFormFocusOut($event)"
  >
    <template v-if="showShopSearch">
      <UiSearchField
        :id="searchId"
        v-model="inputQuery"
        placeholder="Search.."
        variant="underline"
        icon-position="end"
        @escape="inputQuery = ''"
        @submit="onSearchSubmit()"
      />

      <SearchRecentQueries
        :visible="showRecentQueries"
        :require-focus-on-mobile="false"
        :field-focused="searchFieldFocused"
      />
    </template>

    <UiBaseSelect
      v-model="filters.category"
      :options="categoryOptions"
      variant="underline"
      aria-label="Category"
    />

    <UiBaseSelect
      v-model="filters.sortBy"
      :options="sortOptions"
      variant="underline"
      aria-label="Sort by"
    />

    <ShopPriceRange v-model:min="filters.priceMin" v-model:max="filters.priceMax" />

    <div class="shop-filters-form__toggles">
      <UiBaseToggle v-model="filters.onSaleOnly" label="On sale" />
      <UiBaseToggle v-model="filters.inStockOnly" label="In stock" />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ShopSortOption } from '~/types/product'
import type { ShopCategoryFilter } from '~/utils/shopFilterQuery'
import type { BaseSelectOption } from '~/types/ui'

const props = withDefaults(
  defineProps<{
    variant?: 'sidebar' | 'drawer'
  }>(),
  {
    variant: 'sidebar',
  },
)

const filters = useShopFiltersStore()
const { inputQuery, submitSearch } = useSiteSearch()

const categoryOptions: BaseSelectOption<ShopCategoryFilter>[] = [
  { value: 'all', label: 'Category' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'hair-pins', label: 'Hair Pins' },
  { value: 'necklaces', label: 'Necklaces' },
]

const sortOptions: BaseSelectOption<ShopSortOption>[] = [
  { value: 'featured', label: 'Sort By' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
]

const showShopSearch = computed(() => props.variant === 'sidebar')

const searchId = 'shop-filter-search-sidebar'

const formVariantClass = computed(() => `shop-filters-form--${props.variant}`)

const showRecentQueries = computed(() => !inputQuery.value.trim())

function onSearchSubmit() {
  submitSearch()
}

const formRef = ref<HTMLElement | null>(null)
const searchFieldFocused = ref(false)

function onFormFocusIn() {
  if (!showShopSearch.value) {
    return
  }
  searchFieldFocused.value = true
}

function onFormFocusOut(event: FocusEvent) {
  if (!showShopSearch.value) {
    return
  }
  const root = formRef.value
  if (!root) {
    searchFieldFocused.value = false
    return
  }
  const next = event.relatedTarget
  if (next instanceof Node && root.contains(next)) {
    return
  }
  searchFieldFocused.value = false
}
</script>

<style scoped lang="scss">
.shop-filters-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__toggles {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 4px;
  }
}
</style>
