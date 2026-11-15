<template>
  <footer class="site-footer" :class="{ 'site-footer--account': hideFooterTop }">
    <div v-if="!hideFooterTop" class="site-footer__top">
      <div class="site-footer__inner site-footer__inner--top">
        <nav class="site-footer__links" aria-label="Footer links">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="site-footer__link"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <UiNewsletterForm
          class="site-footer__newsletter site-footer__newsletter--desktop"
        />
      </div>

      <UiNewsletterForm class="site-footer__newsletter site-footer__newsletter--mobile" />
    </div>

    <div class="site-footer__bottom">
      <div class="site-footer__inner site-footer__inner--bottom">
        <p class="site-footer__copy">© 2021 Shelly. Terms of use and privacy policy.</p>

        <div class="site-footer__social-block">
          <p class="site-footer__follow">Follow us</p>
          <div class="site-footer__social" role="list">
            <a
              v-for="item in socialLinks"
              :key="item.label"
              :href="item.href"
              class="site-footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="item.label"
            >
              <IconsSocialIcons :name="item.icon" />
            </a>
          </div>
        </div>

        <div class="site-footer__social site-footer__social--desktop" role="list">
          <a
            v-for="item in socialLinks"
            :key="`${item.label}-d`"
            :href="item.href"
            class="site-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.label"
          >
            <IconsSocialIcons :name="item.icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()

const hideFooterTop = computed(() => route.path.startsWith('/account'))

const footerLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Terms of services', to: '/terms' },
  { label: 'Shipping and returns', to: '/shipping' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' as const },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' as const },
]
</script>

<style scoped lang="scss">
.site-footer {
  margin-top: 48px;
  padding-bottom: 32px;

  @include mixins.respond-to(lg) {
    margin-top: 80px;
  }

  &--account {
    margin-top: 48px;

    @include mixins.respond-to(lg) {
      margin-top: 64px;
    }
  }

  &__top {
    border-top: 1px solid var(--color-border);
    padding-top: 32px;

    @include mixins.respond-to(lg) {
      padding-top: 40px;
    }
  }

  &__inner {
    @include mixins.container;

    &--top {
      display: flex;
      flex-direction: column;
      gap: 32px;

      @include mixins.respond-to(lg) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 48px;
      }
    }

    &--bottom {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid var(--color-border);

      @include mixins.respond-to(lg) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 40px;
      }
    }
  }

  &--account &__inner--bottom {
    margin-top: 0;
    padding-top: 32px;

    @include mixins.respond-to(lg) {
      margin-top: 0;
      padding-top: 40px;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @include mixins.respond-to(lg) {
      flex-direction: row;
      gap: 40px;
    }
  }

  &__link {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-text-muted);
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-text);
    }
  }

  &__newsletter--mobile {
    @include mixins.container;
    margin-top: 32px;

    @include mixins.respond-to(lg) {
      display: none;
    }
  }

  &__newsletter--desktop {
    display: none;

    @include mixins.respond-to(lg) {
      display: block;
    }
  }

  &__copy {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-muted);
    order: 2;

    @include mixins.respond-to(lg) {
      order: 0;
    }
  }

  &__social-block {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include mixins.respond-to(lg) {
      display: none;
    }
  }

  &__follow {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 16px;

    &--desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: flex;
      }
    }
  }

  &__social-link {
    display: inline-flex;
    color: var(--color-text);
    opacity: 0.85;
    transition: opacity var(--transition-base);

    :deep(svg) {
      width: 24px;
      height: 24px;

      @include mixins.respond-to(lg) {
        width: 26px;
        height: 26px;
      }
    }

    &:hover {
      opacity: 1;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>
