<template>
  <article class="about-page">
    <header class="about-page__hero">
      <h1 class="about-page__title">{{ aboutPageIntro.title }}</h1>
      <p class="about-page__subtitle">{{ aboutPageIntro.subtitle }}</p>
      <p class="about-page__lead">{{ aboutPageIntro.lead }}</p>
    </header>

    <div class="about-page__sections">
      <AboutStorySection
        v-for="section in aboutPageSections"
        :key="section.id"
        :section="section"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
  import AboutStorySection from '~/components/about/AboutStorySection.vue'
  import { aboutPageIntro, aboutPageSections } from '~/data/aboutPage'

  useSeoMeta({
    title: 'Our Story — SHOPPE',
    description: 'Who we are and why we do what we do — the story behind SHOPPE jewelry.',
  })
</script>

<style scoped lang="scss">
  .about-page {
    @include mixins.container;
    max-width: 800px;
    padding-block: 24px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 48px 80px;
    }

    &__hero {
      margin-bottom: 40px;

      @include mixins.respond-to(lg) {
        margin-bottom: 48px;
        text-align: center;
      }
    }

    &__title {
      margin: 0 0 12px;
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 500;
      line-height: 1.2;
      color: var(--color-text);
      text-align: left;

      @include mixins.respond-to(lg) {
        margin-bottom: 16px;
        text-align: center;
      }
    }

    &__subtitle {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--color-text-muted);
      text-align: left;

      @include mixins.respond-to(lg) {
        text-align: center;
      }
    }

    &__lead {
      margin: 0;
      font-size: 16px;
      line-height: 1.7;
      color: var(--color-text-muted);
      text-align: left;

      @include mixins.respond-to(lg) {
        text-align: justify;
      }
    }

    &__sections {
      min-width: 0;
    }
  }
</style>
