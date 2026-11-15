<template>
  <section class="order-details" aria-labelledby="order-details-title">
    <h2 id="order-details-title" class="order-details__title">Order Details</h2>

    <dl class="order-details__grid">
      <div class="order-details__row">
        <dt>Order number</dt>
        <dd>{{ order.orderNumber }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Email</dt>
        <dd>{{ order.email }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Payment method</dt>
        <dd>{{ order.paymentLabel }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Order date</dt>
        <dd>{{ formatOrderDate(order.orderDate) }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Delivery options</dt>
        <dd>{{ order.deliveryOption }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Delivery address</dt>
        <dd>{{ order.deliveryAddress }}</dd>
      </div>
      <div class="order-details__row">
        <dt>Contact number</dt>
        <dd>{{ order.contactNumber }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import type { PlacedOrder } from '~/types/order'

defineProps<{
  order: PlacedOrder
}>()

function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}
</script>

<style scoped lang="scss">
.order-details {
  padding: 24px 20px;
  background: var(--color-surface-muted);

  @include mixins.respond-to(lg) {
    padding: 28px 24px 32px;
    background: transparent;
    border: none;
    padding-inline: 0;
  }

  &__title {
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 500;
  }

  &__grid {
    margin: 0;
    display: grid;
    gap: 16px;

    @include mixins.respond-to(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px 48px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: minmax(120px, 140px) minmax(0, 1fr);
    gap: 12px 16px;
    font-size: 14px;

    @include mixins.respond-to(lg) {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    dt {
      margin: 0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-size: 12px;
      color: var(--color-text);
    }

    dd {
      margin: 0;
      line-height: 1.5;
      color: var(--color-text-muted);
    }
  }
}
</style>
