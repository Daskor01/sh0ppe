<template>
  <div class="product-gallery">
    <div class="product-gallery__desktop">
      <div class="product-gallery__grid">
        <ul class="product-gallery__thumbs" aria-label="Gallery thumbnails">
          <li v-for="(image, index) in images" :key="image.id" class="product-gallery__thumb-item">
            <button
              type="button"
              class="product-gallery__thumb"
              :class="{ 'product-gallery__thumb--active': isThumbActive(index) }"
              :aria-label="thumbButtonLabel(index)"
              :aria-current="thumbAriaCurrent(index)"
              @click="selectImage(index)"
            >
              <img :src="image.src" :alt="image.alt" loading="lazy" />
            </button>
          </li>
        </ul>

        <div class="product-gallery__main">
          <img
            v-if="activeImage"
            :src="activeImage.src"
            :alt="activeImage.alt"
            width="540"
            height="600"
          />
        </div>

        <div
          class="product-gallery__pagination"
          role="progressbar"
          :aria-valuenow="activeIndex + 1"
          aria-valuemin="1"
          :aria-valuemax="images.length"
          :aria-label="slideProgressLabel"
        >
          <span class="product-gallery__pagination-fill" :style="progressFillStyle" />
        </div>
      </div>
    </div>

    <div class="product-gallery__mobile">
      <div ref="scrollRef" class="product-gallery__scroll" @scroll.passive="onMobileScroll()">
        <img
          v-for="(image, index) in images"
          :key="image.id"
          class="product-gallery__slide-image"
          :src="image.src"
          :alt="image.alt"
          width="600"
          height="600"
          :loading="slideImageLoading(index)"
        />
      </div>
      <div
        class="product-gallery__pagination"
        role="progressbar"
        :aria-valuenow="activeIndex + 1"
        aria-valuemin="1"
        :aria-valuemax="images.length"
        :aria-label="slideProgressLabel"
      >
        <span class="product-gallery__pagination-fill" :style="progressFillStyle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ProductGalleryImage } from '~/types/product'

  const props = defineProps<{
    images: ProductGalleryImage[]
  }>()

  const activeIndex = ref(0)
  const scrollRef = ref<HTMLElement | null>(null)

  const progressPercent = computed(() => {
    if (props.images.length <= 1) {
      return 100
    }
    return ((activeIndex.value + 1) / props.images.length) * 100
  })

  const activeImage = computed(() => props.images[activeIndex.value] ?? props.images[0])

  function selectImage(index: number) {
    activeIndex.value = index
    const container = scrollRef.value
    if (!container) {
      return
    }
    const slide = container.children[index] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  const slideProgressLabel = computed(
    () => `Slide ${activeIndex.value + 1} of ${props.images.length}`,
  )

  const progressFillStyle = computed(() => ({ width: `${progressPercent.value}%` }))

  function isThumbActive(index: number) {
    return index === activeIndex.value
  }

  function thumbAriaCurrent(index: number) {
    return isThumbActive(index) ? 'true' : undefined
  }

  function thumbButtonLabel(index: number) {
    return `Show image ${index + 1}`
  }

  function slideImageLoading(index: number): 'eager' | 'lazy' {
    return index === 0 ? 'eager' : 'lazy'
  }

  function onMobileScroll() {
    const container = scrollRef.value
    if (!container || container.clientWidth <= 0) {
      return
    }
    const index = Math.round(container.scrollLeft / container.clientWidth)
    activeIndex.value = Math.min(Math.max(0, index), props.images.length - 1)
  }
</script>

<style scoped lang="scss">
  .product-gallery {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    &__desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: block;
      }
    }

    &__grid {
      @include mixins.respond-to(lg) {
        display: grid;
        grid-template-columns: 120px 540px;
        grid-template-rows: auto auto;
        column-gap: 40px;
        row-gap: 12px;
      }
    }

    &__thumbs {
      display: none;

      @include mixins.respond-to(lg) {
        display: flex;
        flex-direction: column;
        gap: 40px;
        min-height: 0;
        margin: 0;
        padding: 0;
        list-style: none;
        grid-column: 1;
        grid-row: 1;
        align-self: start;
      }
    }

    &__thumb-item {
      flex-shrink: 0;
    }

    &__thumb {
      display: block;
      padding: 0;
      overflow: hidden;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      background: var(--color-surface-muted);
      cursor: pointer;
      transition: border-color var(--transition-base);

      @include mixins.respond-to(lg) {
        width: 120px;
        height: 120px;
        aspect-ratio: 1 / 1;
      }

      &--active {
        border-color: var(--color-text);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__main {
      @include mixins.respond-to(lg) {
        grid-column: 2;
        grid-row: 1;
        width: 540px;
        height: 600px;
        overflow: hidden;
        border-radius: var(--radius-md);
        background: var(--color-surface-muted);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &__pagination {
      height: 2px;
      background: var(--color-border);
      border-radius: 1px;

      @include mixins.respond-to(lg) {
        grid-column: 2;
        grid-row: 2;
      }
    }

    &__pagination-fill {
      display: block;
      height: 100%;
      background: var(--color-text);
      border-radius: 1px;
      transition: width var(--transition-base);
    }

    &__mobile {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;

      @include mixins.respond-to(lg) {
        display: none;
      }
    }

    &__scroll {
      display: flex;
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      border-radius: var(--radius-md);
      background: var(--color-surface-muted);

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__slide-image {
      flex: 0 0 100%;
      width: 100%;
      max-width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  }
</style>
