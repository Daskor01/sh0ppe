<template>
  <section id="product-details-mobile" class="product-accordions" aria-label="Product details">
    <div
      v-for="section in sections"
      :key="section.id"
      class="product-accordions__item"
      :class="{ 'product-accordions__item--open': isOpen(section.id) }"
    >
      <button
        type="button"
        class="product-accordions__trigger"
        :aria-expanded="isOpen(section.id)"
        @click="toggle(section.id)"
      >
        <span>{{ section.title }}</span>
        <ChevronDown class="product-accordions__chevron" :size="20" aria-hidden="true" />
      </button>
      <div
        class="product-accordions__panel-wrap"
        :class="{ 'product-accordions__panel-wrap--open': isOpen(section.id) }"
      >
        <div class="product-accordions__panel">
          <ProductReviewsSection
            v-if="section.id === 'reviews'"
            :product-name="productName"
            :product-slug="productSlug"
            :reviews="detail.reviews"
            layout="mobile"
            @submitted="emit('reviewSubmitted', $event)"
          />
          <p v-else>{{ section.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ChevronDown } from '@lucide/vue'
  import type { ProductPageContent } from '~/types/product'

  const props = defineProps<{
    detail: ProductPageContent
    productName: string
    productSlug: string
    openSection?: 'description' | 'additional' | 'reviews' | null
  }>()

  const emit = defineEmits<{
    reviewSubmitted: [payload: import('~/types/productReviewApi').ProductReviewsResponse]
  }>()

  type SectionId = 'description' | 'additional' | 'reviews'

  const openId = ref<SectionId | null>(props.openSection ?? null)

  watch(
    () => props.openSection,
    (value) => {
      if (value) {
        openId.value = value
      }
    },
  )

  const sections = computed(() => [
    {
      id: 'description' as const,
      title: 'Description',
      body: props.detail.description,
    },
    {
      id: 'additional' as const,
      title: 'Additional information',
      body: props.detail.additionalInformation,
    },
    {
      id: 'reviews' as const,
      title: `Reviews(${props.detail.reviewCount})`,
      body: '',
    },
  ])

  function toggle(id: SectionId) {
    openId.value = openId.value === id ? null : id
  }

  function isOpen(id: SectionId) {
    return openId.value === id
  }
</script>

<style scoped lang="scss">
  .product-accordions {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    border-top: 1px solid var(--color-border);

    @include mixins.respond-to(lg) {
      display: none;
    }

    &__item {
      border-bottom: 1px solid var(--color-border);
    }

    &__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      padding: 18px 0;
      border: none;
      font-family: var(--font-sans);
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      color: var(--color-text);
      background: transparent;
      cursor: pointer;

      @include mixins.focus-ring-fine-pointer-only;
    }

    &__chevron {
      flex-shrink: 0;
      color: var(--color-text-muted);
      transition: transform var(--transition-accordion);
    }

    &__item--open &__chevron {
      transform: rotate(180deg);
    }

    &__panel-wrap {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--transition-accordion);

      &--open {
        grid-template-rows: 1fr;
      }
    }

    &__panel {
      overflow: hidden;
      min-height: 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-muted);

      p {
        margin: 0;
      }
    }

    &__panel-wrap--open &__panel {
      padding: 0 0 20px;
    }
  }
</style>
