<template>
  <section class="product-tabs" aria-label="Product details">
    <div class="product-tabs__nav" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        class="product-tabs__tab"
        :class="tabButtonClass(tab.id)"
        :aria-selected="isTabActive(tab.id)"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}{{ tabLabelSuffix(tab.id) }}
      </button>
    </div>

    <div class="product-tabs__panels">
      <Transition name="product-tabs-panel" mode="out-in">
        <div
          :key="activeTab"
          role="tabpanel"
          class="product-tabs__panel"
          :class="panelClass"
        >
          <ProductReviewsSection
            v-if="activeTab === 'reviews'"
            :product-name="productName"
            :reviews="detail.reviews"
            layout="desktop"
          />
          <p v-else>{{ activePanelText }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductPageContent } from '~/types/product'

const props = defineProps<{
  detail: ProductPageContent
  productName: string
}>()

type TabId = 'description' | 'additional' | 'reviews'

const activeTab = ref<TabId>('description')

const activePanelText = computed(() => {
  if (activeTab.value === 'description') {
    return props.detail.description
  }
  if (activeTab.value === 'additional') {
    return props.detail.additionalInformation
  }
  return ''
})

const panelClass = computed(() => ({
  'product-tabs__panel--reviews': activeTab.value === 'reviews',
}))

function isTabActive(tabId: TabId) {
  return activeTab.value === tabId
}

function tabButtonClass(tabId: TabId) {
  return { 'product-tabs__tab--active': isTabActive(tabId) }
}

function tabLabelSuffix(tabId: TabId) {
  if (tabId !== 'reviews') {
    return ''
  }
  return `(${props.detail.reviewCount})`
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'additional', label: 'Additional information' },
  { id: 'reviews', label: 'Reviews' },
]
</script>

<style scoped lang="scss">
.product-tabs {
  display: none;
  padding-top: 48px;
  border-top: 1px solid var(--color-border);

  @include mixins.respond-to(lg) {
    display: block;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 24px 40px;
    margin-bottom: 24px;
  }

  &__tab {
    padding: 0 0 8px;
    border: none;
    border-bottom: 2px solid transparent;
    font-family: var(--font-sans);
    font-size: 16px;
    color: var(--color-text-muted);
    background: transparent;
    cursor: pointer;
    transition:
      color var(--transition-base),
      border-color var(--transition-base);

    &--active {
      color: var(--color-text);
      border-bottom-color: var(--color-text);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__panels {
    position: relative;
    min-height: 4em;
  }

  &__panel {
    max-width: 720px;
    font-size: 14px;
    line-height: 1.7;
    color: var(--color-text-muted);

    &--reviews {
      max-width: none;
    }

    p {
      margin: 0;
    }
  }
}

.product-tabs-panel-enter-active,
.product-tabs-panel-leave-active {
  transition:
    opacity var(--transition-panel),
    transform var(--transition-panel);
}

.product-tabs-panel-enter-from,
.product-tabs-panel-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.product-tabs-panel-enter-to,
.product-tabs-panel-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
