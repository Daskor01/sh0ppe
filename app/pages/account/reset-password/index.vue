<template>
  <AccountShell>
    <div class="account-page account-page--reset">
      <h1 class="account-page__title account-page__title--reset">
        Have you Forgotten Your Password?
      </h1>
      <AccountResetForm />
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Reset password — SHOPPE',
    description: 'Request a password reset email (demo).',
  })
</script>

<style scoped lang="scss">
  .account-page {
    @include mixins.container;
    padding-block: 24px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 56px 88px;
    }

    &--reset {
      width: 100%;
      max-width: 640px;
      margin-inline: auto;
    }

    &__title {
      margin: 0 0 16px;
      font-size: clamp(26px, 4vw, 36px);
      font-weight: 500;
      line-height: 1.25;
      color: var(--color-text);
      text-align: center;

      @include mixins.respond-to(lg) {
        margin-bottom: 20px;
        font-size: clamp(32px, 3vw, 40px);
      }

      &--reset {
        max-width: 520px;
        margin-inline: auto;
      }
    }
  }
</style>
