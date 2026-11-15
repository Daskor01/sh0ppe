<template>
  <div class="product-share">
    <UiFavoriteButton :product-id="productId" class="product-share__wishlist" />
    <span class="product-share__divider" aria-hidden="true" />
    <a
      class="product-share__link"
      :href="`mailto:?subject=${encodeURIComponent(productName)}`"
      aria-label="Share by email"
    >
      <Mail :size="18" aria-hidden="true" />
    </a>
    <a class="product-share__link" href="#" aria-label="Facebook">
      <IconsSocialIcons name="facebook" />
    </a>
    <a class="product-share__link" href="#" aria-label="Instagram">
      <IconsSocialIcons name="instagram" />
    </a>
    <a class="product-share__link" href="#" aria-label="Twitter">
      <IconsSocialIcons name="twitter" />
    </a>
  </div>
</template>

<script setup lang="ts">
  import { Mail } from '@lucide/vue'

  defineProps<{
    productId: string
    productName: string
  }>()
</script>

<style scoped lang="scss">
  .product-share {
    display: none;
    align-items: center;
    gap: 16px;

    @include mixins.respond-to(lg) {
      display: flex;
    }

    &__wishlist {
      flex-shrink: 0;
    }

    &__divider {
      width: 1px;
      height: 20px;
      background: var(--color-border);
    }

    &__link {
      display: inline-flex;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: color var(--transition-base);

      &:hover {
        color: var(--color-text);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }
  }
</style>
