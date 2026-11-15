<template>
  <div
    class="search-recent"
    :class="{
      'search-recent--require-focus-mobile': requireFocusOnMobile,
      'search-recent--focused': fieldFocused,
      'search-recent--content-hidden': contentRevealed === false,
    }"
    aria-label="Recent searches"
  >
    <p class="search-recent__label">Recent searches</p>
    <ul class="search-recent__list">
      <li
        v-for="(query, index) in recents"
        :key="query"
        class="search-recent__list-item"
        :class="{ 'search-recent__list-item--desktop-only': isDesktopOnlyRecent(index) }"
      >
        <button type="button" class="search-recent__item" @click="emit('select', query)">
          {{ query }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RECENT_SEARCHES_MOBILE_VISIBLE } from '~/utils/recentSearches'

defineProps<{
  recents: string[]
  requireFocusOnMobile?: boolean
  fieldFocused?: boolean
  contentRevealed?: boolean
}>()

const emit = defineEmits<{
  select: [query: string]
}>()

function isDesktopOnlyRecent(index: number) {
  return index >= RECENT_SEARCHES_MOBILE_VISIBLE
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/components/search-recent';
</style>
