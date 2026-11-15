<template>
  <aside class="shop-sidebar" aria-label="Shop filters">
    <h1 class="shop-sidebar__title">Shop The Latest</h1>
    <ShopFiltersForm variant="sidebar" />
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.shop-sidebar {
  &__title {
    margin: 0 0 24px;
    font-family: var(--font-serif);
    font-size: clamp(26px, 3vw, 33px);
    font-weight: 400;
    line-height: 1.2;
    color: var(--color-text);
  }

}
</style>
