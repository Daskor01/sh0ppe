<template>
  <header class="site-header" :class="{ 'site-header--menu-open': showDrawer }">
    <div class="site-header__sticky">
      <div class="site-header__mobile-wrap">
        <div class="site-header__bar">
          <div class="site-header__inner">
            <UiAppLogo class="site-header__logo" />

            <div class="site-header__desktop-cluster">
              <nav class="site-header__nav" aria-label="Main navigation">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.to"
                  :to="link.to"
                  class="site-header__nav-link"
                >
                  {{ link.label }}
                </NuxtLink>
              </nav>

              <div class="site-header__divider" aria-hidden="true" />

              <LayoutHeaderActions
                class="site-header__actions site-header__actions--desktop"
                :search-expanded="desktopSearchOpen"
                @search-click="onDesktopSearchClick()"
              />
            </div>

            <div class="site-header__mobile-end">
              <button
                type="button"
                class="site-header__cart"
                aria-label="Open cart"
                @click="openCart()"
              >
                <ShoppingCart :size="22" aria-hidden="true" />
                <span
                  class="site-header__cart-badge"
                  :class="{ 'site-header__cart-badge--hidden': !showCartBadge }"
                  aria-hidden="true"
                >
                  {{ cart.totalItems }}
                </span>
              </button>
              <button
                type="button"
                class="site-header__menu-btn"
                :aria-expanded="isOpen"
                aria-controls="mobile-nav"
                aria-label="Open menu"
                @click="toggle()"
              >
                <Menu :size="22" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <LayoutHeaderDesktopSearch
          ref="desktopSearchRef"
          v-model="searchQuery"
          :open="desktopSearchOpen"
          :recents-visible="desktopSearchRecentsVisible"
          @submit="onDesktopSearchSubmit()"
          @escape="onDesktopSearchEscape()"
          @after-enter="onDesktopSearchAfterEnter()"
          @before-leave="onDesktopSearchBeforeLeave()"
        />

        <LayoutHeaderMobileSearch
          v-show="showMobileSearch"
          v-model="searchQuery"
          @submit="submitSearch()"
          @escape="onMobileSearchEscape()"
        />

        <ShopMobileToolbar v-if="showShopMobileToolbar" />
      </div>
    </div>

    <LayoutMobileNavMenu :open="showDrawer" @close="close()" @open-cart="openCart()" />
  </header>
</template>

<script setup lang="ts">
  import { Menu, ShoppingCart } from '@lucide/vue'

  const route = useRoute()
  const { isOpen, showDrawer, close, toggle } = useMobileNav()
  const cart = useCartStore()
  const { openCart } = useCartUi()
  const {
    isOpen: desktopSearchOpen,
    searchQuery,
    toggle: toggleDesktopSearch,
    close: closeDesktopSearch,
    submitSearch,
  } = useHeaderSearchPanel()

  const desktopSearchRef = ref<{
    focus: () => void
    containsTarget: (target: Node) => boolean
  } | null>(null)
  const desktopSearchRecentsVisible = ref(false)

  const showCartBadge = computed(() => cart.totalItems > 0)

  const showMobileSearch = computed(() => route.path === '/')

  const showShopMobileToolbar = computed(() => route.path === '/shop')

  function onDesktopSearchClick() {
    toggleDesktopSearch()
  }

  function onDesktopSearchAfterEnter() {
    desktopSearchRecentsVisible.value = true
    nextTick(() => {
      desktopSearchRef.value?.focus()
    })
  }

  function onDesktopSearchBeforeLeave() {
    desktopSearchRecentsVisible.value = false
  }

  function onDesktopSearchSubmit() {
    submitSearch()
  }

  function onDesktopSearchEscape() {
    if (route.path !== '/shop') {
      searchQuery.value = ''
    }
    closeDesktopSearch()
  }

  function onMobileSearchEscape() {
    if (route.path !== '/shop') {
      searchQuery.value = ''
    }
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!desktopSearchOpen.value) {
      return
    }
    const target = event.target
    if (!(target instanceof Node)) {
      return
    }
    if (desktopSearchRef.value?.containsTarget(target)) {
      return
    }
    if (target instanceof Element && target.closest('[data-header-search-trigger]')) {
      return
    }
    closeDesktopSearch()
  }

  watch(
    () => route.path,
    () => {
      closeDesktopSearch()
    },
  )

  const { syncHeaderOffset } = useSiteHeaderOffset()

  watch(desktopSearchOpen, (open) => {
    if (!open) {
      desktopSearchRecentsVisible.value = false
    }
    nextTick(() => {
      syncHeaderOffset()
    })
  })

  watch(showShopMobileToolbar, () => {
    nextTick(() => {
      syncHeaderOffset()
    })
  })

  watch(showMobileSearch, () => {
    nextTick(() => {
      syncHeaderOffset()
    })
  })

  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
  })

  const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/our-story' },
  ]
</script>

<style scoped lang="scss">
  .site-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: var(--z-header);
    flex-shrink: 0;
    width: 100%;
    background: var(--color-surface);

    &__sticky {
      width: 100%;
      background: var(--color-surface);
    }

    &__mobile-wrap {
      width: 100%;

      @media (max-width: 1023px) {
        padding-inline: var(--gutter-mobile);
      }
    }

    &__bar {
      position: relative;
      z-index: var(--z-header-bar);

      @include mixins.respond-to(lg) {
        box-shadow: inset 0 -1px 0 var(--color-border);
      }
    }

    &__inner {
      @include mixins.container;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: var(--header-height-mobile);
      gap: 16px;

      @media (max-width: 1023px) {
        width: 100%;
        max-width: none;
        margin-inline: 0;
        padding-inline: 0;
      }

      @include mixins.respond-to(lg) {
        align-items: stretch;
        min-height: var(--header-height-desktop);
      }
    }

    &__logo {
      flex-shrink: 0;

      @include mixins.respond-to(lg) {
        align-self: center;
      }
    }

    &__desktop-cluster {
      display: none;
      align-items: center;
      margin-left: auto;

      @include mixins.respond-to(lg) {
        display: flex;
        align-self: stretch;
      }
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: 48px;
      margin-right: 48px;

      @include mixins.respond-to(lg) {
        align-self: stretch;
        align-items: stretch;
      }
    }

    &__nav-link {
      font-size: 16px;
      color: var(--color-text);
      text-decoration: none;
      transition: color var(--transition-base);

      &:hover {
        color: var(--color-accent);
      }

      @include mixins.respond-to(lg) {
        display: inline-flex;
        align-items: center;
        position: relative;
      }

      &.router-link-active {
        color: var(--color-text);

        @include mixins.respond-to(lg) {
          box-shadow: none;

          &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 2px;
            background: var(--color-text);
          }
        }
      }
    }

    &__divider {
      width: 1px;
      height: 17px;
      margin-right: 24px;
      background: var(--color-border);
      align-self: center;
    }

    &__actions--desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: flex;
      }
    }

    &__mobile-end {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-left: auto;

      @include mixins.respond-to(lg) {
        display: none;
      }
    }

    &__cart {
      position: relative;
      cursor: pointer;

      @include mixins.header-icon-button;
      @include mixins.focus-ring-fine-pointer-only;
    }

    &__cart-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 10px;
      font-weight: 700;
      line-height: 16px;
      text-align: center;
      color: var(--light-colors-white---light);
      background: var(--color-text);
      border-radius: 999px;

      &--hidden {
        opacity: 0;
        visibility: hidden;
      }
    }

    &__menu-btn {
      cursor: pointer;

      @include mixins.header-icon-button;
      @include mixins.focus-ring-fine-pointer-only;
    }

    &--menu-open :deep(.header-mobile-search),
    &--menu-open :deep(.shop-mobile-toolbar) {
      @media (max-width: 1023px) {
        pointer-events: none;
      }
    }
  }
</style>
