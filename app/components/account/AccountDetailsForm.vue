<template>
  <section class="account-details" aria-labelledby="account-details-title">
    <h2 id="account-details-title" class="account-details__title">Account details</h2>

    <p v-if="ACCOUNT_PROFILE_READONLY" class="account-details__demo-note">
      Demo profile — fields are read-only.
    </p>

    <form class="account-details__form" @submit.prevent>
      <div class="account-details__grid">
        <UiBaseUnderlineField
          id="account-details-first-name"
          v-model="firstName"
          label="First name *"
          autocomplete="given-name"
          :disabled="ACCOUNT_PROFILE_READONLY"
        />
        <UiBaseUnderlineField
          id="account-details-last-name"
          v-model="lastName"
          label="Last name *"
          autocomplete="family-name"
          :disabled="ACCOUNT_PROFILE_READONLY"
        />
      </div>

      <UiBaseUnderlineField
        id="account-details-display-name"
        v-model="displayName"
        label="Display name *"
        autocomplete="nickname"
        class="account-details__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />
      <p class="account-details__hint">
        This will be how your name will be displayed in the account section and in reviews.
      </p>

      <UiBaseUnderlineField
        id="account-details-email"
        v-model="email"
        label="Email address *"
        type="email"
        autocomplete="email"
        class="account-details__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <template v-if="!ACCOUNT_PROFILE_READONLY">
        <h3 class="account-details__subtitle">Password change</h3>

        <UiBaseUnderlineField
          id="account-details-current-password"
          v-model="currentPassword"
          label="Current password (leave blank to leave unchanged)"
          type="password"
          autocomplete="current-password"
          class="account-details__field"
        />
        <UiBaseUnderlineField
          id="account-details-new-password"
          v-model="newPassword"
          label="New password (leave blank to leave unchanged)"
          type="password"
          autocomplete="new-password"
          class="account-details__field"
        />
        <UiBaseUnderlineField
          id="account-details-confirm-password"
          v-model="confirmPassword"
          label="Confirm new password"
          type="password"
          autocomplete="new-password"
          class="account-details__field"
        />

        <UiBaseButton type="submit" variant="solid-black" class="account-details__submit">
          Save Changes
        </UiBaseButton>
      </template>
    </form>
  </section>
</template>

<script setup lang="ts">
  import {
    ACCOUNT_MOCK_DISPLAY_NAME,
    ACCOUNT_MOCK_EMAIL,
    ACCOUNT_MOCK_FIRST_NAME,
    ACCOUNT_MOCK_LAST_NAME,
    ACCOUNT_PROFILE_READONLY,
  } from '~/data/accountMock'

  const firstName = ref(ACCOUNT_MOCK_FIRST_NAME)
  const lastName = ref(ACCOUNT_MOCK_LAST_NAME)
  const displayName = ref(ACCOUNT_MOCK_DISPLAY_NAME)
  const email = ref(ACCOUNT_MOCK_EMAIL)
  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
</script>

<style scoped lang="scss">
  .account-details {
    max-width: 560px;

    &__demo-note {
      margin: -12px 0 24px;
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-muted);
    }

    &__title {
      margin: 0 0 28px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.3;
      color: var(--color-text);

      @include mixins.respond-to(lg) {
        font-size: 20px;
        margin-bottom: 32px;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__grid {
      display: grid;
      gap: 24px;

      @include mixins.respond-to(md) {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__field {
      width: 100%;
    }

    &__hint {
      margin: -12px 0 0;
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-muted);
    }

    &__subtitle {
      margin: 8px 0 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--color-text);
    }

    &__submit {
      margin-top: 8px;
    }
  }
</style>
