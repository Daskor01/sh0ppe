import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AccountAuthPanel from '~/components/account/AccountAuthPanel.vue'

describe('AccountAuthPanel', () => {
  it('renders sign-in fields and submit button', async () => {
    const wrapper = await mountSuspended(AccountAuthPanel)

    expect(wrapper.find('#account-sign-in-email').exists()).toBe(true)
    expect(wrapper.find('#account-sign-in-password').exists()).toBe(true)
    expect(wrapper.find('.account-auth__submit').exists()).toBe(true)
    expect(wrapper.text()).toContain('Sign in')
  })
})
