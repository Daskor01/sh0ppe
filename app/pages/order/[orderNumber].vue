<template>
  <div v-if="order" class="order-page">
    <OrderSuccessBanner />

    <div class="order-page__content">
      <OrderDetailsPanel :order="order" class="order-page__details" />
      <OrderSummaryPanel :order="order" class="order-page__summary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderDetailsPanel from '~/components/order/OrderDetailsPanel.vue'
import OrderSuccessBanner from '~/components/order/OrderSuccessBanner.vue'
import OrderSummaryPanel from '~/components/order/OrderSummaryPanel.vue'

const route = useRoute()
const ordersStore = useOrdersStore()

const orderNumber = computed(() => String(route.params.orderNumber))

onMounted(() => {
  ordersStore.hydrateFromStorage()
})

const order = computed(() => ordersStore.getOrder(orderNumber.value))

watchEffect(() => {
  if (!import.meta.client) {
    return
  }
  if (!order.value) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found', fatal: true })
  }
})

const { formatPrice } = useFormatPrice()

const orderItemCount = computed(
  () => order.value?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0,
)

const seoTitle = computed(() => {
  const id = order.value?.orderNumber ?? orderNumber.value
  return `Order ${id} — SHOPPE`
})

const seoDescription = computed(() => {
  const id = order.value?.orderNumber ?? orderNumber.value
  if (!order.value) {
    return `View your SHOPPE jewelry order ${id} confirmation and summary.`
  }

  const count = orderItemCount.value
  const itemsPhrase = count === 1 ? '1 item' : `${count} items`

  return `Order ${id} confirmed: ${itemsPhrase}, total ${formatPrice(order.value.total)}. Paid via ${order.value.paymentLabel}.`
})

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogType: 'website',
  twitterCard: 'summary',
  robots: 'noindex, nofollow',
})
</script>

<style scoped lang="scss">
.order-page {
  padding-bottom: 56px;

  @include mixins.respond-to(lg) {
    padding-bottom: 72px;
  }

  &__content {
    @include mixins.container;
    display: grid;
    gap: 24px;
    padding-block: 28px 0;

    @include mixins.respond-to(lg) {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 400px);
      gap: 48px 56px;
      align-items: start;
      padding-block: 48px 0;
    }
  }

  &__details {
    @include mixins.respond-to(lg) {
      padding-top: 8px;
    }
  }

  &__summary {
    min-width: 0;
  }
}
</style>
