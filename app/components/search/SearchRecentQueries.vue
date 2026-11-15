<template>
  <Transition v-if="useFadeTransition" name="search-recent-fade">
    <SearchRecentQueriesPanel
      v-if="showPanel"
      :recents="recents"
      :require-focus-on-mobile="requireFocusOnMobile"
      :field-focused="fieldFocused"
      :content-revealed="contentRevealed"
      @select="onSelect"
    />
  </Transition>
  <SearchRecentQueriesPanel
    v-else-if="showPanel"
    :recents="recents"
    :require-focus-on-mobile="requireFocusOnMobile"
    :field-focused="fieldFocused"
    :content-revealed="contentRevealed"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    visible?: boolean
    requireFocusOnMobile?: boolean
    fieldFocused?: boolean
    contentRevealed?: boolean
    useFadeTransition?: boolean
  }>(),
  {
    visible: true,
    requireFocusOnMobile: false,
    fieldFocused: false,
    contentRevealed: true,
    useFadeTransition: true,
  },
)

const { recents, applyRecent } = useSiteSearch()

const showPanel = computed(() => props.visible && recents.value.length > 0)

function onSelect(query: string) {
  applyRecent(query)
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/components/search-recent';

.search-recent-fade-enter-active,
.search-recent-fade-leave-active {
  transition:
    opacity var(--transition-panel),
    transform var(--transition-panel);
}

.search-recent-fade-enter-from,
.search-recent-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.search-recent-fade-leave-active {
  overflow: hidden;
}
</style>
