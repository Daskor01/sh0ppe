import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useToastStore } from '~/stores/useToastStore'

describe('toast store', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
  })

  it('stacks notifications instead of replacing', () => {
    const toast = useToastStore()

    toast.show({ message: 'First' })
    toast.show({ message: 'Second' })

    expect(toast.items).toHaveLength(2)
    expect(toast.items[0]?.message).toBe('First')
    expect(toast.items[1]?.message).toBe('Second')
  })

  it('dismisses a single notification by id', () => {
    const toast = useToastStore()

    toast.show({ message: 'First' })
    toast.show({ message: 'Second' })
    const topId = toast.items[1]!.id

    toast.dismiss(topId)

    expect(toast.items).toHaveLength(1)
    expect(toast.items[0]?.message).toBe('First')
  })

  it('auto-dismisses after timeout', () => {
    const toast = useToastStore()

    toast.show({ message: 'Test message' })
    expect(toast.items).toHaveLength(1)

    vi.advanceTimersByTime(5000)
    expect(toast.items).toHaveLength(0)
  })
})
