<template>
  <div class="layout-default">
    <LayoutAppHeader />
    <main class="layout-default__main">
      <slot />
    </main>
    <LayoutAppFooter />
    <CartDrawer />
  </div>
</template>

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
  }
}
</style>
