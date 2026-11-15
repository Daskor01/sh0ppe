<template>
  <article class="blog-card">
    <NuxtLink :to="postTo" class="blog-card__media">
      <img :src="post.image" :alt="post.imageAlt" width="600" height="400" loading="lazy" />
    </NuxtLink>

    <p class="blog-card__meta">{{ post.category }} — {{ formatBlogDate(post.publishedAt) }}</p>

    <h2 class="blog-card__title">
      <NuxtLink :to="postTo">{{ post.title }}</NuxtLink>
    </h2>

    <p class="blog-card__excerpt">{{ post.excerpt }}</p>

    <NuxtLink :to="postTo" class="blog-card__more">Read More</NuxtLink>
  </article>
</template>

<script setup lang="ts">
  import type { BlogPost } from '~/types/blog'
  import { formatBlogDate } from '~/data/blog'
  import { blogPostPath } from '~/utils/routes'

  const props = defineProps<{
    post: BlogPost
  }>()

  const postTo = computed(() => blogPostPath(props.post.slug))
</script>

<style scoped lang="scss">
  .blog-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;

    &__media {
      display: block;
      width: 100%;
      margin-bottom: 16px;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--color-surface-muted);
      aspect-ratio: 4 / 3;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-base);
      }

      &:hover img {
        transform: scale(1.03);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__meta {
      margin: 0 0 8px;
      font-size: 13px;
      color: var(--color-text-muted);
    }

    &__title {
      margin: 0 0 10px;
      font-size: clamp(20px, 2.5vw, 24px);
      font-weight: 500;
      line-height: 1.25;

      a {
        color: var(--color-text);
        text-decoration: none;

        &:hover {
          color: var(--color-accent);
        }
      }
    }

    &__excerpt {
      margin: 0 0 12px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-muted);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__more {
      @include mixins.link-accent;
      margin-top: auto;
      font-size: 16px;
    }
  }
</style>
