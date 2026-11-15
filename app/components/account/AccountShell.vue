<template>
  <div v-if="isPasswordFlow" class="account-shell account-shell--auth-flow">
    <slot />
  </div>
  <div v-else class="account-page account-shell">
    <h1 class="account-page__title">My account</h1>
    <AccountAuthPanel v-if="!isSignedIn" />
    <template v-else>
      <AccountNav />
      <div class="account-page__content">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  const { isSignedIn } = useAccountSession()

  const isPasswordFlow = computed(() => route.path.startsWith('/account/reset-password'))
</script>

<style scoped lang="scss">
  .account-shell--auth-flow {
    width: 100%;
  }

  .account-page {
    @include mixins.container;
    padding-block: 24px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 56px 88px;
    }

    &__title {
      margin: 0 0 28px;
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 500;
      line-height: 1.2;
      color: var(--color-text);
      text-align: center;

      @include mixins.respond-to(lg) {
        margin-bottom: 40px;
      }
    }

    &__content {
      width: 100%;
    }
  }
</style>
