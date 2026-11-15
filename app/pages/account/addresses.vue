<template>
  <AccountShell>
    <div class="account-addresses">
      <p class="account-addresses__lead">
        The following addresses will be used on the checkout page by default.
      </p>

      <div class="account-addresses__grid">
        <AccountAddressForm
          v-model="billing"
          form-id="account-billing"
          title="Billing address"
          @save="onSaveBilling()"
        />
        <AccountAddressEmpty title="Shipping address" @add="onAddShipping()" />
      </div>
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
import { createDefaultBillingAddress } from '~/data/accountMock'
import type { CheckoutBilling } from '~/types/order'

definePageMeta({
  middleware: 'account-protected',
})

const billing = ref<CheckoutBilling>(createDefaultBillingAddress())

function onSaveBilling() {
  useToastStore().show({ message: 'Billing address saved (demo).' })
}

function onAddShipping() {
  useToastStore().show({ message: 'Shipping address form (demo).' })
}
</script>

<style scoped lang="scss">
.account-addresses {
  &__lead {
    margin: 0 0 28px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);

    @include mixins.respond-to(lg) {
      margin-bottom: 36px;
    }
  }

  &__grid {
    display: grid;
    gap: 40px;

    @include mixins.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: start;
    }
  }
}
</style>
