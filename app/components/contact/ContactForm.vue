<template>
  <form class="contact-form" @submit.prevent="submit()">
    <p class="contact-form__intro">
      Say Hello send us your thoughts about our products or share your ideas with our Team!
    </p>

    <div class="contact-form__row contact-form__row--split">
      <BaseUnderlineField
        id="contact-first-name"
        v-model="firstName"
        label="First name"
        autocomplete="given-name"
        clearable
      />
      <BaseUnderlineField
        id="contact-last-name"
        v-model="lastName"
        label="Last name"
        autocomplete="family-name"
      />
    </div>

    <div class="contact-form__row contact-form__row--split">
      <BaseUnderlineField
        id="contact-email"
        v-model="email"
        label="Email"
        type="email"
        autocomplete="email"
      />

      <div class="contact-form__subject">
        <span id="contact-subject-label" class="contact-form__subject-label">Subject</span>
        <BaseSelect
          v-model="subject"
          variant="underline"
          :options="subjectOptions"
          aria-label="Subject"
        />
      </div>
    </div>

    <BaseUnderlineField
      id="contact-message"
      v-model="message"
      label="Message"
      multiline
      :rows="6"
      class="contact-form__message"
    />

    <p v-if="formError" class="contact-form__error" role="alert">
      {{ formError }}
    </p>

    <BaseButton type="submit" variant="solid-black" class="contact-form__submit">
      Send
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { BaseSelectOption } from '~/types/ui'

type ContactSubject = '' | 'orders' | 'products' | 'shipping' | 'other'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const subject = ref<ContactSubject>('')
const message = ref('')
const formError = ref('')

const subjectOptions: BaseSelectOption<ContactSubject>[] = [
  { value: '', label: 'Subject' },
  { value: 'orders', label: 'Orders' },
  { value: 'products', label: 'Products' },
  { value: 'shipping', label: 'Shipping & returns' },
  { value: 'other', label: 'Other' },
]

function resetForm() {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}

function submit() {
  formError.value = ''

  if (!firstName.value.trim() || !lastName.value.trim()) {
    formError.value = 'Please enter your first and last name.'
    return
  }

  if (!email.value.trim()) {
    formError.value = 'Please enter your email.'
    return
  }

  if (!subject.value) {
    formError.value = 'Please choose a subject.'
    return
  }

  if (!message.value.trim()) {
    formError.value = 'Please enter a message.'
    return
  }

  useToastStore().show({
    message: 'Thank you! Your message has been sent.',
  })
  resetForm()
}
</script>

<style scoped lang="scss">
.contact-form {
  width: 100%;

  &__intro {
    display: none;
    margin: 0 0 32px;
    max-width: 520px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-muted);

    @include mixins.respond-to(lg) {
      display: block;
      margin-inline: auto;
      margin-bottom: 40px;
      text-align: center;
    }
  }

  &__row {
    margin-bottom: 28px;

    &--split {
      display: grid;
      gap: 28px;

      @include mixins.respond-to(lg) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 32px 40px;
      }
    }
  }

  &__subject {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  &__subject-label {
    font-size: 14px;
    line-height: 1.3;
    color: var(--color-text-muted);
  }

  &__message {
    margin-bottom: 32px;
  }

  &__error {
    margin: 0 0 16px;
    font-size: 14px;
    color: var(--color-error);
    text-align: center;
  }

  &__submit {
    max-width: 100%;

    @include mixins.respond-to(lg) {
      max-width: 360px;
      margin-inline: auto;
    }
  }
}
</style>
