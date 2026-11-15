<template>
  <div class="header-mobile-search">
    <form
      ref="formRef"
      class="header-mobile-search__form"
      @submit.prevent="emit('submit')"
      @focusin="onFocusIn()"
      @focusout="onFocusOut($event)"
    >
      <UiSearchField v-model="searchQuery" @submit="emit('submit')" @escape="emit('escape')" />
      <SearchRecentQueries
        :visible="showRecentQueries"
        require-focus-on-mobile
        :field-focused="fieldFocused"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
  const searchQuery = defineModel<string>({ required: true })

  const showRecentQueries = computed(() => !searchQuery.value.trim())

  const emit = defineEmits<{
    submit: []
    escape: []
  }>()

  const formRef = ref<HTMLElement | null>(null)
  const fieldFocused = ref(false)

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
  .header-mobile-search {
    position: relative;
    padding-block: 0 16px;

    @include mixins.respond-to(lg) {
      display: none;
    }

    &__form {
      position: relative;
    }
  }
</style>
