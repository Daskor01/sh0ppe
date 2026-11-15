<template>
  <nav class="account-nav" aria-label="Account sections">
    <div class="account-nav__scroll">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="account-nav__link"
        :class="{ 'account-nav__link--active': isActive(link) }"
      >
        {{ link.label }}
      </NuxtLink>
      <button type="button" class="account-nav__link account-nav__link--logout" @click="onLogout()">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { signOut } = useAccountSession()

const links = [
  { label: 'Dashboard', to: '/account', exact: true },
  { label: 'Orders', to: '/account/orders', exact: false },
  { label: 'Wishlist', to: '/account/wishlist', exact: false },
  { label: 'Addresses', to: '/account/addresses', exact: false },
  { label: 'Account details', to: '/account/details', exact: false },
] as const

function isActive(link: (typeof links)[number]) {
  if (link.exact) {
    return route.path === link.to
  }
  return route.path === link.to || route.path.startsWith(`${link.to}/`)
}

function onLogout() {
  signOut()
  useToastStore().show({ message: 'You have been signed out.' })
  navigateTo('/account')
}
</script>

<style scoped lang="scss">
.account-nav {
  margin-bottom: 32px;
  border-bottom: 1px solid var(--color-border);

  @include mixins.respond-to(lg) {
    margin-bottom: 40px;
  }

  &__scroll {
    display: flex;
    gap: 28px;
    align-items: stretch;
    margin-bottom: -1px;
    overflow-x: auto;
    padding-bottom: 1px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @include mixins.respond-to(md) {
      gap: 40px;
    }

    @include mixins.respond-to(lg) {
      gap: 48px;
      flex-wrap: wrap;
      overflow: visible;
    }
  }

  &__link {
    flex-shrink: 0;
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 0 14px;
    border: none;
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text-muted);
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: color var(--transition-base);

    @include mixins.respond-to(lg) {
      font-size: 16px;
    }

    &:hover {
      color: var(--color-text);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }

    &--active {
      color: var(--color-text);

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

    &--logout {
      @include mixins.respond-to(lg) {
        margin-left: auto;
      }
    }
  }
}
</style>
