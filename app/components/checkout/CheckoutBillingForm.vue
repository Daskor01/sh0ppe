<template>
  <section class="checkout-billing" aria-labelledby="checkout-billing-title">
    <h2 id="checkout-billing-title" class="checkout-billing__title">Billing Details</h2>

    <div class="checkout-billing__source" role="tablist" aria-label="Billing data source">
      <button
        type="button"
        role="tab"
        class="checkout-billing__source-tab"
        :class="accountSourceTabClass"
        :aria-selected="isAccountSource"
        @click="selectBillingSource('account')"
      >
        Use account details
      </button>
      <button
        type="button"
        role="tab"
        class="checkout-billing__source-tab"
        :class="otherSourceTabClass"
        :aria-selected="isOtherSource"
        @click="selectBillingSource('other')"
      >
        Use different details
      </button>
    </div>

    <div class="checkout-billing__grid">
      <UiBaseUnderlineField
        id="checkout-first-name"
        v-model="billing.firstName"
        label="First name *"
        autocomplete="given-name"
        :disabled="fieldsLocked"
      />
      <UiBaseUnderlineField
        id="checkout-last-name"
        v-model="billing.lastName"
        label="Last name *"
        autocomplete="family-name"
        :disabled="fieldsLocked"
      />
    </div>

    <UiBaseUnderlineField
      id="checkout-company"
      v-model="billing.company"
      label="Company Name"
      autocomplete="organization"
      class="checkout-billing__field"
      :disabled="fieldsLocked"
    />

    <div class="checkout-billing__field checkout-billing__country">
      <span class="checkout-billing__country-label">Country *</span>
      <UiBaseSelect
        v-model="billing.country"
        variant="underline"
        :options="countryOptions"
        aria-label="Country"
        :disabled="fieldsLocked"
      />
    </div>

    <UiBaseUnderlineField
      id="checkout-street"
      v-model="billing.street"
      label="Street Address *"
      autocomplete="street-address"
      class="checkout-billing__field"
      :disabled="fieldsLocked"
    />

    <div class="checkout-billing__grid">
      <UiBaseUnderlineField
        id="checkout-postcode"
        v-model="billing.postcode"
        label="Postcode / ZIP *"
        autocomplete="postal-code"
        :disabled="fieldsLocked"
      />
      <UiBaseUnderlineField
        id="checkout-city"
        v-model="billing.city"
        label="Town / City *"
        autocomplete="address-level2"
        :disabled="fieldsLocked"
      />
    </div>

    <div class="checkout-billing__grid">
      <UiBaseUnderlineField
        id="checkout-phone"
        v-model="billing.phone"
        label="Phone *"
        type="tel"
        autocomplete="tel"
        :disabled="fieldsLocked"
      />
      <UiBaseUnderlineField
        id="checkout-email"
        v-model="billing.email"
        label="Email *"
        type="email"
        autocomplete="email"
        :disabled="fieldsLocked"
      />
    </div>

    <label class="checkout-billing__checkbox">
      <input v-model="billing.createAccount" type="checkbox" :disabled="fieldsLocked" />
      <span>Create an account?</span>
    </label>

    <label class="checkout-billing__checkbox">
      <input v-model="billing.shipDifferent" type="checkbox" :disabled="fieldsLocked" />
      <span>Ship to a different address?</span>
    </label>

    <UiBaseUnderlineField
      id="checkout-notes"
      v-model="billing.orderNotes"
      label="Order notes"
      multiline
      :rows="4"
      class="checkout-billing__field checkout-billing__notes"
      :disabled="fieldsLocked"
    />
  </section>
</template>

<script setup lang="ts">
import { createDefaultBillingAddress } from '~/data/accountMock'
import type { CheckoutBilling } from '~/types/order'
import type { BaseSelectOption } from '~/types/ui'
import { accountSignInRoute } from '~/utils/accountRedirect'
import { createEmptyCheckoutBilling } from '~/utils/checkoutValidation'

type BillingSource = 'account' | 'other'

const billing = defineModel<CheckoutBilling>({ required: true })

const router = useRouter()
const { isSignedIn } = useAccountSession()

const billingSource = ref<BillingSource>('other')

const fieldsLocked = computed(() => billingSource.value === 'account' && isSignedIn.value)

const countryOptions: BaseSelectOption<string>[] = [
  { value: '', label: 'Country *' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
]

function applyAccountBilling() {
  Object.assign(billing.value, createDefaultBillingAddress())
}

function applyEmptyBilling() {
  Object.assign(billing.value, createEmptyCheckoutBilling())
}

function selectBillingSource(source: BillingSource) {
  if (source === 'account' && !isSignedIn.value) {
    router.push(accountSignInRoute('/checkout'))
    return
  }

  billingSource.value = source

  if (source === 'account') {
    applyAccountBilling()
  } else {
    applyEmptyBilling()
  }
}

watch(isSignedIn, (signed) => {
  if (signed && billingSource.value === 'account') {
    applyAccountBilling()
  }
})

onMounted(() => {
  if (isSignedIn.value) {
    billingSource.value = 'account'
    applyAccountBilling()
  }
})

const isAccountSource = computed(() => billingSource.value === 'account')
const isOtherSource = computed(() => billingSource.value === 'other')

const accountSourceTabClass = computed(() => ({
  'checkout-billing__source-tab--active': isAccountSource.value,
}))

const otherSourceTabClass = computed(() => ({
  'checkout-billing__source-tab--active': isOtherSource.value,
}))
</script>

<style scoped lang="scss">
.checkout-billing {
  &__title {
    margin: 0 0 24px;
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__source {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin-bottom: 28px;
    padding: 4px;
    background: var(--color-surface-muted);
    border-radius: var(--radius-md);
  }

  &__source-tab {
    padding: 12px 10px;
    border: none;
    border-radius: calc(var(--radius-md) - 2px);
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text-muted);
    background: transparent;
    cursor: pointer;
    transition:
      color var(--transition-base),
      background var(--transition-base),
      box-shadow var(--transition-base);

    @include mixins.respond-to(md) {
      font-size: 14px;
      padding-inline: 16px;
    }

    &--active {
      color: var(--color-text);
      background: var(--color-surface);
      box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__grid {
    display: grid;
    gap: 24px;
    margin-bottom: 24px;

    @include mixins.respond-to(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px 32px;
    }
  }

  &__field {
    margin-bottom: 24px;
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

  &__checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.4;
    color: var(--color-text);
    cursor: pointer;

    input {
      margin-top: 3px;
      accent-color: var(--color-accent);

      &:disabled {
        cursor: not-allowed;
      }
    }

    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.72;
    }
  }

  &__notes {
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>
