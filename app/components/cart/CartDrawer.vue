<template>
  <Teleport to="body">
    <Transition name="cart-drawer-fade">
      <div v-if="isOpen" class="cart-drawer__backdrop" aria-hidden="true" @click="close()" />
    </Transition>
    <Transition name="cart-drawer-slide">
      <aside
        v-if="isOpen"
        class="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <header class="cart-drawer__mobile-head">
          <button type="button" class="cart-drawer__back" aria-label="Close cart" @click="close()">
            <X :size="22" aria-hidden="true" />
          </button>
          <div class="cart-drawer__mobile-titles">
            <p class="cart-drawer__mobile-title">Shopping bag</p>
            <p v-if="showItemCount" class="cart-drawer__mobile-count">{{ itemsLabel }}</p>
          </div>
          <span class="cart-drawer__mobile-spacer" aria-hidden="true" />
        </header>

        <button type="button" class="cart-drawer__close" aria-label="Close cart" @click="close()">
          <X :size="22" aria-hidden="true" />
        </button>

        <div class="cart-drawer__content">
          <CartBagPanel layout="drawer" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { X } from '@lucide/vue'

  const { isOpen, close } = useCartDrawer()
  const { totalItems, itemsLabel } = useCartSummary()

  watch(
    () => useRoute().fullPath,
    () => close(),
  )

  useDismissOnEscape(
    () => isOpen.value,
    () => close(),
  )

  const showItemCount = computed(() => totalItems.value > 0)
</script>

<style scoped lang="scss">
  .cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    z-index: var(--z-cart);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100vw;
    height: 100dvh;
    padding: 0 var(--gutter-mobile) 24px;
    overflow: hidden;
    background: var(--color-surface);
    box-shadow: -8px 0 32px rgb(0 0 0 / 10%);

    @include mixins.respond-to(lg) {
      width: min(420px, 100vw);
      padding: 24px 24px 28px;
    }

    &__backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--z-cart-backdrop);
      background: rgb(0 0 0 / 35%);
    }

    &__mobile-head {
      display: grid;
      grid-template-columns: 40px 1fr 40px;
      align-items: center;
      flex-shrink: 0;
      min-height: var(--header-height-mobile);
      margin-bottom: 8px;
      border-bottom: 1px solid var(--color-border);

      @include mixins.respond-to(lg) {
        display: none;
      }
    }

    &__back {
      display: inline-flex;
      justify-content: center;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__mobile-titles {
      text-align: center;
    }

    &__mobile-title {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: var(--color-text);
    }

    &__mobile-count {
      margin: 4px 0 0;
      font-size: 13px;
      color: var(--color-text-muted);
    }

    &__mobile-spacer {
      width: 40px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      padding-top: 8px;
    }

    &__close {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: var(--z-local-raised);
      display: none;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;

      @include mixins.respond-to(lg) {
        display: inline-flex;
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }
  }

  .cart-drawer-slide-enter-active,
  .cart-drawer-slide-leave-active {
    transition: transform var(--transition-drawer);
  }

  .cart-drawer-slide-enter-from,
  .cart-drawer-slide-leave-to {
    transform: translateX(100%);
  }

  .cart-drawer-fade-enter-active,
  .cart-drawer-fade-leave-active {
    transition: opacity var(--transition-overlay);
  }

  .cart-drawer-fade-enter-from,
  .cart-drawer-fade-leave-to {
    opacity: 0;
  }
</style>
