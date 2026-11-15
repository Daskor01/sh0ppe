<template>
  <section class="about-section" :aria-labelledby="sectionTitleId">
    <h2 :id="sectionTitleId" class="about-section__title">
      {{ section.title }}
    </h2>

    <figure class="about-section__figure">
      <img :src="section.image" :alt="section.imageAlt" width="960" height="540" loading="lazy" />
    </figure>

    <div class="about-section__body">
      <p v-for="(paragraph, index) in section.paragraphs" :key="index">
        {{ paragraph }}
      </p>

      <ul v-if="hasBullets" class="about-section__list">
        <li v-for="(item, index) in section.bullets" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import type { AboutSection } from '~/data/aboutPage'

  const props = defineProps<{
    section: AboutSection
  }>()

  const sectionTitleId = computed(() => `about-${props.section.id}-title`)

  const hasBullets = computed(() => (props.section.bullets?.length ?? 0) > 0)
</script>

<style scoped lang="scss">
  .about-section {
    & + & {
      margin-top: 48px;

      @include mixins.respond-to(lg) {
        margin-top: 56px;
      }
    }

    &__title {
      margin: 0 0 20px;
      font-size: clamp(22px, 3vw, 28px);
      font-weight: 500;
      line-height: 1.25;
      color: var(--color-text);
      text-align: left;
    }

    &__figure {
      margin: 0 0 24px;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--color-surface-muted);
      aspect-ratio: 16 / 10;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__body {
      font-size: 16px;
      line-height: 1.7;
      color: var(--color-text-muted);

      p {
        margin: 0 0 1.25em;
      }
    }

    &__list {
      margin: 0;
      padding-left: 1.25em;

      li {
        margin-bottom: 0.5em;
      }
    }
  }
</style>
