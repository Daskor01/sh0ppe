<template>
  <article class="blog-article">
    <NuxtLink to="/blog" class="blog-article__back">← Back to Blog</NuxtLink>

    <p class="blog-article__meta">
      {{ post.category }} — {{ formatBlogDate(post.publishedAt) }}
    </p>

    <h1 class="blog-article__title">{{ post.title }}</h1>

    <div class="blog-article__media">
      <img :src="post.image" :alt="post.imageAlt" width="960" height="540" />
    </div>

    <div class="blog-article__body">
      <p v-for="(paragraph, index) in post.body.split('\n\n')" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatBlogDate, getBlogPostBySlug } from '~/data/blog'
import type { BlogPost } from '~/types/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const post = computed((): BlogPost => {
  const item = getBlogPostBySlug(slug.value)
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true })
  }
  return item
})

useSeoMeta({
  title: () => `${post.value.title} — SHOPPE Blog`,
  description: () => post.value.excerpt,
})
</script>

<style scoped lang="scss">
.blog-article {
  @include mixins.container;
  max-width: 760px;
  padding-block: 24px 56px;

  @include mixins.respond-to(lg) {
    padding-block: 40px 72px;
  }

  &__back {
    @include mixins.link-accent;
    display: inline-block;
    margin-bottom: 24px;
    font-size: 14px;
  }

  &__meta {
    margin: 0 0 8px;
    font-size: 13px;
    color: var(--color-text-muted);
  }

  &__title {
    margin: 0 0 24px;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 500;
    line-height: 1.2;
  }

  &__media {
    margin-bottom: 28px;
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
    color: var(--color-text);

    p {
      margin: 0 0 1.25em;
    }
  }
}
</style>
