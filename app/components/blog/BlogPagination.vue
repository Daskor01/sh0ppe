<template>
  <nav v-if="totalPages > 1" class="blog-pagination" aria-label="Blog pagination">
    <ul class="blog-pagination__list">
      <li v-for="pageNumber in totalPages" :key="pageNumber">
        <button
          type="button"
          class="blog-pagination__btn"
          :class="pageButtonClass(pageNumber)"
          :aria-current="pageAriaCurrent(pageNumber)"
          @click="selectPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </li>

      <li v-if="showNextPage">
        <button
          type="button"
          class="blog-pagination__btn blog-pagination__btn--next"
          aria-label="Next page"
          @click="selectPage(page + 1)"
        >
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { ChevronRight } from '@lucide/vue'

  const props = defineProps<{
    page: number
    totalPages: number
  }>()

  const emit = defineEmits<{
    change: [page: number]
  }>()

  const showNextPage = computed(() => props.page < props.totalPages)

  function isPageActive(pageNumber: number) {
    return pageNumber === props.page
  }

  function pageAriaCurrent(pageNumber: number) {
    return isPageActive(pageNumber) ? 'page' : undefined
  }

  function pageButtonClass(pageNumber: number) {
    return { 'blog-pagination__btn--active': isPageActive(pageNumber) }
  }

  function selectPage(nextPage: number) {
    if (nextPage === props.page || nextPage < 1 || nextPage > props.totalPages) {
      return
    }
    emit('change', nextPage)
  }
</script>

<style scoped lang="scss">
  .blog-pagination {
    display: flex;
    justify-content: center;
    padding-top: 40px;

    @include mixins.respond-to(lg) {
      padding-top: 48px;
    }

    &__list {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid var(--color-text);
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text);
      background: var(--color-surface);
      cursor: pointer;
      transition:
        background var(--transition-base),
        color var(--transition-base);

      &:hover:not(.blog-pagination__btn--active) {
        background: var(--color-surface-muted);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }

      &--active {
        color: var(--light-colors-white---light);
        background: var(--color-text);
        border-color: var(--color-text);
        cursor: default;
      }

      &--next {
        padding-inline: 8px;
      }
    }
  }
</style>
