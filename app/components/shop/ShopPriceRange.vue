<template>
  <div class="shop-price-range">
    <div class="shop-price-range__slider">
      <div class="shop-price-range__track" />
      <div class="shop-price-range__fill" :style="trackStyle" />
      <input
        class="shop-price-range__input shop-price-range__input--min"
        type="range"
        :min="SHOP_PRICE_MIN"
        :max="SHOP_PRICE_MAX"
        :value="min"
        aria-label="Minimum price"
        @input="onMinInput"
      />
      <input
        class="shop-price-range__input shop-price-range__input--max"
        type="range"
        :min="SHOP_PRICE_MIN"
        :max="SHOP_PRICE_MAX"
        :value="max"
        aria-label="Maximum price"
        @input="onMaxInput"
      />
    </div>
    <p class="shop-price-range__label">Price: {{ formatPrice(min) }} - {{ formatPrice(max) }}</p>
  </div>
</template>

<script setup lang="ts">
  import { SHOP_PRICE_MAX, SHOP_PRICE_MIN } from '~/data/shop'

  const min = defineModel<number>('min', { required: true })
  const max = defineModel<number>('max', { required: true })

  const { formatPrice } = useFormatPrice()

  const trackStyle = computed(() => {
    const range = SHOP_PRICE_MAX - SHOP_PRICE_MIN
    const left = ((min.value - SHOP_PRICE_MIN) / range) * 100
    const right = 100 - ((max.value - SHOP_PRICE_MIN) / range) * 100
    return {
      left: `${left}%`,
      right: `${right}%`,
    }
  })

  function onMinInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    min.value = Math.min(value, max.value)
  }

  function onMaxInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    max.value = Math.max(value, min.value)
  }
</script>

<style scoped lang="scss">
  .shop-price-range {
    &__slider {
      position: relative;
      height: 24px;
      margin-bottom: 12px;
    }

    &__track {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      transform: translateY(-50%);
      background: var(--color-border);
      border-radius: 1px;
    }

    &__fill {
      position: absolute;
      top: 50%;
      height: 2px;
      transform: translateY(-50%);
      background: var(--color-text);
      border-radius: 1px;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 24px;
      margin: 0;
      pointer-events: none;
      appearance: none;
      background: transparent;

      &::-webkit-slider-thumb {
        pointer-events: auto;
        appearance: none;
        width: 4px;
        height: 16px;
        border: none;
        border-radius: 1px;
        background: var(--color-text);
        cursor: pointer;
      }

      &::-moz-range-thumb {
        pointer-events: auto;
        width: 4px;
        height: 16px;
        border: none;
        border-radius: 1px;
        background: var(--color-text);
        cursor: pointer;
      }

      &--max {
        z-index: 2;
      }
    }

    &__label {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-muted);
    }
  }
</style>
