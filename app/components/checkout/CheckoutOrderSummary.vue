<template>
  <aside class="checkout-order" aria-labelledby="checkout-order-title">
    <h2 id="checkout-order-title" class="checkout-order__title">Your Order</h2>

    <ul class="checkout-order__lines">
      <li v-for="line in lines" :key="line.productId" class="checkout-order__line">
        <span>{{ line.product.name }}</span>
        <span>{{ formatPrice(line.product.price * line.quantity) }}</span>
      </li>
    </ul>

    <dl class="checkout-order__totals">
      <div class="checkout-order__total-row">
        <dt>Subtotal</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
      <div v-if="discount > 0" class="checkout-order__total-row">
        <dt>Discount</dt>
        <dd>-{{ formatPrice(discount) }}</dd>
      </div>
      <div class="checkout-order__total-row">
        <dt>Shipping</dt>
        <dd>{{ shippingLabel }}</dd>
      </div>
      <div class="checkout-order__total-row checkout-order__total-row--grand">
        <dt>Total</dt>
        <dd>{{ formatPrice(total) }}</dd>
      </div>
    </dl>

    <fieldset class="checkout-order__payments">
      <legend class="visually-hidden">Payment method</legend>

      <label
        v-for="option in paymentOptionsView"
        :key="option.value"
        class="checkout-order__payment"
      >
        <input v-model="paymentMethod" type="radio" name="payment-method" :value="option.value" />
        <span class="checkout-order__payment-label">{{ option.label }}</span>
        <span v-if="option.showHint" class="checkout-order__payment-hint">
          {{ option.hint }}
        </span>
      </label>
    </fieldset>

    <p v-if="formError" class="checkout-order__error" role="alert">
      {{ formError }}
    </p>

    <UiBaseButton
      variant="solid-black"
      class="checkout-order__submit"
      :disabled="submitDisabled"
      @click="onSubmit()"
    >
      Place order
    </UiBaseButton>
  </aside>
</template>

<script setup lang="ts">
  import type { PaymentMethod } from '~/types/order'

  const props = defineProps<{
    formError?: string
    submitting?: boolean
  }>()

  const paymentMethod = defineModel<PaymentMethod>('paymentMethod', { required: true })

  const emit = defineEmits<{
    submit: []
  }>()

  const { lines, subtotal, discount, total, formatPrice, shippingLabel } = useCheckoutSummary()

  type PaymentOptionConfig = {
    value: PaymentMethod
    label: string
    hint?: string
  }

  type PaymentOptionView = PaymentOptionConfig & {
    showHint: boolean
  }

  const paymentOptions: PaymentOptionConfig[] = [
    {
      value: 'bank_transfer',
      label: 'Direct bank transfer',
      hint: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference.',
    },
    { value: 'check', label: 'Check payments' },
    { value: 'cod', label: 'Cash on delivery' },
    { value: 'paypal', label: 'PayPal' },
  ]

  const paymentOptionsView = computed<PaymentOptionView[]>(() =>
    paymentOptions.map((option) => ({
      ...option,
      showHint: Boolean(option.hint && paymentMethod.value === option.value),
    })),
  )

  const submitDisabled = computed(() => props.submitting || lines.value.length === 0)

  function onSubmit() {
    emit('submit')
  }
</script>

<style scoped lang="scss">
  .checkout-order {
    padding: 24px 20px;
    background: var(--color-surface-muted);

    @include mixins.respond-to(lg) {
      padding: 28px 24px 32px;
      position: sticky;
      top: calc(var(--header-height-desktop) + 24px);
    }

    &__title {
      margin: 0 0 20px;
      font-size: 18px;
      font-weight: 500;
    }

    &__lines {
      margin: 0 0 20px;
      padding: 0 0 16px;
      list-style: none;
      border-bottom: 1px solid var(--color-border);
    }

    &__line {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--color-text);
    }

    &__totals {
      margin: 0 0 24px;
    }

    &__total-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.04em;

      dt {
        margin: 0;
        font-weight: 500;
      }

      dd {
        margin: 0;
        text-transform: none;
        letter-spacing: normal;
      }

      &--grand {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--color-border);
        font-size: 16px;

        dd {
          font-weight: 600;
        }
      }
    }

    &__payments {
      margin: 0 0 24px;
      padding: 0;
      border: none;
    }

    &__payment {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px 12px;
      align-items: start;
      margin-bottom: 14px;
      font-size: 14px;
      cursor: pointer;

      input {
        margin-top: 3px;
        accent-color: var(--color-text);
      }
    }

    &__payment-label {
      font-weight: 500;
      color: var(--color-text);
    }

    &__payment-hint {
      grid-column: 2;
      font-size: 13px;
      line-height: 1.5;
      color: var(--color-text-muted);
    }

    &__error {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--color-error);
    }

    &__submit {
      margin-top: 4px;
    }
  }

  .visually-hidden {
    @include mixins.visually-hidden;
  }
</style>
