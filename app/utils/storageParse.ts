import type { PaymentMethod, PlacedOrder } from '~/types/order'

const PAYMENT_METHODS: readonly PaymentMethod[] = [
  'bank_transfer',
  'check',
  'cod',
  'paypal',
] as const

export function parseStringArray(raw: unknown, maxLength = 50): string[] {
  if (!Array.isArray(raw)) {
    return []
  }
  return raw
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, maxLength)
}

function isPaymentMethod(value: unknown): value is PaymentMethod {
  return typeof value === 'string' && PAYMENT_METHODS.includes(value as PaymentMethod)
}

function isPlacedOrder(value: unknown): value is PlacedOrder {
  if (!value || typeof value !== 'object') {
    return false
  }
  const order = value as Record<string, unknown>
  return (
    typeof order.orderNumber === 'string' &&
    typeof order.email === 'string' &&
    isPaymentMethod(order.paymentMethod) &&
    typeof order.paymentLabel === 'string' &&
    typeof order.orderDate === 'string' &&
    typeof order.deliveryOption === 'string' &&
    typeof order.deliveryAddress === 'string' &&
    typeof order.contactNumber === 'string' &&
    typeof order.subtotal === 'number' &&
    typeof order.discount === 'number' &&
    typeof order.shipping === 'number' &&
    typeof order.total === 'number' &&
    Array.isArray(order.lines)
  )
}

export function parsePlacedOrdersRecord(raw: unknown): Record<string, PlacedOrder> {
  if (!raw || typeof raw !== 'object') {
    return {}
  }
  const entries = Object.entries(raw as Record<string, unknown>)
  const result: Record<string, PlacedOrder> = {}
  for (const [key, value] of entries) {
    if (typeof key !== 'string' || !isPlacedOrder(value)) {
      continue
    }
    result[key] = value
  }
  return result
}
