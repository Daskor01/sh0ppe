<template>
  <div
    class="product-review-stars"
    :class="rootClass"
    :role="interactive ? 'group' : undefined"
    :aria-label="interactive ? 'Your rating' : undefined"
  >
    <button
      v-for="(filled, index) in stars"
      :key="index"
      type="button"
      class="product-review-stars__star"
      :class="{ 'product-review-stars__star--filled': filled }"
      :disabled="!interactive"
      :aria-label="interactive ? `${index + 1} star` : undefined"
      @click="onSelect(index + 1)"
    >
      <Star :size="starSize" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Star } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    rating?: number
    interactive?: boolean
    size?: 'sm' | 'md'
  }>(),
  {
    rating: 0,
    interactive: false,
    size: 'sm',
  },
)

const ratingModel = defineModel<number>('rating', { default: 0 })

const starSize = computed(() => (props.size === 'md' ? 18 : 16))

const displayRating = computed(() =>
  props.interactive ? ratingModel.value : props.rating,
)

const stars = computed(() =>
  Array.from({ length: 5 }, (_, index) => index < Math.round(displayRating.value)),
)

const rootClass = computed(() => ({
  'product-review-stars--interactive': props.interactive,
}))

function onSelect(value: number) {
  if (!props.interactive) {
    return
  }
  ratingModel.value = value
}
</script>

<style scoped lang="scss">
.product-review-stars {
  display: inline-flex;
  gap: 2px;
  color: var(--color-border);

  &__star {
    display: inline-flex;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: default;

    &--filled {
      color: var(--color-text);

      :deep(svg) {
        fill: var(--color-text);
      }
    }
  }

  &--interactive &__star {
    cursor: pointer;
    transition: color var(--transition-base);

    &:hover,
    &:focus-visible {
      color: var(--color-text-muted);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>