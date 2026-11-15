<template>
  <div class="header-actions" :class="rootClass">
    <button
      v-if="props.showSearch"
      type="button"
      class="header-actions__btn header-actions__search"
      aria-label="Search"
      data-header-search-trigger
      :aria-expanded="props.searchExpanded"
      @click="emit('searchClick')"
    >
      <Search :size="20" aria-hidden="true" />
    </button>
    <button
      type="button"
      class="header-actions__btn header-actions__cart"
      aria-label="Open cart"
      @click="openCart()"
    >
      <ShoppingCart :size="20" aria-hidden="true" />
      <span v-if="showCartBadge" class="header-actions__badge">
        {{ cart.totalItems }}
      </span>
    </button>
    <NuxtLink to="/account" class="header-actions__btn" aria-label="Account">
      <User :size="20" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Search, ShoppingCart, User } from '@lucide/vue'

const cart = useCartStore()
const { openCart } = useCartUi()

const props = withDefaults(
  defineProps<{
    showSearch?: boolean
    compact?: boolean
    searchExpanded?: boolean
  }>(),
  {
    showSearch: true,
    compact: false,
    searchExpanded: false,
  },
)

const emit = defineEmits<{
  searchClick: []
}>()

const rootClass = computed(() => ({
  'header-actions--compact': props.compact,
}))

const showCartBadge = computed(() => cart.totalItems > 0)
</script>

<style scoped lang="scss">
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;

  &--compact {
    gap: 16px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    position: relative;

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__badge {
    position: absolute;
    top: -2px;
    right: -6px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
    color: var(--light-colors-white---light);
    background: var(--color-text);
    border-radius: 999px;
  }
}
</style>
