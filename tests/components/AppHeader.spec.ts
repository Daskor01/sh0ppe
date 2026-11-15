import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import { resetMobileNavClientState } from '~/composables/useMobileNav'

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

describe('AppHeader mobile menu', () => {
  beforeEach(() => {
    resetMobileNavClientState()
    mockMatchMedia(true)
  })

  afterEach(() => {
    resetMobileNavClientState()
    vi.unstubAllGlobals()
  })

  it('does not render drawer in DOM on initial mount (mobile)', async () => {
    await mountSuspended(AppHeader)
    expect(document.querySelector('#mobile-nav')).toBeNull()
  })

  it('opens drawer after menu button click', async () => {
    const wrapper = await mountSuspended(AppHeader)
    await wrapper.get('.site-header__menu-btn').trigger('click')
    await nextTick()
    expect(document.querySelector('#mobile-nav')).not.toBeNull()
  })

  it('closes menu after close button click', async () => {
    const wrapper = await mountSuspended(AppHeader)
    await wrapper.get('.site-header__menu-btn').trigger('click')
    await nextTick()
    const closeBtn = document.querySelector('.mobile-nav__close')
    expect(closeBtn).not.toBeNull()
    ;(closeBtn as HTMLButtonElement).click()
    await nextTick()
    expect(document.querySelector('#mobile-nav')).toBeNull()
  })
})
