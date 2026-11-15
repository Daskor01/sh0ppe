export function useCartDrawer() {
  const isOpen = useState('cart-drawer-open', () => false)

  function open() {
    if (!import.meta.client) {
      return
    }
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  watch(isOpen, (open) => {
    if (!import.meta.client) {
      return
    }
    document.body.style.overflow = open ? 'hidden' : ''
  })

  onUnmounted(() => {
    if (import.meta.client && isOpen.value) {
      document.body.style.overflow = ''
    }
  })

  return { isOpen, open, close, toggle }
}
