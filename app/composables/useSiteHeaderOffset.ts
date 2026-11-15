const CSS_VAR = '--site-header-offset'
const MOBILE_MAX = '(max-width: 1023px)'

function mobileToolbarBlockPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    '--header-mobile-toolbar-block',
  )
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 61
}

function mobileBarHeightPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height-mobile')
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 56
}

function hasMobileSearchRow(header: HTMLElement): boolean {
  const toolbar = header.querySelector('.shop-mobile-toolbar')
  if (toolbar instanceof HTMLElement) {
    return true
  }
  const mobileSearch = header.querySelector('.header-mobile-search')
  return mobileSearch instanceof HTMLElement && mobileSearch.offsetHeight > 0
}

/** Fixed header height for content offset and toasts; stable on mobile (no resize jitter). */
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

    const isMobile = window.matchMedia(MOBILE_MAX).matches
    const height = isMobile
      ? mobileBarHeightPx() + (hasMobileSearchRow(header) ? mobileToolbarBlockPx() : 0)
      : Math.ceil(header.offsetHeight)

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
    if (window.matchMedia(MOBILE_MAX).matches) {
      return
    }
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
