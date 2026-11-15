<template>
  <header class="site-header" :class="{ 'site-header--menu-open': showDrawer }">
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
            <button type="button" class="site-header__cart" aria-label="Open cart" @click="openCart()">
              <ShoppingCart :size="22" aria-hidden="true" />
              <span v-if="showCartBadge" class="site-header__cart-badge">
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
              <Menu :size="24" aria-hidden="true" />
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

      <LayoutAppToast class="site-header__toast" />
    </div>

    <LayoutMobileNavMenu
      :open="showDrawer"
      @close="close()"
      @open-cart="openCart()"
    />
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

const desktopSearchRef = ref<{ focus: () => void; containsTarget: (target: Node) => boolean } | null>(
  null,
)
const desktopSearchRecentsVisible = ref(false)

const showCartBadge = computed(() => cart.totalItems > 0)

const showMobileSearch = computed(() => {
  const path = route.path
  return path === '/' || path === '/shop'
})

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

watch(desktopSearchOpen, (open) => {
  if (!open) {
    desktopSearchRecentsVisible.value = false
  }
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
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--color-surface);
  isolation: isolate;

  &__mobile-wrap {
    @media (max-width: 1023px) {
      padding-inline: var(--gutter-mobile);
    }

    @include mixins.respond-to(lg) {
      display: contents;
    }
  }

  &__bar {
    position: relative;
    z-index: var(--z-header-bar);
    border-bottom: 1px solid transparent;

    @include mixins.respond-to(lg) {
      border-bottom-color: var(--color-border);
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
  }

  &__cart-badge {
    position: absolute;
    top: -2px;
    right: -6px;
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
  }

  &__menu-btn {
    display: inline-flex;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
    color: var(--color-text);

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &--menu-open :deep(.header-mobile-search) {
    @media (max-width: 1023px) {
      pointer-events: none;
    }
  }

  &__toast {
    @media (max-width: 1023px) {
      padding-bottom: 12px;
    }
  }
}
</style>
