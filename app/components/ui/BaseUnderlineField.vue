<template>
  <div class="base-underline-field" :class="{ 'base-underline-field--disabled': disabled }">
    <label class="base-underline-field__label" :for="fieldId">{{ label }}</label>

    <div
      class="base-underline-field__control"
      :class="{ 'base-underline-field__control--area': multiline }"
    >
      <textarea
        v-if="multiline"
        :id="fieldId"
        v-model="model"
        class="base-underline-field__input base-underline-field__input--area"
        :rows="rows"
        :name="fieldId"
        :disabled="disabled"
        :readonly="disabled"
      />
      <input
        v-else
        :id="fieldId"
        v-model="model"
        class="base-underline-field__input"
        :type="type"
        :name="fieldId"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="disabled"
      />

      <button
        v-if="showClear"
        type="button"
        class="base-underline-field__clear"
        :aria-label="`Clear ${label}`"
        @click="clearValue()"
      >
        <X :size="16" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { X } from '@lucide/vue'

  const model = defineModel<string>({ default: '' })

  const props = withDefaults(
    defineProps<{
      id?: string
      label: string
      type?: 'text' | 'email' | 'tel' | 'password'
      autocomplete?: string
      clearable?: boolean
      multiline?: boolean
      rows?: number
      disabled?: boolean
    }>(),
    {
      type: 'text',
      id: undefined,
      autocomplete: undefined,
      clearable: false,
      multiline: false,
      rows: 5,
      disabled: false,
    },
  )

  const fallbackId = useId()
  const fieldId = computed(() => props.id || fallbackId)

  const showClear = computed(
    () => props.clearable && !props.disabled && model.value.length > 0 && !props.multiline,
  )

  function clearValue() {
    model.value = ''
  }
</script>

<style scoped lang="scss">
  .base-underline-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    &__label {
      font-size: 14px;
      line-height: 1.3;
      color: var(--color-text-muted);
    }

    &__control {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-border);
      transition: border-color var(--transition-base);

      &:focus-within {
        border-bottom-color: var(--color-text);
      }

      .base-underline-field--disabled & {
        border-bottom-color: var(--color-border);
      }

      &--area {
        align-items: stretch;
        padding: 12px 14px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        border-bottom: 1px solid var(--color-border);

        &:focus-within {
          border-color: var(--color-text-muted);
        }

        .base-underline-field--disabled & {
          border-color: var(--color-border);
          background: var(--color-surface-muted);
        }
      }
    }

    &__input {
      flex: 1;
      min-width: 0;
      padding: 0;
      border: none;
      font-family: var(--font-sans);
      @include mixins.field-text-size;
      line-height: 1.4;
      color: var(--color-text);
      background: transparent;

      &:focus {
        outline: none;
      }

      &--area {
        min-height: 120px;
        padding: 0;
        resize: vertical;
      }

      &:disabled {
        color: var(--color-text-muted);
        cursor: not-allowed;
      }
    }

    &--disabled &__label {
      color: var(--color-text-subtle);
    }

    &__clear {
      display: inline-flex;
      flex-shrink: 0;
      padding: 2px;
      border: none;
      color: var(--color-text-muted);
      background: transparent;
      cursor: pointer;

      &:hover {
        color: var(--color-text);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }
  }
</style>
