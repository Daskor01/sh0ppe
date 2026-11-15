const CSS_VAR = '--site-header-offset'

export function useSiteHeaderOffset() {
  function syncHeaderOffset() {
    if (!import.meta.client) {
      return
    }
    const header = document.querySelector('.site-header')
    if (!(header instanceof HTMLElement)) {
      return
    }
    const height = Math.round(header.getBoundingClientRect().height)
    document.documentElement.style.setProperty(CSS_VAR, `${height}px`)
  }

  let resizeObserver: ResizeObserver | null = null

  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      nextTick(() => {
        syncHeaderOffset()
      })
    },
  )

  onMounted(() => {
    syncHeaderOffset()
    const header = document.querySelector('.site-header')
    if (!(header instanceof HTMLElement) || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', syncHeaderOffset)
      return
    }
    resizeObserver = new ResizeObserver(() => {
      syncHeaderOffset()
    })
    resizeObserver.observe(header)
    window.addEventListener('resize', syncHeaderOffset)
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
    if (import.meta.client) {
      window.removeEventListener('resize', syncHeaderOffset)
    }
  })
}
