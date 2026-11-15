<template>
  <section class="account-address-empty">
    <div class="account-address-empty__head">
      <h2 class="account-address-empty__title">{{ title }}</h2>
      <button
        v-if="!ACCOUNT_PROFILE_READONLY"
        type="button"
        class="account-address-empty__add"
        @click="emit('add')"
      >
        Add
      </button>
    </div>
    <p class="account-address-empty__message">You have not set up this type of address yet.</p>
  </section>
</template>

<script setup lang="ts">
import { ACCOUNT_PROFILE_READONLY } from '~/data/accountMock'

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  add: []
}>()
</script>

<style scoped lang="scss">
.account-address-empty {
  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text);
  }

  &__add {
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__message {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);
  }
}
</style>
