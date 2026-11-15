import { defineStore } from 'pinia'

export type ToastAction = {
  label: string
  to?: string
  onClick?: () => void
}

export type ToastPayload = {
  message: string
  action?: ToastAction
}

export type ToastItem = ToastPayload & {
  id: string
}

const DEFAULT_DURATION_MS = 4500

export const useToastStore = defineStore('toast', () => {
  const items = ref<ToastItem[]>([])
  const timers = new Map<string, ReturnType<typeof setTimeout>>()
  let idCounter = 0

  function dismiss(id: string) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
    items.value = items.value.filter((item) => item.id !== id)
  }

  function dismissAll() {
    for (const timer of timers.values()) {
      clearTimeout(timer)
    }
    timers.clear()
    items.value = []
  }

  function show(payload: ToastPayload, durationMs = DEFAULT_DURATION_MS) {
    if (!import.meta.client) {
      return
    }

    const id = `toast-${++idCounter}`
    const item: ToastItem = { id, ...payload }

    items.value.push(item)

    const timer = setTimeout(() => {
      dismiss(id)
    }, durationMs)
    timers.set(id, timer)
  }

  return {
    items,
    show,
    dismiss,
    dismissAll,
  }
})
