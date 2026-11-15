<template>
  <AccountShell>
    <div class="account-wishlist">
      <AccountEmptyBanner
        v-if="isWishlistEmpty"
        message="Your wishlist is empty."
      />
      <div v-else class="account-wishlist__grid">
        <ProductCard
          v-for="product in wishlistProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

definePageMeta({
  middleware: 'account-protected',
})

useSeoMeta({
  title: 'Wishlist — My account — SHOPPE',
})

const catalog = useCatalogStore()
const favorites = useFavoritesStore()

const wishlistProducts = computed(() => {
  if (!favorites.isHydrated) {
    return []
  }
  return favorites.favoriteIds
    .map((id) => catalog.allProducts.find((product) => product.id === id))
    .filter((product): product is Product => product != null)
})

const isWishlistEmpty = computed(() => wishlistProducts.value.length === 0)
</script>

<style scoped lang="scss">
.account-wishlist {
  width: 100%;

  &__grid {
    @include mixins.product-grid;
  }
}
</style>
