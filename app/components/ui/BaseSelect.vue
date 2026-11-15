<template>
  <div ref="rootRef" class="base-select" :class="rootClass" @keydown="onKeydown">
    <button
      type="button"
      class="base-select__trigger"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listId"
      :disabled="disabled"
      @click="toggle()"
    >
      <span class="base-select__value" :class="valuePlaceholderClass">
        {{ selectedLabel }}
      </span>
      <ChevronDown
        class="base-select__chevron"
        :class="{ 'base-select__chevron--open': open }"
        :size="18"
        aria-hidden="true"
      />
    </button>

    <Transition name="base-select-dropdown">
      <ul
        v-if="open"
        :id="listId"
        class="base-select__list"
        role="listbox"
        :aria-label="props['aria-label']"
      >
        <li
          v-for="option in options"
          :key="option.value"
          role="option"
          :aria-selected="isOptionSelected(option.value)"
          class="base-select__option"
          :class="{ 'base-select__option--selected': isOptionSelected(option.value) }"
        >
          <button type="button" class="base-select__option-btn" @click="select(option.value)">
            {{ option.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
  import { ChevronDown } from '@lucide/vue'
  import type { BaseSelectOption } from '~/types/ui'

  const model = defineModel<T>({ required: true })

  const props = withDefaults(
    defineProps<{
      options: BaseSelectOption<T>[]
      // eslint-disable-next-line vue/prop-name-casing -- matches aria-label in templates
      'aria-label': string
      variant?: 'boxed' | 'underline'
      disabled?: boolean
    }>(),
    {
      variant: 'boxed',
      disabled: false,
    },
  )

  const open = ref(false)
  const rootRef = ref<HTMLElement | null>(null)
  const listId = useId()

  const selectedLabel = computed(
    () => props.options.find((option) => option.value === model.value)?.label ?? '',
  )

  const rootClass = computed(() => [
    `base-select--${props.variant}`,
    { 'base-select--disabled': props.disabled },
  ])

  const valuePlaceholderClass = computed(() => ({
    'base-select__value--placeholder': props.variant === 'underline' && model.value === '',
  }))

  function isOptionSelected(value: T) {
    return value === model.value
  }

  function toggle() {
    if (props.disabled) {
      return
    }
    open.value = !open.value
  }

  function close() {
    open.value = false
  }

  function select(value: T) {
    model.value = value
    close()
  }

  function onDocumentPointerDown(event: PointerEvent) {
    const root = rootRef.value
    if (!root || !open.value) {
      return
    }
    if (!root.contains(event.target as Node)) {
      close()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close()
    }
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
  })
</script>

<style scoped lang="scss">
  .base-select {
    position: relative;

    &__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 14px 16px;
      font-family: var(--font-sans);
      @include mixins.field-text-size;
      text-align: left;
      color: var(--color-text-muted);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: border-color var(--transition-base);

      &:hover {
        border-color: var(--color-text-muted);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__value {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__chevron {
      flex-shrink: 0;
      color: var(--color-text-muted);
      transition: transform var(--transition-base);

      &--open {
        transform: rotate(180deg);
      }
    }

    &__list {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: var(--z-dropdown);
      width: 100%;
      max-height: 240px;
      margin: 0;
      padding: 6px 0;
      overflow-y: auto;
      list-style: none;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
    }

    &__option {
      margin: 0;
    }

    &__option-btn {
      display: block;
      width: 100%;
      padding: 10px 16px;
      border: none;
      font-family: var(--font-sans);
      font-size: 14px;
      text-align: left;
      color: var(--color-text);
      background: transparent;
      cursor: pointer;
      transition: background var(--transition-base);

      &:hover {
        background: var(--color-surface-muted);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__option--selected &__option-btn {
      color: var(--color-accent);
      font-weight: 500;
    }

    &--disabled {
      .base-select__trigger {
        cursor: not-allowed;
        opacity: 0.72;
      }
    }

    &--underline {
      .base-select__trigger {
        padding: 0 0 10px;
        color: var(--color-text);
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--color-border);
        border-radius: 0;

        &:hover {
          border-bottom-color: var(--color-text-muted);
        }
      }

      .base-select__value--placeholder {
        color: var(--color-text-muted);
      }

      .base-select__value:not(.base-select__value--placeholder) {
        color: var(--color-text);
      }

      &:has(.base-select__trigger[aria-expanded='true']) .base-select__trigger,
      .base-select__trigger:focus-visible {
        border-bottom-color: var(--color-text);
      }
    }
  }

  .base-select-dropdown-enter-active,
  .base-select-dropdown-leave-active {
    transition:
      opacity var(--transition-dropdown),
      transform var(--transition-dropdown);
    transform-origin: top center;
  }

  .base-select-dropdown-enter-from,
  .base-select-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }

  .base-select-dropdown-enter-to,
  .base-select-dropdown-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
</style>
