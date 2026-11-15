<template>
  <button
    :type="props.type"
    class="base-button"
    :class="buttonClass"
    :disabled="isDisabled"
    :aria-busy="props.loading"
  >
    <slot v-if="!props.loading" />
    <span v-else class="base-button__loading">{{ loadingLabel }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'ghost-light' | 'solid-dark' | 'solid-black' | 'outline-dark'
    block?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    loadingLabel?: string
  }>(),
  {
    variant: 'solid-dark',
    type: 'button',
    disabled: false,
    loading: false,
    loadingLabel: 'Loading…',
    block: true,
  },
)

const isDisabled = computed(() => props.disabled || props.loading)

const buttonClass = computed(() => [
  `base-button--${props.variant}`,
  { 'base-button--inline': !props.block },
])
</script>

<style scoped lang="scss">
.base-button {
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  transition:
    opacity var(--transition-base),
    background var(--transition-base);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--ghost-light {
    @include mixins.button-ghost-light;
  }

  &--solid-dark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 16px;
    color: var(--light-colors-white---light);
    background: rgb(0 0 0 / 55%);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 12px;

    &:hover:not(:disabled) {
      background: rgb(0 0 0 / 70%);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &--inline {
    width: auto;
  }

  &__loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &--solid-black {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 24px;
    color: var(--light-colors-white---light);
    background: var(--color-text);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 12px;

    &:hover:not(:disabled) {
      opacity: 0.88;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &--outline-dark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 16px;
    color: var(--color-text);
    background: var(--color-surface);
    border: 1px solid var(--color-text);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 12px;

    &:hover:not(:disabled) {
      background: var(--color-surface-muted);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>
