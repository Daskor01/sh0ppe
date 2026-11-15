const DESKTOP_MEDIA = '(min-width: 1024px)'

function readIsMobileViewport(): boolean {
  if (!import.meta.client) return false
  return !window.matchMedia(DESKTOP_MEDIA).matches
}

export function resetMobileNavClientState() {
  useState('mobile-nav-open', () => false).value = false
}

export function useMobileNav() {
  const isOpen = useState('mobile-nav-open', () => false)
  const isMobileViewport = ref(false)
  const cartDrawerOpen = useState('cart-drawer-open', () => false)

  function close() {
    isOpen.value = false
  }

  function open() {
    isOpen.value = true
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function syncViewport() {
    if (!import.meta.client) return
    isMobileViewport.value = readIsMobileViewport()
    if (!isMobileViewport.value) {
      close()
    }
  }

  onMounted(() => {
    syncViewport()
    const media = window.matchMedia(DESKTOP_MEDIA)
    media.addEventListener('change', syncViewport)
    onUnmounted(() => media.removeEventListener('change', syncViewport))
  })

  watch(isOpen, (openState) => {
    if (!import.meta.client) return
    if (cartDrawerOpen.value) {
      return
    }
    document.body.style.overflow = openState && isMobileViewport.value ? 'hidden' : ''
  })

  const route = useRoute()
  watch(
    () => route.fullPath,
    () => close(),
  )

  onUnmounted(() => {
    if (import.meta.client && !cartDrawerOpen.value) {
      document.body.style.overflow = ''
    }
  })

  const showDrawer = computed(() => isOpen.value && isMobileViewport.value)

  return { isOpen, isMobileViewport, showDrawer, open, close, toggle, syncViewport }
}
