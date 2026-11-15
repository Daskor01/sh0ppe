<template>
  <div class="shop-price-range">
    <div
      ref="sliderRef"
      class="shop-price-range__slider"
      role="group"
      :aria-label="`Price from ${formatPrice(min)} to ${formatPrice(max)}`"
      @pointerdown="onPointerDown($event)"
      @pointermove="onPointerMove($event)"
      @pointerup="onPointerUp($event)"
      @pointercancel="onPointerUp($event)"
    >
      <div class="shop-price-range__track" aria-hidden="true" />
      <div class="shop-price-range__fill" :style="fillStyle" aria-hidden="true" />
      <span
        class="shop-price-range__thumb shop-price-range__thumb--min"
        :style="{ left: `${minPercent}%` }"
        aria-hidden="true"
      />
      <span
        class="shop-price-range__thumb shop-price-range__thumb--max"
        :style="{ left: `${maxPercent}%` }"
        aria-hidden="true"
      />
    </div>
    <p class="shop-price-range__label">Price: {{ formatPrice(min) }} - {{ formatPrice(max) }}</p>
    <input
      class="shop-price-range__sr"
      type="range"
      :min="SHOP_PRICE_MIN"
      :max="SHOP_PRICE_MAX"
      step="1"
      :value="min"
      aria-label="Minimum price"
      @input="onMinInput($event)"
    />
    <input
      class="shop-price-range__sr"
      type="range"
      :min="SHOP_PRICE_MIN"
      :max="SHOP_PRICE_MAX"
      step="1"
      :value="max"
      aria-label="Maximum price"
      @input="onMaxInput($event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { SHOP_PRICE_MAX, SHOP_PRICE_MIN } from '~/data/shop'

  const min = defineModel<number>('min', { required: true })
  const max = defineModel<number>('max', { required: true })

  const { formatPrice } = useFormatPrice()

  const sliderRef = ref<HTMLElement | null>(null)
  const dragging = ref<'min' | 'max' | null>(null)

  const span = SHOP_PRICE_MAX - SHOP_PRICE_MIN

  const minPercent = computed(() => ((min.value - SHOP_PRICE_MIN) / span) * 100)
  const maxPercent = computed(() => ((max.value - SHOP_PRICE_MIN) / span) * 100)

  const fillStyle = computed(() => ({
    left: `${minPercent.value}%`,
    right: `${100 - maxPercent.value}%`,
  }))

  function onMinInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    min.value = Math.min(value, max.value)
  }

  function onMaxInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value)
    max.value = Math.max(value, min.value)
  }

  function valueFromClientX(clientX: number): number {
    const el = sliderRef.value
    if (!el) {
      return SHOP_PRICE_MIN
    }
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) {
      return SHOP_PRICE_MIN
    }
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.round(SHOP_PRICE_MIN + ratio * span)
  }

  function pickThumb(clientX: number): 'min' | 'max' {
    const at = valueFromClientX(clientX)
    const distMin = Math.abs(at - min.value)
    const distMax = Math.abs(at - max.value)
    if (distMin === distMax) {
      return at <= (min.value + max.value) / 2 ? 'min' : 'max'
    }
    return distMin < distMax ? 'min' : 'max'
  }

  function applyThumbValue(thumb: 'min' | 'max', value: number) {
    if (thumb === 'min') {
      min.value = Math.min(value, max.value)
      return
    }
    max.value = Math.max(value, min.value)
  }

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) {
      return
    }
    dragging.value = pickThumb(event.clientX)
    applyThumbValue(dragging.value, valueFromClientX(event.clientX))
    sliderRef.value?.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging.value) {
      return
    }
    applyThumbValue(dragging.value, valueFromClientX(event.clientX))
  }

  function onPointerUp(event: PointerEvent) {
    if (sliderRef.value?.hasPointerCapture(event.pointerId)) {
      sliderRef.value.releasePointerCapture(event.pointerId)
    }
    dragging.value = null
  }
</script>

<style scoped lang="scss">
  .shop-price-range {
    &__slider {
      position: relative;
      height: 24px;
      margin-bottom: 12px;
      touch-action: none;
      cursor: pointer;
      user-select: none;

      @media (pointer: coarse) {
        height: 44px;
      }
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
      pointer-events: none;
    }

    &__fill {
      position: absolute;
      top: 50%;
      height: 2px;
      transform: translateY(-50%);
      background: var(--color-text);
      border-radius: 1px;
      pointer-events: none;
    }

    &__thumb {
      position: absolute;
      top: 50%;
      width: 4px;
      height: 16px;
      transform: translate(-50%, -50%);
      background: var(--color-text);
      border-radius: 1px;
      pointer-events: none;

      @media (pointer: coarse) {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: 0 0 0 2px var(--color-surface);
      }
    }

    &__label {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-muted);
    }

    &__sr {
      @include mixins.visually-hidden;
    }
  }
</style>
