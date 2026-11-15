<template>
  <article class="product-page">
    <div class="product-page__top">
      <ProductGallery :images="detail.gallery" />
      <ProductBuyBox
        v-model:quantity="quantity"
        :product="product"
        :detail="detail"
        @view-more="onViewMore()"
      />
    </div>

    <div class="product-page__details">
      <ProductDetailTabs
        :detail="detail"
        :product-name="product.name"
        :product-slug="product.slug"
        @review-submitted="onReviewSubmitted()"
      />
      <ProductDetailAccordions
        :detail="detail"
        :product-name="product.name"
        :product-slug="product.slug"
        :open-section="accordionSection"
        @review-submitted="onReviewSubmitted()"
      />
    </div>

    <ProductSimilarSection :products="similarProducts" />
  </article>
</template>

<script setup lang="ts">
  import ProductBuyBox from '~/components/product/ProductBuyBox.vue'
  import ProductDetailAccordions from '~/components/product/ProductDetailAccordions.vue'
  import ProductDetailTabs from '~/components/product/ProductDetailTabs.vue'
  import ProductGallery from '~/components/product/ProductGallery.vue'
  import ProductSimilarSection from '~/components/product/ProductSimilarSection.vue'
  import { getProductPageContent, getSimilarProducts } from '~/data/productPages'
  import type { Product } from '~/types/product'
  import type { ProductReviewsResponse } from '~/types/productReviewApi'

  const route = useRoute()
  const catalog = useCatalogStore()

  const slug = computed(() => String(route.params.slug))

  const product = computed((): Product => {
    const item = catalog.getProductBySlug(slug.value)
    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
    }
    return item
  })

  const { data: reviewsPayload, refresh: refreshReviews } = await useFetch<ProductReviewsResponse>(
    () => `/api/products/${slug.value}/reviews`,
    { watch: [slug] },
  )

  const detail = computed(() => {
    const base = getProductPageContent(product.value)
    const fromApi = reviewsPayload.value
    if (!fromApi) {
      return base
    }
    return {
      ...base,
      reviews: fromApi.reviews,
      reviewCount: fromApi.reviewCount,
    }
  })
  const similarProducts = computed(() => getSimilarProducts(product.value))
  const quantity = ref(1)
  const accordionSection = ref<'description' | 'additional' | 'reviews' | null>(null)

  async function onReviewSubmitted(payload?: ProductReviewsResponse) {
    if (payload) {
      reviewsPayload.value = payload
      return
    }
    await refreshReviews()
  }

  useSeoMeta({
    title: () => `${product.value.name} — SHOPPE`,
    description: () => detail.value.shortDescription,
  })

  function onViewMore() {
    accordionSection.value = 'description'
    nextTick(() => {
      document.getElementById('product-details-mobile')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
</script>

<style scoped lang="scss">
  .product-page {
    overflow-x: clip;

    &__top {
      @include mixins.container;
      display: grid;
      gap: 24px;
      min-width: 0;
      padding-block: 16px 32px;

      @include mixins.respond-to(lg) {
        grid-template-columns: auto minmax(0, 1fr);
        column-gap: 50px;
        gap: 28px;
        padding-block: 40px 48px;
        align-items: start;
      }

      > * {
        min-width: 0;
        max-width: 100%;
      }
    }

    &__details {
      @include mixins.container;
      min-width: 0;
      padding-bottom: 8px;
    }
  }
</style>
