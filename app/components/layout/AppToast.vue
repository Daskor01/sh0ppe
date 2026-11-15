<template>
  <div
    class="app-toast-stack"
    :class="stackClass"
    :aria-hidden="!hasToasts"
    aria-live="polite"
    aria-atomic="true"
  >
    <TransitionGroup name="app-toast" tag="div" class="app-toast-stack__list">
      <article
        v-for="(item, index) in toast.items"
        :key="item.id"
        class="app-toast-stack__item"
        :style="{ zIndex: zIndex(index) }"
      >
        <div class="app-toast-stack__panel">
          <div class="app-toast-stack__inner">
            <div class="app-toast-stack__message">
              <span class="app-toast-stack__icon" aria-hidden="true">
                <Check :size="14" stroke-width="3" />
              </span>
              <p class="app-toast-stack__text">{{ item.message }}</p>
            </div>
            <NuxtLink
              v-if="item.action?.to"
              :to="item.action.to"
              class="app-toast-stack__action"
              @click="onActionClick(item.id)"
            >
              {{ item.action.label }}
            </NuxtLink>
            <button
              v-else-if="item.action?.onClick"
              type="button"
              class="app-toast-stack__action app-toast-stack__action--btn"
              @click="onActionButtonClick(item.id, item.action.onClick)"
            >
              {{ item.action.label }}
            </button>
          </div>
        </div>
      </article>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'

const toast = useToastStore()

function onActionClick(id: string) {
  toast.dismiss(id)
}

function onActionButtonClick(id: string, handler?: () => void) {
  handler?.()
  onActionClick(id)
}

const hasToasts = computed(() => toast.items.length > 0)

const stackClass = computed(() => ({
  'app-toast-stack--active': hasToasts.value,
}))

function zIndex(index: number) {
  return index + 1
}
</script>

<style scoped lang="scss">
.app-toast-stack {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: var(--z-toast);
  pointer-events: none;

  &__list {
    position: relative;
    height: 0;
    overflow: hidden;
  }

  &--active &__list {
    height: 52px;
  }

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: auto;
    transform-origin: top center;
    overflow: hidden;
  }

  &__panel {
    background: var(--color-surface-muted);
    border-top: 1px solid var(--color-accent);
    box-shadow: 0 8px 20px rgb(0 0 0 / 6%);
  }

  &__inner {
    @include mixins.container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 14px 0;
  }

  &__message {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  &__icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: var(--light-colors-white---light);
    background: var(--color-accent);
  }

  &__text {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    color: var(--color-text);
  }

  &__action {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-accent);
    transition: opacity var(--transition-base);

    &--btn {
      border: none;
      padding: 0;
      font-family: var(--font-sans);
      background: transparent;
      cursor: pointer;
    }

    &:hover {
      opacity: 0.85;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  @media (max-width: 1023px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    width: 100%;

    &__list {
      overflow: visible;
    }

    &--active &__list {
      height: auto;
    }

    &__item {
      position: relative;
      overflow: visible;
    }

    &__panel {
      border-top: none;
      border: 1px solid var(--color-accent);
      border-radius: var(--radius-md);
      box-shadow: 0 4px 16px rgb(0 0 0 / 6%);
    }

    &__inner {
      max-width: none;
      margin-inline: 0;
      align-items: flex-start;
      gap: 10px 12px;
      padding: 12px 14px;
    }

    &__message {
      flex: 1;
      align-items: flex-start;
    }

    &__text {
      font-size: 13px;
      line-height: 1.45;
    }

    &__action {
      align-self: center;
      padding-top: 2px;
    }
  }
}

.app-toast-enter-active,
.app-toast-leave-active {
  transition: transform var(--transition-drawer);
}

.app-toast-enter-from,
.app-toast-leave-to {
  transform: scaleY(0);
}

.app-toast-enter-to,
.app-toast-leave-from {
  transform: scaleY(1);
}

@media (max-width: 1023px) {
  .app-toast-enter-active,
  .app-toast-leave-active {
    transition:
      opacity 0.28s ease,
      transform 0.28s ease;
  }

  .app-toast-enter-from,
  .app-toast-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  .app-toast-enter-to,
  .app-toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .app-toast-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}

@media (min-width: 1024px) {
  .app-toast-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
