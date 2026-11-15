<template>
  <div class="account-reset">
    <p class="account-reset__lead">
      If you've forgotten your password, enter your e-mail address and we'll send you an e-mail
    </p>

    <form class="account-reset__form" @submit.prevent="onSubmit()">
      <UiBaseUnderlineField
        id="account-reset-email"
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
      />

      <UiBaseButton type="submit" variant="solid-black" class="account-reset__submit">
        Reset password
      </UiBaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ACCOUNT_MOCK_EMAIL } from '~/data/accountMock'

  const router = useRouter()
  const email = ref(ACCOUNT_MOCK_EMAIL)

  function onSubmit() {
    router.push('/account/reset-password/sent')
  }
</script>

<style scoped lang="scss">
  .account-reset {
    width: 100%;
    max-width: 440px;
    margin-inline: auto;
    text-align: center;

    &__lead {
      margin: 0 0 32px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--color-text-muted);

      @include mixins.respond-to(lg) {
        margin-bottom: 40px;
        font-size: 15px;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 28px;
      text-align: left;
    }

    &__submit {
      margin-top: 8px;
    }
  }
</style>
