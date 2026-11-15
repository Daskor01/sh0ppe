import { defineStore } from 'pinia'
import { getAccountMockOrder } from '~/data/accountMock'
import type {
  PaymentMethod,
  PlaceOrderInput,
  PlacedOrder,
} from '~/types/order'
import { assertNever } from '~/utils/assertNever'
import { parsePlacedOrdersRecord } from '~/utils/storageParse'

const STORAGE_KEY = 'shoppe-placed-orders'

function readStorage(): Record<string, PlacedOrder> {
  if (!import.meta.client) {
    return {}
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {}
    }
    return parsePlacedOrdersRecord(JSON.parse(raw) as unknown)
  } catch {
    return {}
  }
}

function writeStorage(orders: Record<string, PlacedOrder>) {
  if (!import.meta.client) {
    return
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function generateOrderNumber(): string {
  const part = Math.floor(1000000000000 + Math.random() * 8999999999999)
  return String(part)
}

function getPaymentLabel(method: PaymentMethod): string {
  switch (method) {
    case 'bank_transfer':
      return 'Direct bank transfer'
    case 'check':
      return 'Check payments'
    case 'cod':
      return 'Cash on delivery'
    case 'paypal':
      return 'PayPal'
    default:
      return assertNever(method)
  }
}

function formatDeliveryAddress(input: PlaceOrderInput['billing']): string {
  const parts = [
    input.street,
    input.city,
    input.postcode,
    input.country,
  ].filter(Boolean)
  return parts.join(', ')
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Record<string, PlacedOrder>>({})

  function hydrateFromStorage() {
    orders.value = readStorage()
  }

  function getOrder(orderNumber: string): PlacedOrder | undefined {
    return orders.value[orderNumber] ?? getAccountMockOrder(orderNumber)
  }

  function placeOrder(input: PlaceOrderInput): PlacedOrder {
    const orderNumber = generateOrderNumber()
    const order: PlacedOrder = {
      orderNumber,
      email: input.billing.email,
      paymentMethod: input.paymentMethod,
      paymentLabel: getPaymentLabel(input.paymentMethod),
      orderDate: new Date().toISOString(),
      deliveryOption: 'Standard delivery',
      deliveryAddress: formatDeliveryAddress(input.billing),
      contactNumber: input.billing.phone,
      lines: input.lines.map((line) => ({
        productId: line.productId,
        name: line.product.name,
        quantity: line.quantity,
        unitPrice: line.product.price,
        lineTotal: line.product.price * line.quantity,
      })),
      subtotal: input.subtotal,
      discount: input.discount,
      shipping: input.shipping,
      total: input.total,
    }

    orders.value = {
      ...orders.value,
      [orderNumber]: order,
    }
    writeStorage(orders.value)

    useCartStore().clear()

    return order
  }

  if (import.meta.client) {
    hydrateFromStorage()
  }

  return {
    orders,
    getOrder,
    placeOrder,
    hydrateFromStorage,
  }
})
