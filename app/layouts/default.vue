<template>
  <div class="layout-default" :class="layoutRootClass">
    <LayoutAppHeader />
    <LayoutAppToast />
    <main class="layout-default__main">
      <slot />
    </main>
    <LayoutAppFooter />
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  const layoutRootClass = computed(() => ({
    'layout-default--mobile-search-row': route.path === '/' || route.path === '/shop',
  }))

  useHead({
    htmlAttrs: {
      class: computed(() =>
        route.path === '/' || route.path === '/shop' ? 'layout-mobile-search-row' : undefined,
      ),
    },
  })
</script>

<style scoped lang="scss">
  .layout-default {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: visible;

    /* sticky header must not shrink inside flex column */
    > :first-child {
      flex-shrink: 0;
      width: 100%;
    }

    &__main {
      flex: 1;
      min-width: 0;
      padding-top: var(--site-header-offset, var(--header-height-mobile));
    }
  }
</style>
