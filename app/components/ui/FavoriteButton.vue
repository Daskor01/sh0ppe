<template>
  <button
    type="button"
    class="favorite-btn"
    :class="rootClass"
    :aria-label="ariaLabel"
    :aria-pressed="isFavorite"
    @click="onClick"
  >
    <span class="favorite-btn__burst" aria-hidden="true" />
    <Heart
      class="favorite-btn__icon"
      :class="{ 'favorite-btn__icon--animated': popping }"
      :size="size"
      :fill="isFavorite ? 'currentColor' : 'none'"
      aria-hidden="true"
      @animationend="onAnimationEnd"
    />
  </button>
</template>

<script setup lang="ts">
  import { Heart } from '@lucide/vue'

  const props = withDefaults(
    defineProps<{
      productId: string
      size?: number
      variant?: 'plain' | 'circle'
    }>(),
    {
      size: 20,
      variant: 'plain',
    },
  )

  const favorites = useFavoritesStore()
  const popping = ref(false)

  const isFavorite = computed(() => favorites.isFavorite(props.productId))

  const ariaLabel = computed(() => (isFavorite.value ? 'Remove from wishlist' : 'Add to wishlist'))

  const rootClass = computed(() => [
    `favorite-btn--${props.variant}`,
    {
      'favorite-btn--active': isFavorite.value,
      'favorite-btn--pop': popping.value,
    },
  ])

  function onClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    favorites.toggle(props.productId)
    popping.value = false
    requestAnimationFrame(() => {
      popping.value = true
    })
  }

  function onAnimationEnd() {
    popping.value = false
  }
</script>

<style scoped lang="scss">
  .favorite-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;

    &:focus-visible {
      @include mixins.focus-ring;
    }

    &--circle {
      width: 44px;
      height: 44px;
      padding: 0;
      border-radius: 50%;
      background: var(--light-colors-white---light);
      color: var(--color-text);
      box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
      transition: transform var(--transition-base);

      &:hover {
        transform: scale(1.05);
      }
    }

    &--active {
      color: var(--color-error);
    }

    &--circle.favorite-btn--active {
      color: var(--color-error);
    }

    &__icon {
      position: relative;
      z-index: 1;
      transform-origin: center;
      transition: color 0.25s ease;
    }

    &__icon--animated {
      animation: favorite-heart-pop 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    &__burst {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    &--pop &__burst {
      animation: favorite-burst 0.55s ease-out;
    }
  }

  @keyframes favorite-heart-pop {
    0% {
      transform: scale(1);
    }

    35% {
      transform: scale(1.22);
    }

    65% {
      transform: scale(0.94);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes favorite-burst {
    0% {
      opacity: 0.45;
      transform: scale(1);
      box-shadow: 0 0 0 0 rgb(216 39 0 / 35%);
    }

    100% {
      opacity: 0;
      transform: scale(3.2);
      box-shadow: 0 0 0 10px rgb(216 39 0 / 0%);
    }
  }
</style>
