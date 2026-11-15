<template>
  <div class="account-auth">
    <div class="account-auth__tabs" role="tablist" aria-label="Account">
      <button
        type="button"
        role="tab"
        class="account-auth__tab"
        :class="signInTabClass"
        :aria-selected="isSignInTab"
        @click="activeTab = 'sign-in'"
      >
        sign in
      </button>
      <button
        type="button"
        role="tab"
        class="account-auth__tab"
        :class="registerTabClass"
        :aria-selected="isRegisterTab"
        @click="activeTab = 'register'"
      >
        Register
      </button>
    </div>

    <form
      v-if="isSignInTab"
      class="account-auth__form"
      @submit.prevent="onSignIn()"
    >
      <BaseUnderlineField
        id="account-sign-in-email"
        v-model="signInEmail"
        label="Email"
        type="email"
        autocomplete="email"
        disabled
      />
      <BaseUnderlineField
        id="account-sign-in-password"
        v-model="signInPassword"
        label="Password"
        type="password"
        autocomplete="current-password"
        disabled
      />

      <label class="account-auth__remember">
        <input v-model="rememberMe" type="checkbox" class="account-auth__checkbox" />
        <span>Remember me</span>
      </label>

      <BaseButton type="submit" variant="solid-black" class="account-auth__submit">
        Sign in
      </BaseButton>

      <NuxtLink to="/account/reset-password" class="account-auth__forgot">
        Have you forgotten your password?
      </NuxtLink>
    </form>

    <form v-else class="account-auth__form" @submit.prevent="onRegister()">
      <BaseUnderlineField
        id="account-register-email"
        v-model="registerEmail"
        label="Email"
        type="email"
        autocomplete="email"
        disabled
      />
      <BaseUnderlineField
        id="account-register-password"
        v-model="registerPassword"
        label="Password"
        type="password"
        autocomplete="new-password"
        disabled
      />

      <BaseButton type="submit" variant="solid-black" class="account-auth__submit">
        Register
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ACCOUNT_MOCK_EMAIL, ACCOUNT_MOCK_PASSWORD } from '~/data/accountMock'

type AuthTab = 'sign-in' | 'register'

const activeTab = ref<AuthTab>('sign-in')
const session = useAccountSession()
const router = useRouter()

const signInEmail = ref(ACCOUNT_MOCK_EMAIL)
const signInPassword = ref(ACCOUNT_MOCK_PASSWORD)
const rememberMe = ref(true)

const registerEmail = ref(ACCOUNT_MOCK_EMAIL)
const registerPassword = ref(ACCOUNT_MOCK_PASSWORD)

const route = useRoute()

function authRedirectPath(): string {
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return '/account'
}

function onSignIn() {
  session.signIn()
  useToastStore().show({
    message: 'Welcome back! You are signed in (demo).',
  })
  router.push(authRedirectPath())
}

const isSignInTab = computed(() => activeTab.value === 'sign-in')
const isRegisterTab = computed(() => activeTab.value === 'register')

const signInTabClass = computed(() => ({
  'account-auth__tab--active': isSignInTab.value,
}))

const registerTabClass = computed(() => ({
  'account-auth__tab--active': isRegisterTab.value,
}))

function onRegister() {
  session.signIn()
  useToastStore().show({
    message: 'Account created (demo). You are now signed in.',
  })
  router.push(authRedirectPath())
}
</script>

<style scoped lang="scss">
.account-auth {
  width: 100%;
  max-width: 400px;
  margin-inline: auto;

  &__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin-bottom: 32px;
    padding: 4px;
    background: var(--color-surface-muted);
    border-radius: var(--radius-md);
  }

  &__tab {
    padding: 12px 16px;
    border: none;
    border-radius: calc(var(--radius-md) - 2px);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-muted);
    background: transparent;
    cursor: pointer;
    transition:
      color var(--transition-base),
      background var(--transition-base),
      box-shadow var(--transition-base);

    &--active {
      color: var(--color-text);
      background: var(--color-surface);
      box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__remember {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--color-text);
    cursor: pointer;
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: var(--color-text);
  }

  &__submit {
    margin-top: 4px;
  }

  &__forgot {
    align-self: center;
    font-size: 14px;
    color: var(--color-text-muted);
    text-align: center;
    text-decoration: none;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-accent);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }
}
</style>
