<template>
  <div class="product-review-list">
    <h3 class="product-review-list__heading">
      {{ heading }}
    </h3>

    <ul v-if="reviews.length > 0" class="product-review-list__items">
      <li v-for="review in visibleReviews" :key="review.id" class="product-review-list__item">
        <div class="product-review-list__meta">
          <span class="product-review-list__author">{{ review.author }}</span>
          <span class="product-review-list__date">{{ review.dateLabel }}</span>
        </div>
        <ProductReviewStars :rating="review.rating" />
        <p class="product-review-list__body">{{ review.body }}</p>
      </li>
    </ul>

    <p v-else class="product-review-list__empty">There are no reviews yet.</p>

    <button
      v-if="canShowMore"
      type="button"
      class="product-review-list__more"
      @click="showMore()"
    >
      Show more
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductReview } from '~/types/product'
import ProductReviewStars from '~/components/product/ProductReviewStars.vue'

const REVIEWS_PAGE_SIZE = 2

const props = defineProps<{
  productName: string
  reviews: ProductReview[]
}>()

const visibleCount = ref(REVIEWS_PAGE_SIZE)

const visibleReviews = computed(() => props.reviews.slice(0, visibleCount.value))

const canShowMore = computed(() => visibleCount.value < props.reviews.length)

const heading = computed(() => {
  const count = props.reviews.length
  const suffix = count === 1 ? 'Review' : 'Reviews'
  return `${count} ${suffix} for ${props.productName}`
})

function showMore() {
  visibleCount.value = Math.min(visibleCount.value + REVIEWS_PAGE_SIZE, props.reviews.length)
}

watch(
  () => props.reviews,
  () => {
    visibleCount.value = REVIEWS_PAGE_SIZE
  },
)
</script>

<style scoped lang="scss">
.product-review-list {
  &__heading {
    margin: 0 0 24px;
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-text);
  }

  &__items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    padding: 0 0 24px;
    margin: 0 0 24px;
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 12px;
    margin-bottom: 8px;
  }

  &__author {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__date {
    font-size: 14px;
    color: var(--color-text-muted);
  }

  &__body {
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.65;
    color: var(--color-text-muted);
  }

  &__empty {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  &__more {
    margin-top: 20px;
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    background: transparent;
    cursor: pointer;
    transition: opacity var(--transition-base);

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>