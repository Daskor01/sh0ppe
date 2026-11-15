const CSS_VAR = '--site-header-offset'

/** Fixed header height for content offset and toasts; no ResizeObserver (jitter with sticky scroll). */
export function useSiteHeaderOffset() {
  let lastHeight = 0

  function syncHeaderOffset() {
    if (!import.meta.client) {
      return
    }
    const header = document.querySelector('.site-header')
    if (!(header instanceof HTMLElement)) {
      return
    }
    const height = Math.ceil(header.offsetHeight)
    if (lastHeight > 0 && Math.abs(height - lastHeight) < 2) {
      return
    }
    lastHeight = height
    document.documentElement.style.setProperty(CSS_VAR, `${height}px`)
  }

  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      lastHeight = 0
      nextTick(() => {
        syncHeaderOffset()
      })
    },
  )

  let resizeTimer: ReturnType<typeof setTimeout> | null = null

  function onWindowResize() {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      lastHeight = 0
      syncHeaderOffset()
    }, 120)
  }

  onMounted(() => {
    nextTick(() => {
      syncHeaderOffset()
    })
    window.addEventListener('resize', onWindowResize, { passive: true })
  })

  onUnmounted(() => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    window.removeEventListener('resize', onWindowResize)
  })

  return { syncHeaderOffset }
}
