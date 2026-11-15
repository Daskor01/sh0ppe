<template>
  <div class="cart-page">
    <h1 class="cart-page__title">Shopping Cart</h1>
    <CartCheckoutContent />
  </div>
</template>

<script setup lang="ts">
import CartCheckoutContent from '~/components/cart/CartCheckoutContent.vue'

useSeoMeta({
  title: 'Shopping Cart — SHOPPE',
})
</script>

<style scoped lang="scss">
.cart-page {
  @include mixins.container;
  padding-block: 24px 56px;

  @include mixins.respond-to(lg) {
    padding-block: 48px 72px;
  }

  &__title {
    margin: 0 0 28px;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    color: var(--color-text);

    @include mixins.respond-to(lg) {
      margin-bottom: 40px;
    }
  }
}
</style>
