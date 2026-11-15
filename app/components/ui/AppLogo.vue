<template>
  <NuxtLink :to="props.to" class="app-logo" aria-label="SHOPPE — Home"> SHOPPE </NuxtLink>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      to?: string
    }>(),
    { to: '/' },
  )
</script>

<style scoped lang="scss">
  .app-logo {
    display: block;
    font-family: var(--font-logo);
    font-weight: 400;
    font-size: clamp(28px, 8vw, 35px);
    line-height: 1;
    color: var(--light-colors-black---light);
    text-decoration: none;

    @include mixins.respond-to(lg) {
      line-height: 116%;
    }
  }
</style>
