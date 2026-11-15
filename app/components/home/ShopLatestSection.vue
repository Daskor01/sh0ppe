<template>
  <section class="shop-latest" aria-labelledby="shop-latest-title">
    <div class="shop-latest__header">
      <h2 id="shop-latest-title" class="shop-latest__title">Shop The Latest</h2>
      <NuxtLink to="/shop" class="shop-latest__view-all">View All</NuxtLink>
    </div>

    <div class="shop-latest__grid">
      <ProductCard
        v-for="product in catalog.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/stores/useCatalogStore'

const catalog = useCatalogStore()
</script>

<style scoped lang="scss">
.shop-latest {
  @include mixins.container;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

    @include mixins.respond-to(lg) {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 500;
  }

  &__view-all {
    @include mixins.link-accent;
    font-size: 16px;
    white-space: nowrap;
  }

  &__grid {
    @include mixins.product-grid;
  }
}
</style>
