<template>
  <NuxtLink :to="props.to" class="app-logo" aria-label="SHOPPE — Home">
    SHOPPE
  </NuxtLink>
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
  font-family: var(--font-logo);
  font-weight: 400;
  font-size: 35px;
  line-height: 116%;
  color: var(--light-colors-black---light);
  text-decoration: none;
}
</style>
