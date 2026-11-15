<template>
  <label class="base-toggle">
    <span class="base-toggle__label">{{ label }}</span>
    <button
      type="button"
      class="base-toggle__control"
      role="switch"
      :aria-checked="model"
      @click="model = !model"
    >
      <span class="base-toggle__thumb" />
    </button>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

defineProps<{
  label: string
}>()
</script>

<style scoped lang="scss">
.base-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;

  &__label {
    font-size: 16px;
    color: var(--color-text);
  }

  &__control {
    position: relative;
    flex-shrink: 0;
    width: 44px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: var(--color-border);
    cursor: pointer;
    transition: background var(--transition-base);

    &[aria-checked='true'] {
      background: var(--color-text);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--light-colors-white---light);
    transition: transform var(--transition-base);
  }

  &__control[aria-checked='true'] &__thumb {
    transform: translateX(20px);
  }
}
</style>
