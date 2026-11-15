<template>
  <div class="shop-mobile-toolbar">
    <form
      ref="formRef"
      class="shop-mobile-toolbar__search"
      @submit.prevent="onSearchSubmit()"
      @focusin="onFocusIn()"
      @focusout="onFocusOut($event)"
    >
      <UiSearchField
        id="shop-mobile-search"
        v-model="searchQuery"
        placeholder="Search"
        @submit="onSearchSubmit()"
        @escape="onSearchEscape()"
      />
      <SearchRecentQueries
        :visible="showRecentQueries"
        require-focus-on-mobile
        :field-focused="fieldFocused"
        :use-fade-transition="false"
      />
    </form>
    <button
      type="button"
      class="shop-mobile-toolbar__filters"
      aria-label="Open filters"
      @click="filters.openMobilePanel()"
    >
      <SlidersHorizontal :size="20" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { SlidersHorizontal } from '@lucide/vue'

  const filters = useShopFiltersStore()
  const { searchQuery, submitSearch } = useHeaderSearchPanel()

  const showRecentQueries = computed(() => !searchQuery.value.trim())

  const formRef = ref<HTMLElement | null>(null)
  const fieldFocused = ref(false)

  function onSearchSubmit() {
    submitSearch()
  }

  function onSearchEscape() {
    searchQuery.value = ''
  }

  function onFocusIn() {
    fieldFocused.value = true
  }

  function onFocusOut(event: FocusEvent) {
    const root = formRef.value
    if (!root) {
      fieldFocused.value = false
      return
    }
    const next = event.relatedTarget
    if (next instanceof Node && root.contains(next)) {
      return
    }
    fieldFocused.value = false
  }
</script>

<style scoped lang="scss">
  .shop-mobile-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    min-height: var(--header-mobile-toolbar-block);
    padding-block: 0 16px;
    border-bottom: 1px solid var(--color-border);

    @include mixins.respond-to(lg) {
      display: none;
    }

    &__search {
      position: relative;
      flex: 1;
      min-width: 0;
      z-index: var(--z-dropdown);
    }

    &__filters {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      border-radius: var(--radius-md);
      color: var(--color-text);
      background: var(--color-surface-muted);
      cursor: pointer;
      transition:
        opacity var(--transition-base),
        background var(--transition-base);

      &:hover {
        opacity: 0.85;
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }
  }
</style>
