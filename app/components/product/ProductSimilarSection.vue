<template>
  <section v-if="hasProducts" class="product-similar" aria-labelledby="similar-title">
    <h2 id="similar-title" class="product-similar__title">Similar Items</h2>

    <div class="product-similar__scroll">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        class="product-similar__card"
        :product="product"
      />
    </div>

    <NuxtLink to="/shop" class="product-similar__continue">
      Continue shopping
      <ChevronRight :size="18" aria-hidden="true" />
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
  import { ChevronRight } from '@lucide/vue'
  import type { Product } from '~/types/product'

  const props = defineProps<{
    products: Product[]
  }>()

  const hasProducts = computed(() => props.products.length > 0)
</script>

<style scoped lang="scss">
  .product-similar {
    @include mixins.container;
    padding-block: 40px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 56px 72px;
    }

    &__title {
      margin-bottom: 24px;
      font-size: clamp(22px, 4vw, 28px);
      font-weight: 500;
    }

    &__scroll {
      display: flex;
      gap: 16px;
      margin: 0;
      padding: 0 0 4px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;

      @include mixins.respond-to(lg) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px 20px;
        margin: 0;
        padding: 0;
        overflow: visible;
        scroll-snap-type: none;
      }
    }

    &__card {
      flex: 0 0 min(168px, 46vw);
      scroll-snap-align: start;

      @include mixins.respond-to(lg) {
        flex: unset;
      }
    }

    &__continue {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 20px;
      font-size: 14px;
      color: var(--color-accent);
      text-decoration: none;

      @include mixins.respond-to(lg) {
        display: none;
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }
  }
</style>
