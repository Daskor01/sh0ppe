<template>
  <div class="search-field" :class="rootClass">
    <Search
      v-if="showStartIcon"
      class="search-field__icon search-field__icon--search"
      :size="18"
      aria-hidden="true"
    />

    <label class="search-field__label" :for="props.id">
      <span class="visually-hidden">{{ placeholder }}</span>
      <input
        :id="props.id"
        ref="inputRef"
        v-model="model"
        class="search-field__input"
        type="text"
        role="searchbox"
        :placeholder="props.placeholder"
        autocomplete="off"
        @keydown.escape="emit('escape')"
        @keydown.enter.prevent="emit('submit')"
      />
    </label>

    <button
      v-if="props.clearable"
      type="button"
      class="search-field__clear"
      :class="{ 'search-field__clear--hidden': !showClear }"
      :aria-hidden="!showClear"
      :tabindex="showClear ? 0 : -1"
      aria-label="Clear search"
      @click="clearInput()"
    >
      <X :size="16" aria-hidden="true" />
    </button>

    <Search
      v-if="showEndIcon"
      class="search-field__icon search-field__icon--search"
      :size="18"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
  import { Search, X } from '@lucide/vue'

  const model = defineModel<string>({ default: '' })

  const emit = defineEmits<{
    escape: []
    submit: []
  }>()

  const props = withDefaults(
    defineProps<{
      placeholder?: string
      id?: string
      clearable?: boolean
      variant?: 'filled' | 'underline'
      iconPosition?: 'start' | 'end'
    }>(),
    {
      placeholder: 'Search',
      id: 'site-search',
      clearable: true,
      variant: 'filled',
      iconPosition: 'start',
    },
  )

  const showClear = computed(() => props.clearable && model.value.length > 0)

  const rootClass = computed(() => [
    `search-field--${props.variant}`,
    { 'search-field--icon-end': props.iconPosition === 'end' },
  ])

  const showStartIcon = computed(() => props.iconPosition === 'start')
  const showEndIcon = computed(() => props.iconPosition === 'end')

  const inputRef = ref<HTMLInputElement | null>(null)

  function clearInput() {
    model.value = ''
  }

  function focusInput() {
    inputRef.value?.focus()
  }

  defineExpose({
    focus: focusInput,
  })
</script>

<style scoped lang="scss">
  .search-field {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    &__label {
      flex: 1;
      min-width: 0;
    }

    &__input {
      display: block;
      width: 100%;
      min-width: 0;
      border: none;
      background: transparent;
      font-family: var(--font-sans);
      @include mixins.field-text-size;
      color: var(--color-text);

      &::placeholder {
        color: var(--color-text-muted);
      }

      &:focus {
        outline: none;
      }
    }

    &__icon {
      flex-shrink: 0;
      color: var(--color-text-muted);
    }

    &__clear {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      border-radius: 50%;
      color: var(--color-text-muted);
      background: transparent;
      cursor: pointer;
      transition:
        color var(--transition-base),
        background var(--transition-base);

      &--hidden {
        visibility: hidden;
        pointer-events: none;
      }

      &:hover {
        color: var(--color-text);
        background: rgb(0 0 0 / 6%);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &--filled {
      box-sizing: border-box;
      min-height: 44px;
      padding: 10px 16px;
      background: var(--color-surface-muted);
      border-radius: var(--radius-md);
    }

    &--underline {
      padding-bottom: 8px;
      border-bottom: 1px solid var(--color-border);
    }

    &--icon-end {
      gap: 8px;
    }
  }

  .visually-hidden {
    @include mixins.visually-hidden;
  }
</style>
