<template>
  <Transition
    name="desktop-search-slide"
    @after-enter="onAfterEnter()"
    @before-leave="onBeforeLeave()"
  >
    <div v-if="open" ref="rootRef" class="header-desktop-search">
      <div class="header-desktop-search__panel">
        <form class="header-desktop-search__inner" @submit.prevent="emit('submit')">
          <UiSearchField
            id="desktop-header-search"
            ref="searchFieldRef"
            v-model="searchQuery"
            placeholder="Search products"
            @escape="emit('escape')"
            @submit="emit('submit')"
          />
          <SearchRecentQueries
            :visible="showRecentQueries"
            :content-revealed="recentsVisible"
            :use-fade-transition="false"
          />
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const searchQuery = defineModel<string>({ required: true })

  const showRecentQueries = computed(() => !searchQuery.value.trim())

  defineProps<{
    open: boolean
    recentsVisible: boolean
  }>()

  const emit = defineEmits<{
    submit: []
    escape: []
    afterEnter: []
    beforeLeave: []
  }>()

  const searchFieldRef = ref<{ focus: () => void } | null>(null)
  const rootRef = ref<HTMLElement | null>(null)

  defineExpose({
    focus: () => searchFieldRef.value?.focus(),
    containsTarget: (target: Node) => rootRef.value?.contains(target) ?? false,
  })

  function onAfterEnter() {
    emit('afterEnter')
  }

  function onBeforeLeave() {
    emit('beforeLeave')
  }
</script>

<style scoped lang="scss">
  .header-desktop-search {
    display: none;
    overflow: hidden;
    background: var(--color-surface);
    transform: translateZ(0);

    @include mixins.respond-to(lg) {
      display: grid;
      grid-template-rows: 1fr;
      border-bottom: 1px solid var(--color-border);
    }

    &__panel {
      min-height: 0;
      overflow: hidden;
      will-change: transform, opacity;
    }

    &__inner {
      @include mixins.container;
      padding-block: 16px 20px;
    }
  }

  .desktop-search-slide-enter-active,
  .desktop-search-slide-leave-active {
    transition: grid-template-rows 0.34s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .desktop-search-slide-enter-active .header-desktop-search__panel,
  .desktop-search-slide-leave-active .header-desktop-search__panel {
    transition:
      opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.34s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (min-width: 1024px) {
    .desktop-search-slide-enter-from,
    .desktop-search-slide-leave-to {
      grid-template-rows: 0fr;
    }

    .desktop-search-slide-enter-to,
    .desktop-search-slide-leave-from {
      grid-template-rows: 1fr;
    }

    .desktop-search-slide-enter-from .header-desktop-search__panel,
    .desktop-search-slide-leave-to .header-desktop-search__panel {
      opacity: 0;
      transform: translate3d(0, -6px, 0);
    }

    .desktop-search-slide-enter-to .header-desktop-search__panel,
    .desktop-search-slide-leave-from .header-desktop-search__panel {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .desktop-search-slide-enter-to .header-desktop-search__panel,
  .desktop-search-slide-leave-from .header-desktop-search__panel {
    will-change: auto;
  }
</style>
