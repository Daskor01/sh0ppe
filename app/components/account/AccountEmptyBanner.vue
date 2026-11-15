<template>
  <div class="account-empty-banner">
    <p class="account-empty-banner__message">{{ message }}</p>
    <NuxtLink to="/shop" class="account-empty-banner__cta">Browse product</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped lang="scss">
.account-empty-banner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 16px;
  background: var(--color-surface-muted);

  @include mixins.respond-to(md) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 22px 24px;
  }

  &__message {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-text);
  }

  &__cta {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--color-accent);
    text-decoration: none;
    text-transform: uppercase;
    transition: opacity var(--transition-base);

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>
