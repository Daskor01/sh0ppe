<template>
  <section class="account-address-form" :aria-labelledby="`${formId}-title`">
    <h2 :id="`${formId}-title`" class="account-address-form__title">{{ title }}</h2>

    <form class="account-address-form__body" @submit.prevent>
      <div class="account-address-form__grid">
        <UiBaseUnderlineField
          :id="`${formId}-first-name`"
          v-model="billing.firstName"
          label="First name *"
          autocomplete="given-name"
          :disabled="ACCOUNT_PROFILE_READONLY"
        />
        <UiBaseUnderlineField
          :id="`${formId}-last-name`"
          v-model="billing.lastName"
          label="Last name *"
          autocomplete="family-name"
          :disabled="ACCOUNT_PROFILE_READONLY"
        />
      </div>

      <UiBaseUnderlineField
        :id="`${formId}-company`"
        v-model="billing.company"
        label="Company Name"
        autocomplete="organization"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <div class="account-address-form__field account-address-form__country">
        <span class="account-address-form__country-label">Country *</span>
        <UiBaseSelect
          v-model="billing.country"
          variant="underline"
          :options="countryOptions"
          aria-label="Country"
          :disabled="ACCOUNT_PROFILE_READONLY"
        />
      </div>

      <UiBaseUnderlineField
        :id="`${formId}-street`"
        v-model="billing.street"
        label="Street Address *"
        autocomplete="street-address"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <UiBaseUnderlineField
        :id="`${formId}-postcode`"
        v-model="billing.postcode"
        label="Postcode / ZIP *"
        autocomplete="postal-code"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <UiBaseUnderlineField
        :id="`${formId}-city`"
        v-model="billing.city"
        label="Town / City *"
        autocomplete="address-level2"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <UiBaseUnderlineField
        :id="`${formId}-phone`"
        v-model="billing.phone"
        label="Phone *"
        autocomplete="tel"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <UiBaseUnderlineField
        :id="`${formId}-email`"
        v-model="billing.email"
        label="Email *"
        type="email"
        autocomplete="email"
        class="account-address-form__field"
        :disabled="ACCOUNT_PROFILE_READONLY"
      />

      <UiBaseButton
        v-if="!ACCOUNT_PROFILE_READONLY"
        type="submit"
        variant="solid-black"
        class="account-address-form__submit"
        @click="emit('save')"
      >
        Save Address
      </UiBaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ACCOUNT_PROFILE_READONLY } from '~/data/accountMock'
import type { CheckoutBilling } from '~/types/order'
import type { BaseSelectOption } from '~/types/ui'

const billing = defineModel<CheckoutBilling>({ required: true })

defineProps<{
  formId: string
  title: string
}>()

const emit = defineEmits<{
  save: []
}>()

const countryOptions: BaseSelectOption<string>[] = [
  { value: '', label: 'Country *' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
]

</script>

<style scoped lang="scss">
.account-address-form {
  &__title {
    margin: 0 0 24px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text);
  }

  &__body {
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

  &__country {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__country-label {
    font-size: 14px;
    color: var(--color-text-muted);
  }

  &__submit {
    margin-top: 8px;
    max-width: 280px;
  }
}
</style>
