<template>
  <div class="order-banner" role="status">
    <CircleCheck class="order-banner__icon" :size="22" aria-hidden="true" />
    <p class="order-banner__text">We&apos;ve received your order.</p>
  </div>
</template>

<script setup lang="ts">
  import { CircleCheck } from '@lucide/vue'
</script>

<style scoped lang="scss">
  .order-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 16px;
    background: var(--color-surface-muted);
    border-block: 1px solid var(--color-border);

    &__icon {
      flex-shrink: 0;
      color: var(--color-accent);
    }

    &__text {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-text);
    }
  }
</style>
