<template>
  <div class="product-quantity">
    <button
      type="button"
      class="product-quantity__btn"
      aria-label="Decrease quantity"
      :disabled="quantity <= 1"
      @click="decrement()"
    >
      <Minus :size="16" aria-hidden="true" />
    </button>
    <span class="product-quantity__value" aria-live="polite">{{ quantity }}</span>
    <button
      type="button"
      class="product-quantity__btn"
      aria-label="Increase quantity"
      @click="increment()"
    >
      <Plus :size="16" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from '@lucide/vue'

const quantity = defineModel<number>({ default: 1 })

function decrement() {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

function increment() {
  quantity.value += 1
}
</script>

<style scoped lang="scss">
.product-quantity {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: 96px;
  padding: 10px 12px;
  background: var(--color-surface-muted);
  border-radius: var(--radius-sm);

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__value {
    min-width: 24px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
}
</style>
