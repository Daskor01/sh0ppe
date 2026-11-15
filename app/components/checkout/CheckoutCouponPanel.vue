<template>
  <section class="checkout-coupon" aria-labelledby="checkout-coupon-title">
    <h2 id="checkout-coupon-title" class="checkout-coupon__heading">Coupon code</h2>
    <p class="checkout-coupon__intro">
      If you have a coupon code, please apply it below.
    </p>
    <CartCouponForm class="checkout-coupon__form" />
  </section>
</template>

<style scoped lang="scss">
.checkout-coupon {
  margin-bottom: 32px;
  padding: 20px 16px;
  border: 1px solid var(--color-border);

  @include mixins.respond-to(lg) {
    margin-bottom: 40px;
    padding: 24px 20px;
  }

  &__heading {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__intro {
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-muted);
  }

  &__form {
    padding-block: 0 !important;
  }

  &__form :deep(.cart-coupon) {
    padding-block: 0;
  }
}
</style>
