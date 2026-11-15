<template>
  <AccountShell>
    <div class="account-page account-page--sent">
      <h1 class="account-page__title account-page__title--sent">Check your email</h1>

      <div class="account-sent">
        <p class="account-sent__text">
          We sent a link to reset your password to
          <strong>{{ ACCOUNT_MOCK_EMAIL }}</strong>
          (demo — no email is actually sent).
        </p>

        <NuxtLink to="/account" class="account-sent__back">
          <UiBaseButton variant="solid-black">Back to sign in</UiBaseButton>
        </NuxtLink>
      </div>
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
import { ACCOUNT_MOCK_EMAIL } from '~/data/accountMock'

useSeoMeta({
  title: 'Reset link sent — SHOPPE',
  description: 'Password reset email sent (demo).',
})
</script>

<style scoped lang="scss">
.account-page {
  @include mixins.container;
  padding-block: 24px 56px;

  @include mixins.respond-to(lg) {
    padding-block: 56px 88px;
  }

  &--sent {
    width: 100%;
    max-width: 640px;
    margin-inline: auto;
  }

  &__title {
    margin: 0 0 24px;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-text);
    text-align: center;

    @include mixins.respond-to(lg) {
      margin-bottom: 28px;
      font-size: clamp(32px, 3vw, 40px);
    }

    &--sent {
      max-width: 520px;
      margin-inline: auto;
    }
  }
}

.account-sent {
  width: 100%;
  max-width: 440px;
  margin-inline: auto;
  text-align: center;

  &__text {
    margin: 0 0 32px;
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-text-muted);

    strong {
      font-weight: 500;
      color: var(--color-text);
    }
  }

  &__back {
    display: block;
    text-decoration: none;
  }
}
</style>
