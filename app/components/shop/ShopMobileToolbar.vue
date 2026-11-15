<template>
  <div class="shop-mobile-toolbar">
    <h1 class="shop-mobile-toolbar__title">Shop</h1>
    <button type="button" class="shop-mobile-toolbar__filters" @click="filters.openMobilePanel()">
      <SlidersHorizontal :size="18" aria-hidden="true" />
      Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { SlidersHorizontal } from '@lucide/vue'

const filters = useShopFiltersStore()
</script>

<style scoped lang="scss">
.shop-mobile-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 12px 16px;
  border-bottom: 1px solid var(--color-border);

  @include mixins.respond-to(lg) {
    display: none;
  }

  &__title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__filters {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--color-accent);
    background: transparent;
    cursor: pointer;
    transition: opacity var(--transition-base);

    &:hover {
      opacity: 0.78;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>