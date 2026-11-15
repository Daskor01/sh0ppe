import { defineStore } from 'pinia'
import type { CartLine } from '~/types/cart'
import type { Product } from '~/types/product'

export const SHOP_COUPON_CODE = 'SHOPPE10'

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([])
  const couponInput = ref('')
  const couponApplied = ref(false)
  const couponMessage = ref('')

  const totalItems = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))

  function setQuantity(productId: string, quantity: number) {
    const line = lines.value.find((entry) => entry.productId === productId)
    if (!line) {
      return
    }
    if (quantity <= 0) {
      removeProduct(productId)
      return
    }
    line.quantity = quantity
  }

  function removeProduct(productId: string) {
    lines.value = lines.value.filter((line) => line.productId !== productId)
  }

  function clear() {
    lines.value = []
    couponApplied.value = false
    couponMessage.value = ''
    couponInput.value = ''
  }

  function applyCoupon() {
    const code = couponInput.value.trim().toUpperCase()
    if (!code) {
      couponApplied.value = false
      couponMessage.value = 'Enter a coupon code.'
      return false
    }
    if (code === SHOP_COUPON_CODE) {
      couponApplied.value = true
      couponMessage.value = 'Coupon applied.'
      return true
    }
    couponApplied.value = false
    couponMessage.value = 'Invalid coupon code.'
    return false
  }

  function buildViewCartToastAction() {
    return useCartUi().viewCartAction()
  }

  function addProduct(product: Product, quantity = 1) {
    const existing = lines.value.find((line) => line.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      lines.value.push({ productId: product.id, quantity })
    }

    useToastStore().show({
      message: 'The item added to your Shopping bag.',
      action: buildViewCartToastAction(),
    })
  }

  return {
    lines,
    totalItems,
    couponInput,
    couponApplied,
    couponMessage,
    addProduct,
    setQuantity,
    removeProduct,
    clear,
    applyCoupon,
  }
})
