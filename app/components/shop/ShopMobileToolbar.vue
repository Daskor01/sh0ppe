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
  const { fieldFocused, onFocusIn, onFocusOut } = useContainedFieldFocus(formRef)

  function onSearchSubmit() {
    submitSearch()
  }

  function onSearchEscape() {
    searchQuery.value = ''
  }
</script>

<style scoped lang="scss">
  .shop-mobile-toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 44px;
    column-gap: 12px;
    align-items: center;
    box-sizing: border-box;
    height: var(--header-mobile-toolbar-block);
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

      :deep(svg) {
        display: block;
        width: 20px;
        height: 20px;
      }

      @include mixins.focus-ring-fine-pointer-only;
    }
  }
</style>
