<template>
  <div class="shop-price-range" :class="{ 'shop-price-range--coarse': coarsePointer }">
    <div
      ref="sliderRef"
      class="shop-price-range__slider"
      @pointerdown="onSliderPointerDown($event)"
      @pointermove="onSliderPointerMove($event)"
      @pointerup="onSliderPointerUp($event)"
      @pointercancel="onSliderPointerUp($event)"
    >
      <div class="shop-price-range__track" />
      <div class="shop-price-range__fill" :style="trackStyle" />
      <input
        class="shop-price-range__input shop-price-range__input--min"
        type="range"
        :min="SHOP_PRICE_MIN"
        :max="SHOP_PRICE_MAX"
        step="1"
        :value="min"
        :tabindex="coarsePointer ? -1 : 0"
        aria-label="Minimum price"
        @input="onMinInput($event)"
      />
      <input
        class="shop-price-range__input shop-price-range__input--max"
        type="range"
        :min="SHOP_PRICE_MIN"
        :max="SHOP_PRICE_MAX"
        step="1"
        :value="max"
        :tabindex="coarsePointer ? -1 : 0"
        aria-label="Maximum price"
        @input="onMaxInput($event)"
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

  const sliderRef = ref<HTMLElement | null>(null)
  const coarsePointer = ref(false)
  const dragging = ref<'min' | 'max' | null>(null)

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
    return Math.round(SHOP_PRICE_MIN + ratio * (SHOP_PRICE_MAX - SHOP_PRICE_MIN))
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

  function onSliderPointerDown(event: PointerEvent) {
    if (!coarsePointer.value || event.button !== 0) {
      return
    }
    dragging.value = pickThumb(event.clientX)
    applyThumbValue(dragging.value, valueFromClientX(event.clientX))
    sliderRef.value?.setPointerCapture(event.pointerId)
  }

  function onSliderPointerMove(event: PointerEvent) {
    if (!dragging.value) {
      return
    }
    applyThumbValue(dragging.value, valueFromClientX(event.clientX))
  }

  function onSliderPointerUp(event: PointerEvent) {
    if (sliderRef.value?.hasPointerCapture(event.pointerId)) {
      sliderRef.value.releasePointerCapture(event.pointerId)
    }
    dragging.value = null
  }

  let coarseMedia: MediaQueryList | null = null

  function syncCoarsePointer() {
    if (!import.meta.client) {
      return
    }
    coarsePointer.value = window.matchMedia('(pointer: coarse)').matches
  }

  onMounted(() => {
    syncCoarsePointer()
    coarseMedia = window.matchMedia('(pointer: coarse)')
    coarseMedia.addEventListener('change', syncCoarsePointer)
  })

  onUnmounted(() => {
    coarseMedia?.removeEventListener('change', syncCoarsePointer)
  })
</script>

<style scoped lang="scss">
  .shop-price-range {
    &__slider {
      position: relative;
      height: 24px;
      margin-bottom: 12px;
    }

    &--coarse &__slider {
      height: 44px;
      touch-action: none;
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

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      pointer-events: none;
      appearance: none;
      background: transparent;

      &::-webkit-slider-runnable-track {
        appearance: none;
        height: 2px;
        background: transparent;
      }

      &::-moz-range-track {
        height: 2px;
        background: transparent;
        border: none;
      }

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

    &--coarse &__input {
      pointer-events: none;

      &::-webkit-slider-thumb {
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-top: -9px;
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--color-text);
      }

      &::-moz-range-thumb {
        pointer-events: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--color-text);
      }
    }

    &__label {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-muted);
    }
  }
</style>