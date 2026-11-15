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

  &__main {
    flex: 1;
  }
}
</style>
