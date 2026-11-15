<template>
  <aside class="cart-totals" aria-labelledby="cart-totals-title">
    <h2 id="cart-totals-title" class="cart-totals__title">Cart totals</h2>

    <dl class="cart-totals__rows">
      <div class="cart-totals__row">
        <dt>Subtotal</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
      <div v-if="discount > 0" class="cart-totals__row">
        <dt>Discount</dt>
        <dd>-{{ formatPrice(discount) }}</dd>
      </div>
      <div class="cart-totals__row cart-totals__row--shipping">
        <dt>Shipping</dt>
        <dd class="cart-totals__shipping-note">
          Shipping costs will be calculated once you have provided address.
        </dd>
      </div>
      <div class="cart-totals__row cart-totals__row--total">
        <dt>Total</dt>
        <dd>{{ formatPrice(total) }}</dd>
      </div>
    </dl>

    <NuxtLink v-slot="{ navigate }" to="/checkout" custom>
      <BaseButton
        variant="solid-black"
        class="cart-totals__checkout"
        @click="navigate"
        @keydown.enter="navigate"
      >
        Proceed to checkout
      </BaseButton>
    </NuxtLink>
  </aside>
</template>

<script setup lang="ts">
const { subtotal, discount, total, formatPrice } = useCartSummary()
</script>

<style scoped lang="scss">
.cart-totals {
  padding: 24px var(--gutter-mobile);
  background: var(--color-surface-muted);

  @include mixins.respond-to(lg) {
    padding: 28px 24px 32px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
  }

  &__title {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__rows {
    margin: 0 0 24px;
  }

  &__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    dt {
      margin: 0;
      font-weight: 500;
      color: var(--color-text);
    }

    dd {
      margin: 0;
      font-weight: 400;
      color: var(--color-text);
    }

    &--shipping {
      flex-direction: column;
      align-items: stretch;
      text-transform: none;
      letter-spacing: normal;
    }

    &--total {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      font-size: 16px;

      dd {
        font-weight: 600;
      }
    }
  }

  &__shipping-note {
    margin-top: 8px !important;
    font-size: 13px !important;
    line-height: 1.5;
    color: var(--color-text-muted) !important;
    text-transform: none;
  }

  &__checkout {
    margin-top: 8px;
  }
}
</style>
