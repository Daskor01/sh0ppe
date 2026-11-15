<template>
  <section class="hero" aria-roledescription="carousel" aria-label="Featured products">
    <div class="hero__viewport">
      <ClientOnly>
        <Swiper v-bind="swiperOptions" class="hero__swiper">
          <SwiperSlide v-for="slide in slidesView" :key="slide.id" class="hero__slide">
            <img
              class="hero__image"
              :src="slide.image"
              :alt="slide.imageAlt"
              width="1248"
              height="720"
              loading="lazy"
            />
            <div class="hero__overlay" aria-hidden="true" />
            <div class="hero__content">
              <h2 class="hero__title">{{ slide.title }}</h2>
              <p class="hero__price">{{ formatPrice(slide.price) }}</p>
              <NuxtLink :to="slide.productTo" class="hero__cta-link">
                <UiBaseButton variant="ghost-light">View Product</UiBaseButton>
              </NuxtLink>
            </div>
          </SwiperSlide>
        </Swiper>

        <template #fallback>
          <article v-if="firstSlideView" class="hero__slide hero__slide--static">
            <img
              class="hero__image"
              :src="firstSlideView.image"
              :alt="firstSlideView.imageAlt"
              width="1248"
              height="720"
              loading="eager"
              fetchpriority="high"
            />
            <div class="hero__overlay" aria-hidden="true" />
            <div class="hero__content">
              <h2 class="hero__title">{{ firstSlideView.title }}</h2>
              <p class="hero__price">{{ formatPrice(firstSlideView.price) }}</p>
              <NuxtLink :to="firstSlideView.productTo" class="hero__cta-link">
                <UiBaseButton variant="ghost-light">View Product</UiBaseButton>
              </NuxtLink>
            </div>
          </article>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { useCatalogStore } from '~/stores/useCatalogStore'
  import { useHeroSwiperOptions } from '~/composables/useHeroSwiper'
  import type { HeroSlide } from '~/types/product'
  import { productPath } from '~/utils/routes'

  import 'swiper/css'
  import 'swiper/css/pagination'

  const catalog = useCatalogStore()
  const slides = computed(() => catalog.slides)
  const swiperOptions = useHeroSwiperOptions()
  const { formatPrice } = useFormatPrice()

  type HeroSlideView = HeroSlide & { productTo: string }

  function toHeroSlideView(slide: HeroSlide): HeroSlideView {
    return {
      ...slide,
      productTo: productPath(slide.productSlug),
    }
  }

  const slidesView = computed(() => slides.value.map(toHeroSlideView))

  const firstSlideView = computed(() => {
    const slide = slides.value[0]
    return slide ? toHeroSlideView(slide) : null
  })
</script>

<style scoped lang="scss">
  .hero {
    width: 100%;
    padding-inline: 10px;
    margin-block: 0 32px;

    @include mixins.respond-to(lg) {
      max-width: var(--container-max);
      margin-inline: auto;
      margin-block: 24px 56px;
    }

    &__viewport {
      position: relative;
      overflow: hidden;
      width: 100%;
      border-radius: var(--radius-xl);
      background: var(--color-surface-muted);
      aspect-ratio: 375 / 480;
      min-height: min(85vw, 520px);

      @include mixins.respond-to(lg) {
        aspect-ratio: 1248 / 720;
        max-height: 720px;
        min-height: 0;
      }
    }

    &__swiper {
      width: 100%;
      height: 100%;
    }

    :deep(.swiper-wrapper) {
      height: 100%;
    }

    &__slide {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 100%;

      &--static {
        display: block;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__overlay {
      position: absolute;
      inset: 0;
      @include mixins.overlay-gradient;
    }

    &__content {
      position: absolute;
      left: 24px;
      bottom: 56px;
      z-index: 1;
      color: var(--light-colors-white---light);
      max-width: 280px;

      @include mixins.respond-to(lg) {
        left: 48px;
        bottom: 72px;
        max-width: 360px;
      }
    }

    &__title {
      font-size: clamp(28px, 5vw, 40px);
      font-weight: 500;
      margin-bottom: 8px;
      text-transform: capitalize;
    }

    &__price {
      margin: 0 0 20px;
      font-size: clamp(18px, 3vw, 24px);
      font-weight: 400;
      opacity: 0.95;
    }

    &__cta-link {
      display: inline-block;
      text-decoration: none;
    }

    :deep(.swiper-pagination) {
      bottom: 20px;
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    :deep(.hero__dot) {
      width: 10px;
      height: 10px;
      margin: 0 !important;
      border-radius: 50%;
      border: 1px solid var(--light-colors-white---light);
      background: transparent;
      opacity: 1;
      cursor: pointer;
      transition: background var(--transition-base);
    }

    :deep(.hero__dot--active) {
      background: var(--light-colors-white---light);
    }
  }
</style>
