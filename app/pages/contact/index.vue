<template>
  <div class="contact-page">
    <h1 class="contact-page__title">
      <span class="contact-page__title-short">Contact</span>
      <span class="contact-page__title-full">Contact Us</span>
    </h1>

    <ContactForm class="contact-page__form" />
  </div>
</template>

<script setup lang="ts">
import ContactForm from '~/components/contact/ContactForm.vue'

useSeoMeta({
  title: 'Contact — SHOPPE',
  description:
    'Get in touch with SHOPPE — questions about orders, products, shipping or share your ideas with our team.',
})
</script>

<style scoped lang="scss">
.contact-page {
  @include mixins.container;
  padding-block: 24px 56px;

  @include mixins.respond-to(lg) {
    padding-block: 48px 80px;
  }

  &__title {
    margin: 0 0 24px;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 500;
    line-height: 1.2;
    color: var(--color-text);
    text-align: left;

    @include mixins.respond-to(lg) {
      margin-bottom: 20px;
      text-align: center;
    }
  }

  &__title-short {
    @include mixins.respond-to(lg) {
      display: none;
    }
  }

  &__title-full {
    display: none;

    @include mixins.respond-to(lg) {
      display: inline;
    }
  }

  &__form {
    max-width: 720px;
    margin-inline: auto;
  }
}
</style>
