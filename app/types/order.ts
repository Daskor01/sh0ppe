import type { CartLineView } from '~/composables/useCartSummary'

export type PaymentMethod = 'bank_transfer' | 'check' | 'cod' | 'paypal'

export type CheckoutBilling = {
  firstName: string
  lastName: string
  company: string
  country: string
  street: string
  postcode: string
  city: string
  phone: string
  email: string
  createAccount: boolean
  shipDifferent: boolean
  orderNotes: string
}

export type PlacedOrderLine = {
  productId: string
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export type PlacedOrder = {
  orderNumber: string
  email: string
  paymentMethod: PaymentMethod
  paymentLabel: string
  orderDate: string
  deliveryOption: string
  deliveryAddress: string
  contactNumber: string
  lines: PlacedOrderLine[]
  subtotal: number
  discount: number
  shipping: number
  total: number
}

export type PlaceOrderInput = {
  billing: CheckoutBilling
  paymentMethod: PaymentMethod
  lines: CartLineView[]
  subtotal: number
  discount: number
  shipping: number
  total: number
}
