import type { CheckoutBilling, PlacedOrder } from '~/types/order'

// мок-данные аккаунта
export const ACCOUNT_PROFILE_READONLY = true

export const ACCOUNT_MOCK_EMAIL = 'demo@shoppe.com'
export const ACCOUNT_MOCK_PASSWORD = 'ShoppeDemo1'
export const ACCOUNT_MOCK_DISPLAY_NAME = 'Evgenii Kurchenko'
export const ACCOUNT_MOCK_FIRST_NAME = 'Evgenii'
export const ACCOUNT_MOCK_LAST_NAME = 'Kurchenko'

export type AccountOrderStatus = 'Delivered' | 'Processing'

export type AccountOrderRow = {
  orderNumber: string
  dateLabel: string
  status: AccountOrderStatus
  total: number
}

export const ACCOUNT_MOCK_ORDER_ROWS: AccountOrderRow[] = [
  {
    orderNumber: '7643980998990',
    dateLabel: 'October 8, 2021',
    status: 'Delivered',
    total: 105,
  },
  {
    orderNumber: '943980998990',
    dateLabel: 'October 8, 2021',
    status: 'Processing',
    total: 100,
  },
  {
    orderNumber: '879980998990',
    dateLabel: 'October 8, 2020',
    status: 'Delivered',
    total: 65,
  },
]

const mockOrderDateIso: Record<string, string> = {
  '7643980998990': '2021-10-08T12:00:00.000Z',
  '943980998990': '2021-10-08T10:00:00.000Z',
  '879980998990': '2020-10-08T09:00:00.000Z',
}

function buildMockPlacedOrder(row: AccountOrderRow): PlacedOrder {
  const subtotal = row.total
  return {
    orderNumber: row.orderNumber,
    email: ACCOUNT_MOCK_EMAIL,
    paymentMethod: 'bank_transfer',
    paymentLabel: 'Direct bank transfer',
    orderDate: mockOrderDateIso[row.orderNumber] ?? '2021-10-08T12:00:00.000Z',
    deliveryOption: 'Standard delivery',
    deliveryAddress: '123 Demo Street, London, SW1A 1AA, United Kingdom',
    contactNumber: '+44 20 7946 0958',
    lines: [
      {
        productId: 'demo-line',
        name: 'Demo jewelry item',
        quantity: 1,
        unitPrice: subtotal,
        lineTotal: subtotal,
      },
    ],
    subtotal,
    discount: 0,
    shipping: 0,
    total: row.total,
  }
}

const mockOrdersMap = Object.fromEntries(
  ACCOUNT_MOCK_ORDER_ROWS.map((row) => [row.orderNumber, buildMockPlacedOrder(row)]),
) as Record<string, PlacedOrder>

export function getAccountMockOrder(orderNumber: string): PlacedOrder | undefined {
  return mockOrdersMap[orderNumber]
}

export function createDefaultBillingAddress(): CheckoutBilling {
  return {
    firstName: ACCOUNT_MOCK_FIRST_NAME,
    lastName: ACCOUNT_MOCK_LAST_NAME,
    company: '',
    country: 'GB',
    street: '123 Demo Street',
    postcode: 'SW1A 1AA',
    city: 'London',
    phone: '+44 20 7946 0958',
    email: ACCOUNT_MOCK_EMAIL,
    createAccount: false,
    shipDifferent: false,
    orderNotes: '',
  }
}
