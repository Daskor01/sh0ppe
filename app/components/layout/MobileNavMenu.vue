<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="open" class="mobile-nav__backdrop" aria-hidden="true" @click="onClose()" />
    </Transition>
    <Transition name="mobile-nav-slide">
      <aside
        v-if="open"
        id="mobile-nav"
        class="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div class="mobile-nav__bar">
          <NuxtLink to="/" class="mobile-nav__logo" @click="onClose()">
            <UiAppLogo />
          </NuxtLink>

          <div class="mobile-nav__actions">
            <button
              type="button"
              class="mobile-nav__icon-btn mobile-nav__cart"
              aria-label="Open cart"
              @click="onCartClick()"
            >
              <ShoppingCart :size="22" aria-hidden="true" />
              <span v-if="showCartBadge" class="mobile-nav__cart-badge">
                {{ cart.totalItems }}
              </span>
            </button>
            <button
              type="button"
              class="mobile-nav__icon-btn mobile-nav__close"
              aria-label="Close menu"
              @click="onClose()"
            >
              <X :size="24" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav class="mobile-nav__links" aria-label="Mobile navigation">
          <NuxtLink
            v-for="link in primaryLinks"
            :key="link.label"
            :to="link.to"
            class="mobile-nav__link"
            @click="onNavClick()"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="mobile-nav__divider" aria-hidden="true" />

        <div class="mobile-nav__account">
          <template v-if="isSignedIn">
            <NuxtLink to="/account" class="mobile-nav__account-row" @click="onAccountAction()">
              <User :size="20" aria-hidden="true" />
              <span>My account</span>
            </NuxtLink>
            <button type="button" class="mobile-nav__account-row" @click="onLogout()">
              <LogOut :size="20" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </template>
          <NuxtLink
            v-else
            :to="accountSignInTo"
            class="mobile-nav__account-row"
            @click="onAccountAction()"
          >
            <UserPlus :size="20" aria-hidden="true" />
            <span>Sign</span>
          </NuxtLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { LogOut, ShoppingCart, User, UserPlus, X } from '@lucide/vue'

  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits<{
    close: []
    openCart: []
  }>()

  const cart = useCartStore()
  const { isSignedIn, signOut } = useAccountSession()
  const router = useRouter()
  const accountSignInTo = useAccountSignInRoute()

  const showCartBadge = computed(() => cart.totalItems > 0)

  const primaryLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/our-story' },
    { label: 'Blog', to: '/blog' },
    { label: 'Help', to: '/contact' },
    { label: 'Contact', to: '/contact' },
  ] as const

  function onClose() {
    emit('close')
  }

  function onCartClick() {
    emit('openCart')
    emit('close')
  }

  function onNavClick() {
    emit('close')
  }

  function onAccountAction() {
    emit('close')
  }

  function onLogout() {
    signOut()
    emit('close')
    router.push('/account')
  }

  useDismissOnEscape(
    () => props.open,
    () => onClose(),
  )
</script>

<style scoped lang="scss">
  .mobile-nav {
    position: fixed;
    inset: 0;
    z-index: var(--z-drawer);
    display: flex;
    flex-direction: column;
    padding: 0 var(--gutter-mobile) 32px;
    overflow-y: auto;
    background: var(--color-surface);

    &__backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--z-overlay);
      background: rgb(0 0 0 / 35%);
    }

    &__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: var(--header-height-mobile);
      flex-shrink: 0;
    }

    &__logo {
      display: inline-flex;
      text-decoration: none;
    }

    &__cart {
      position: relative;
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

    &__actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    &__icon-btn {
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

    &__links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 22px;
      margin-top: 28px;
    }

    &__link {
      padding: 0;
      border: none;
      font-family: var(--font-sans);
      font-size: 20px;
      font-weight: 500;
      line-height: 1.3;
      color: var(--color-text);
      text-decoration: none;
      background: transparent;
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__divider {
      margin: 28px 0;
      border-top: 1px solid var(--color-border);
    }

    &__account {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    &__account-row {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 0;
      border: none;
      font-family: var(--font-sans);
      font-size: 18px;
      font-weight: 500;
      color: var(--color-text);
      text-decoration: none;
      background: transparent;
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
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

  .mobile-nav-slide-enter-active,
  .mobile-nav-slide-leave-active {
    transition: transform var(--transition-drawer);
  }

  .mobile-nav-slide-enter-from,
  .mobile-nav-slide-leave-to {
    transform: translateX(100%);
  }
</style>
