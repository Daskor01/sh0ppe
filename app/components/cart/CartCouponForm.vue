<template>
  <form class="cart-coupon" @submit.prevent="onApply()">
    <div class="cart-coupon__field">
      <label class="visually-hidden" for="cart-coupon-code">Coupon Code</label>
      <input
        id="cart-coupon-code"
        v-model="couponInput"
        class="cart-coupon__input"
        type="text"
        name="coupon"
        placeholder="Coupon Code"
        autocomplete="off"
      />
    </div>

    <BaseButton
      type="submit"
      variant="solid-black"
      :block="false"
      class="cart-coupon__btn"
    >
      Apply coupon
    </BaseButton>

    <p v-if="couponMessage" class="cart-coupon__message" role="status">
      {{ couponMessage }}
    </p>
  </form>
</template>

<script setup lang="ts">
const cart = useCartStore()
const { couponInput, couponMessage } = storeToRefs(cart)

function onApply() {
  cart.applyCoupon()
}
</script>

<style scoped lang="scss">
.cart-coupon {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding-block: 24px 8px;

  @include mixins.respond-to(lg) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    column-gap: 24px;
    row-gap: 12px;
    padding-block: 32px 0;
  }

  &__field {
    min-width: 0;
    grid-column: 1;
  }

  &__input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.4;
    color: var(--color-text);
    background: transparent;

    &::placeholder {
      color: var(--color-text-muted);
      opacity: 1;
    }

    &:focus {
      outline: none;
      border-bottom-color: var(--color-text);
    }
  }

  &__btn {
    width: 100%;
    min-width: 0;

    @include mixins.respond-to(lg) {
      width: auto;
      min-width: 200px;
      grid-column: 2;
      grid-row: 1;
      align-self: end;
    }
  }

  &__message {
    margin: 0;
    grid-column: 1 / -1;
    font-size: 13px;
    color: var(--color-text-muted);
  }
}

.visually-hidden {
  @include mixins.visually-hidden;
}
</style>
