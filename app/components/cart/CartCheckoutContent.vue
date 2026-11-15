<template>
  <div v-if="isCartEmpty" class="cart-checkout__empty">
    <p>Your cart is empty.</p>
    <button type="button" class="cart-checkout__continue" @click="onContinueShopping()">
      Continue shopping
    </button>
  </div>

  <div v-else class="cart-checkout">
    <ul class="cart-checkout__list">
      <li v-for="line in lines" :key="line.productId">
        <CartLineItem :line="line" variant="checkout" />
      </li>
    </ul>

    <CartCouponForm class="cart-checkout__coupon" />

    <CartTotalsPanel class="cart-checkout__aside" />
  </div>
</template>

<script setup lang="ts">
const { lines } = useCartSummary()
const router = useRouter()

const isCartEmpty = computed(() => lines.value.length === 0)

function onContinueShopping() {
  router.push('/shop')
}
</script>

<style scoped lang="scss">
.cart-checkout {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;

  @include mixins.respond-to(lg) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
    grid-template-areas:
      'list aside'
      'coupon aside';
    column-gap: 56px;
    row-gap: 0;
    align-items: start;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: 0;

    @include mixins.respond-to(lg) {
      grid-area: list;
    }
  }

  &__coupon {
    min-width: 0;
    padding-top: 8px;
    border-top: 1px solid var(--color-border);

    @include mixins.respond-to(lg) {
      grid-area: coupon;
      padding-top: 0;
      border-top: none;
    }
  }

  &__aside {
    min-width: 0;
    margin-top: 24px;

    @media (max-width: 1023px) {
      margin-inline: calc(-1 * var(--gutter-mobile));
    }

    @include mixins.respond-to(lg) {
      grid-area: aside;
      margin-top: 0;
      margin-inline: 0;
    }
  }

  &__empty {
    padding: 48px 0;
    font-size: 16px;
    color: var(--color-text-muted);
    text-align: center;
  }

  &__continue {
    @include mixins.link-accent;
    margin-top: 12px;
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>
