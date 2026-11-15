<template>
  <div class="shop-page">
    <div class="shop-page__layout">
      <ShopSidebar class="shop-page__sidebar" />

      <div class="shop-page__main" :class="shopMainClass">
        <div v-if="hasFilteredProducts" class="shop-page__grid">
          <ProductCard
            v-for="product in filters.filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <p v-else class="shop-page__empty">No products match your selected filters.</p>
      </div>
    </div>

    <ShopMobileFilters />
  </div>
</template>

<script setup lang="ts">
  import ProductCard from '~/components/product/ProductCard.vue'
  import ShopMobileFilters from '~/components/shop/ShopMobileFilters.vue'
  import ShopSidebar from '~/components/shop/ShopSidebar.vue'
  useSeoMeta({
    title: 'Shop — SHOPPE',
    description:
      'Browse earrings, hair pins and necklaces. Filter by category, price and availability.',
  })

  const filters = useShopFiltersStore()

  useShopFiltersQuery()

  const hasFilteredProducts = computed(() => filters.filteredProducts.length > 0)

  const shopMainClass = computed(() => ({
    'shop-page__main--empty': !hasFilteredProducts.value,
  }))
</script>

<style scoped lang="scss">
  .shop-page {
    padding-block: 16px 48px;

    @include mixins.respond-to(lg) {
      padding-block: 40px 64px;
    }

    &__layout {
      @include mixins.container;
      display: grid;
      gap: 32px;

      @include mixins.respond-to(lg) {
        grid-template-columns: minmax(240px, 300px) 1fr;
        gap: 40px 48px;
        align-items: start;
      }
    }

    &__sidebar {
      display: none;

      @include mixins.respond-to(lg) {
        display: block;
      }
    }

    &__main {
      @include mixins.respond-to(lg) {
        min-height: 420px;
      }

      &--empty {
        @include mixins.respond-to(lg) {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }

    &__grid {
      @include mixins.product-grid;
    }

    &__empty {
      margin: 24px 0 0;
      font-size: 14px;
      line-height: 1.5;
      color: var(--color-text-muted);
      text-align: center;

      @include mixins.respond-to(lg) {
        margin: 0;
        max-width: 320px;
        font-size: 15px;
      }
    }
  }
</style>
