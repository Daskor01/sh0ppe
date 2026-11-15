<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div
        v-if="filters.mobilePanelOpen"
        class="shop-mobile-filters__backdrop"
        aria-hidden="true"
        @click="filters.closeMobilePanel()"
      />
    </Transition>
    <Transition name="shop-filters-slide">
      <div
        v-if="filters.mobilePanelOpen"
        class="shop-mobile-filters"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-mobile-filters-title"
      >
        <header class="shop-mobile-filters__head">
          <h2 id="shop-mobile-filters-title" class="shop-mobile-filters__title">Filters</h2>
          <button
            type="button"
            class="shop-mobile-filters__close"
            aria-label="Close filters"
            @click="filters.closeMobilePanel()"
          >
            <X :size="24" aria-hidden="true" />
          </button>
        </header>
        <div class="shop-mobile-filters__body">
          <ShopFiltersForm variant="drawer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { X } from '@lucide/vue'

  const filters = useShopFiltersStore()

  watch(
    () => filters.mobilePanelOpen,
    (open) => {
      if (!import.meta.client) {
        return
      }
      document.body.style.overflow = open ? 'hidden' : ''
    },
  )

  onUnmounted(() => {
    if (import.meta.client) {
      document.body.style.overflow = ''
    }
  })

  useDismissOnEscape(
    () => filters.mobilePanelOpen,
    () => filters.closeMobilePanel(),
  )
</script>

<style scoped lang="scss">
  .shop-mobile-filters {
    position: fixed;
    inset: 0;
    z-index: var(--z-drawer);
    display: flex;
    flex-direction: column;
    padding: 24px var(--gutter-mobile) 32px;
    overflow-y: auto;
    background: var(--color-surface);

    &__backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--z-overlay);
      background: rgb(0 0 0 / 35%);
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }

    &__title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text);
    }

    &__close {
      display: inline-flex;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__body {
      flex: 1;
    }
  }

  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: opacity var(--transition-overlay);
  }

  .overlay-fade-enter-from,
  .overlay-fade-leave-to {
    opacity: 0;
  }

  .shop-filters-slide-enter-active,
  .shop-filters-slide-leave-active {
    transition:
      transform var(--transition-drawer),
      opacity var(--transition-panel);
  }

  .shop-filters-slide-enter-from,
  .shop-filters-slide-leave-to {
    opacity: 0;
    transform: translateY(12px);
  }
</style>
