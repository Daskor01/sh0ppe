<template>
  <NuxtLayout name="default">
    <section class="error-page" aria-labelledby="error-page-title">
      <h1 id="error-page-title" class="error-page__title">
        {{ errorTitle }}
      </h1>

      <p v-if="isNotFound" class="error-page__text">
        This page not found;<br class="error-page__br" />
        back to home and start again
      </p>
      <p v-else class="error-page__text">
        {{ errorMessage }}
      </p>

      <BaseButton
        variant="outline-dark"
        :block="false"
        class="error-page__cta"
        @click="goHome()"
      >
        Homepage
      </BaseButton>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

const errorTitle = computed(() =>
  isNotFound.value ? '404 Error' : 'Something went wrong',
)

const errorMessage = computed(
  () =>
    props.error.statusMessage ||
    props.error.message ||
    'Please try again or return to the homepage.',
)

useSeoMeta({
  title: () => (isNotFound.value ? '404 Error — SHOPPE' : 'Error — SHOPPE'),
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<style scoped lang="scss">
.error-page {
  @include mixins.container;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min(560px, calc(100dvh - 280px));
  padding-block: 64px 96px;
  text-align: center;

  @include mixins.respond-to(lg) {
    min-height: min(640px, calc(100dvh - 320px));
    padding-block: 96px 120px;
  }

  &__title {
    margin: 0 0 16px;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--color-text);
  }

  &__text {
    max-width: 420px;
    margin: 0 0 32px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-muted);
  }

  &__br {
    @include mixins.respond-to(lg) {
      display: none;
    }
  }

  &__cta {
    min-width: 200px;
    max-width: 280px;
  }
}
</style>
