<template>
  <div class="product-rating">
    <div class="product-rating__stars" aria-hidden="true">
      <Star
        v-for="(filled, index) in stars"
        :key="index"
        :size="16"
        :class="{ 'product-rating__star--filled': filled }"
      />
    </div>
    <span class="product-rating__count">
      {{ reviewCountLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { Star } from '@lucide/vue'

  const props = defineProps<{
    rating: number
    reviewCount: number
  }>()

  const stars = computed(() => {
    const rounded = Math.round(props.rating)
    return Array.from({ length: 5 }, (_, index) => index < rounded)
  })

  const reviewCountLabel = computed(() => {
    const suffix = props.reviewCount === 1 ? '' : 's'
    return `${props.reviewCount} customer review${suffix}`
  })
</script>

<style scoped lang="scss">
  .product-rating {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;

    &__stars {
      display: inline-flex;
      gap: 2px;
      color: var(--color-border);
    }

    &__star--filled {
      color: var(--color-text);
      fill: var(--color-text);
    }

    &__count {
      font-size: 14px;
      color: var(--color-text-muted);
    }
  }
</style>
