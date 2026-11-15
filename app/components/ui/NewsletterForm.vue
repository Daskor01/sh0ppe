<template>
  <form class="newsletter" @submit.prevent="submit">
    <div class="newsletter__row">
      <label class="visually-hidden" for="newsletter-email">Email для рассылки</label>
      <input
        id="newsletter-email"
        v-model="email"
        class="newsletter__input"
        type="email"
        name="email"
        placeholder="Give an email, get the newsletter."
        autocomplete="email"
      />
      <button class="newsletter__submit" type="submit" aria-label="Subscribe">
        <ArrowRight :size="20" aria-hidden="true" />
      </button>
    </div>

    <label class="newsletter__checkbox">
      <input v-model="agreed" type="checkbox" />
      <span>I agree to the website's terms and conditions</span>
    </label>

    <p v-if="errorMessage" class="newsletter__error" role="alert">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue'

  const email = ref('')
  const agreed = ref(false)
  const errorMessage = ref('')

  function submit() {
    errorMessage.value = ''
    if (!email.value.trim()) {
      errorMessage.value = 'Введите email'
      return
    }
    if (!agreed.value) {
      errorMessage.value = 'Подтвердите согласие с условиями'
      return
    }
    email.value = ''
    agreed.value = false
  }
</script>

<style scoped lang="scss">
  .newsletter {
    width: 100%;
    max-width: 420px;

    @include mixins.respond-to(lg) {
      max-width: 360px;
      margin-left: auto;
    }

    &__row {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 8px;
    }

    &__input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      font-family: var(--font-sans);
      @include mixins.field-text-size;
      color: var(--color-text);
      padding: 4px 0;

      &::placeholder {
        color: var(--color-text-muted);
      }

      &:focus {
        outline: none;
      }
    }

    &__submit {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__checkbox {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 16px;
      font-size: 12px;
      line-height: 1.4;
      color: var(--color-text-muted);
      cursor: pointer;

      input {
        margin-top: 2px;
        accent-color: var(--color-accent);
      }
    }

    &__error {
      margin: 8px 0 0;
      font-size: 12px;
      color: var(--color-error);
    }
  }

  .visually-hidden {
    @include mixins.visually-hidden;
  }
</style>
