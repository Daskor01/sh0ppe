<template>
  <div class="blog-page">
    <h1 class="blog-page__title">Blog</h1>

    <div class="blog-page__grid">
      <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <BlogPagination :page="currentPage" :total-pages="totalPages" @change="goToPage($event)" />
  </div>
</template>

<script setup lang="ts">
  import BlogPagination from '~/components/blog/BlogPagination.vue'
  import BlogPostCard from '~/components/blog/BlogPostCard.vue'
  import { getBlogPostsForPage } from '~/data/blog'

  useSeoMeta({
    title: 'Blog — SHOPPE',
    description: 'Fashion notes, styling ideas and news from SHOPPE.',
  })

  const { currentPage, totalPages, goToPage } = useBlogPage()

  const posts = computed(() => getBlogPostsForPage(currentPage.value))

  watch(currentPage, () => {
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
</script>

<style scoped lang="scss">
  .blog-page {
    @include mixins.container;
    padding-block: 24px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 40px 72px;
    }

    &__title {
      margin: 0 0 28px;
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 500;
      line-height: 1.2;
      color: var(--color-text);

      @include mixins.respond-to(lg) {
        margin-bottom: 36px;
      }
    }

    &__grid {
      display: grid;
      gap: 32px 24px;

      @include mixins.respond-to(lg) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 48px 40px;
      }
    }
  }
</style>
