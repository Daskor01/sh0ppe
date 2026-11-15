<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div
        v-if="open"
        class="product-reviews-dialog__backdrop"
        aria-hidden="true"
        @click="emit('close')"
        @touchmove.prevent
      />
    </Transition>
    <Transition name="product-reviews-slide">
      <div
        v-if="open"
        class="product-reviews-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-reviews-dialog-title"
      >
        <header class="product-reviews-dialog__head">
          <h2 id="product-reviews-dialog-title" class="product-reviews-dialog__title">
            Add a Review
          </h2>
          <button
            type="button"
            class="product-reviews-dialog__close"
            aria-label="Close"
            @click="emit('close')"
          >
            <X :size="24" aria-hidden="true" />
          </button>
        </header>
        <div class="product-reviews-dialog__body">
          <ProductReviewForm :product-slug="productSlug" @submitted="onSubmitted($event)" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { X } from '@lucide/vue'
  import ProductReviewForm from '~/components/product/ProductReviewForm.vue'
  import type { ProductReviewsResponse } from '~/types/productReviewApi'

  const props = defineProps<{
    open: boolean
    productSlug: string
  }>()

  const emit = defineEmits<{
    close: []
    submitted: [payload: ProductReviewsResponse]
  }>()

  useBodyScrollLock(() => props.open)

  useDismissOnEscape(
    () => props.open,
    () => emit('close'),
  )

  function onSubmitted(payload: ProductReviewsResponse) {
    emit('submitted', payload)
    emit('close')
  }
</script>

<style scoped lang="scss">
  .product-reviews-dialog {
    position: fixed;
    inset: auto 0 0;
    z-index: var(--z-drawer);
    width: 100%;
    max-height: min(92vh, 640px);
    display: flex;
    flex-direction: column;
    overscroll-behavior: contain;
    background: var(--color-surface);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    box-shadow: 0 -8px 32px rgb(0 0 0 / 12%);

    &__backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--z-overlay);
      background: rgb(0 0 0 / 35%);
      touch-action: none;
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-shrink: 0;
      padding: 20px var(--gutter-mobile) 12px;
      border-bottom: 1px solid var(--color-border);
    }

    &__title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
    }

    &__close {
      display: inline-flex;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__body {
      flex: 1;
      padding: 20px var(--gutter-mobile) 28px;
      overflow-y: auto;
    }
  }

  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: opacity var(--transition-overlay);
  }

  .overlay-fade-enter-from,
  .overlay-fade-leave-to {
    opacity: 0;
  }

  .product-reviews-slide-enter-active,
  .product-reviews-slide-leave-active {
    transition: transform var(--transition-drawer);
  }

  .product-reviews-slide-enter-from,
  .product-reviews-slide-leave-to {
    transform: translateY(100%);
  }
</style>
