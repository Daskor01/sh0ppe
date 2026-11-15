import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetMobileNavClientState, useMobileNav } from '~/composables/useMobileNav'

const DESKTOP_MEDIA = '(min-width: 1024px)'

function mockMatchMedia(mobile: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === DESKTOP_MEDIA ? !mobile : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('useMobileNav', () => {
  beforeEach(() => {
    resetMobileNavClientState()
    mockMatchMedia(true)
  })

  afterEach(() => {
    resetMobileNavClientState()
    vi.unstubAllGlobals()
  })

  it('drawer closed by default on mobile viewport', () => {
    const nav = useMobileNav()
    nav.syncViewport()
    expect(nav.isOpen.value).toBe(false)
    expect(nav.showDrawer.value).toBe(false)
  })

  it('opens and closes on toggle', () => {
    const nav = useMobileNav()
    nav.syncViewport()
    nav.open()
    expect(nav.showDrawer.value).toBe(true)
    nav.close()
    expect(nav.showDrawer.value).toBe(false)
  })

  it('does not show drawer on desktop viewport', () => {
    mockMatchMedia(false)
    const nav = useMobileNav()
    nav.syncViewport()
    nav.open()
    expect(nav.showDrawer.value).toBe(false)
  })
})
