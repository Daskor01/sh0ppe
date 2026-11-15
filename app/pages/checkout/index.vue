<template>
  <div class="checkout-page">
    <h1 class="checkout-page__title">Checkout</h1>

    <div v-if="hasCheckoutLines" class="checkout-page__layout">
      <div class="checkout-page__main">
        <CheckoutCouponPanel />
        <CheckoutBillingForm v-model="billing" />
      </div>

      <CheckoutOrderSummary
        v-model:payment-method="paymentMethod"
        :form-error="formError"
        :submitting="submitting"
        @submit="placeOrder()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CheckoutBillingForm from '~/components/checkout/CheckoutBillingForm.vue'
  import CheckoutCouponPanel from '~/components/checkout/CheckoutCouponPanel.vue'
  import CheckoutOrderSummary from '~/components/checkout/CheckoutOrderSummary.vue'
  import type { CheckoutBilling, PaymentMethod } from '~/types/order'
  import { createEmptyCheckoutBilling, validateCheckoutBilling } from '~/utils/checkoutValidation'

  definePageMeta({
    middleware: 'checkout-cart',
  })

  useSeoMeta({
    title: 'Checkout — SHOPPE',
  })

  const router = useRouter()
  const ordersStore = useOrdersStore()
  const { lines, subtotal, discount, shipping, total } = useCheckoutSummary()

  const hasCheckoutLines = computed(() => lines.value.length > 0)

  const billing = reactive<CheckoutBilling>(createEmptyCheckoutBilling())

  const paymentMethod = ref<PaymentMethod>('bank_transfer')
  const formError = ref('')
  const submitting = ref(false)

  function placeOrder() {
    formError.value = ''
    const validationError = validateCheckoutBilling(billing)
    if (validationError) {
      formError.value = validationError
      return
    }

    submitting.value = true
    try {
      const order = ordersStore.placeOrder({
        billing: { ...billing },
        paymentMethod: paymentMethod.value,
        lines: lines.value,
        subtotal: subtotal.value,
        discount: discount.value,
        shipping: shipping.value,
        total: total.value,
      })
      router.push(`/order/${order.orderNumber}`)
    } finally {
      submitting.value = false
    }
  }
</script>

<style scoped lang="scss">
  .checkout-page {
    @include mixins.container;
    padding-block: 24px 56px;

    @include mixins.respond-to(lg) {
      padding-block: 40px 72px;
    }

    &__title {
      margin: 0 0 28px;
      font-size: clamp(28px, 4vw, 40px);
      font-weight: 500;
      line-height: 1.2;
      text-align: center;
      color: var(--color-text);

      @include mixins.respond-to(lg) {
        margin-bottom: 40px;
      }
    }

    &__layout {
      display: grid;
      gap: 32px;
      align-items: start;

      @include mixins.respond-to(lg) {
        grid-template-columns: minmax(0, 1fr) minmax(300px, 400px);
        gap: 48px 56px;
      }
    }

    &__main {
      min-width: 0;
    }
  }
</style>
