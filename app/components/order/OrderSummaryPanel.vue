<template>
  <section class="order-summary" aria-labelledby="order-summary-title">
    <h2 id="order-summary-title" class="order-summary__title">Order Summary</h2>

    <div class="order-summary__table">
      <div class="order-summary__head">
        <span>Product</span>
        <span>Total</span>
      </div>

      <ul class="order-summary__lines">
        <li v-for="line in order.lines" :key="line.productId">
          <span>{{ line.name }}</span>
          <span>{{ formatPrice(line.lineTotal) }}</span>
        </li>
      </ul>

      <dl class="order-summary__totals">
        <div class="order-summary__total-row">
          <dt>Subtotal</dt>
          <dd>{{ formatPrice(order.subtotal) }}</dd>
        </div>
        <div v-if="order.discount > 0" class="order-summary__total-row">
          <dt>Discount</dt>
          <dd>-{{ formatPrice(order.discount) }}</dd>
        </div>
        <div class="order-summary__total-row">
          <dt>Shipping</dt>
          <dd>Free shipping</dd>
        </div>
        <div class="order-summary__total-row order-summary__total-row--grand">
          <dt>Total</dt>
          <dd>{{ formatPrice(order.total) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PlacedOrder } from '~/types/order'

defineProps<{
  order: PlacedOrder
}>()

const { formatPrice } = useFormatPrice()
</script>

<style scoped lang="scss">
.order-summary {
  padding: 24px 20px;
  background: var(--color-surface-muted);

  @include mixins.respond-to(lg) {
    padding: 28px 24px 32px;
  }

  &__title {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 500;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-muted);
  }

  &__lines {
    margin: 0 0 16px;
    padding: 0 0 16px;
    list-style: none;
    border-bottom: 1px solid var(--color-border);

    li {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--color-text);
    }
  }

  &__totals {
    margin: 0;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    dt {
      margin: 0;
      font-weight: 500;
    }

    dd {
      margin: 0;
      text-transform: none;
      letter-spacing: normal;
    }

    &--grand {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      font-size: 16px;

      dd {
        font-weight: 600;
      }
    }
  }
}
</style>
