import type { CheckoutBilling } from '~/types/order'

export function createEmptyCheckoutBilling(): CheckoutBilling {
  return {
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    street: '',
    postcode: '',
    city: '',
    phone: '',
    email: '',
    createAccount: false,
    shipDifferent: false,
    orderNotes: '',
  }
}

export function validateCheckoutBilling(billing: CheckoutBilling): string | null {
  if (!billing.firstName.trim() || !billing.lastName.trim()) {
    return 'Please enter your first and last name.'
  }
  if (!billing.country.trim()) {
    return 'Please select a country.'
  }
  if (!billing.street.trim()) {
    return 'Please enter your street address.'
  }
  if (!billing.postcode.trim()) {
    return 'Please enter your postcode / ZIP.'
  }
  if (!billing.city.trim()) {
    return 'Please enter your town / city.'
  }
  if (!billing.phone.trim()) {
    return 'Please enter your phone number.'
  }
  if (!billing.email.trim()) {
    return 'Please enter your email.'
  }
  return null
}
