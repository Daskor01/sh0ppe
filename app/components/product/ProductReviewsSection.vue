<template>
  <section class="product-reviews" :class="layoutClass">
    <button
      v-if="isMobileLayout"
      type="button"
      class="product-reviews__add-btn"
      @click="reviewDialogOpen = true"
    >
      Add a review
    </button>

    <div class="product-reviews__layout">
      <ProductReviewList :product-name="productName" :reviews="reviews" />
      <ProductReviewForm v-if="!isMobileLayout" class="product-reviews__form" />
    </div>

    <ProductReviewsDialog
      v-if="isMobileLayout"
      :open="reviewDialogOpen"
      @close="reviewDialogOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import type { ProductReview } from '~/types/product'
import ProductReviewForm from '~/components/product/ProductReviewForm.vue'
import ProductReviewList from '~/components/product/ProductReviewList.vue'
import ProductReviewsDialog from '~/components/product/ProductReviewsDialog.vue'

const props = withDefaults(
  defineProps<{
    productName: string
    reviews: ProductReview[]
    layout?: 'desktop' | 'mobile'
  }>(),
  {
    layout: 'desktop',
  },
)

const reviewDialogOpen = ref(false)

const isMobileLayout = computed(() => props.layout === 'mobile')

const layoutClass = computed(() => `product-reviews--${props.layout}`)
</script>

<style scoped lang="scss">
.product-reviews {
  &__layout {
    display: grid;
    gap: 32px;
  }

  &--desktop &__layout {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
    gap: 48px;
    align-items: start;
  }

  &--mobile &__layout {
    gap: 0;
  }

  &__form {
    padding-top: 4px;
  }

  &__add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 24px;
    padding: 14px 20px;
    border: 1px solid var(--color-text);
    border-radius: var(--radius-sm);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text);
    background: var(--color-surface);
    cursor: pointer;
    transition:
      background var(--transition-base),
      color var(--transition-base);

    &:hover {
      background: var(--color-surface-muted);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }

    @include mixins.respond-to(lg) {
      display: none;
    }
  }

  &--desktop &__add-btn {
    display: none;
  }
}
</style>