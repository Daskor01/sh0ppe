/** Delay blur so scroll on mobile does not flicker recent-search UI. */
export function useContainedFieldFocus(formRef: Ref<HTMLElement | null>) {
  const fieldFocused = ref(false)
  let blurTimer: ReturnType<typeof setTimeout> | null = null

  function onFocusIn() {
    if (blurTimer) {
      clearTimeout(blurTimer)
      blurTimer = null
    }
    fieldFocused.value = true
  }

  function onFocusOut(event: FocusEvent) {
    const root = formRef.value
    if (!root) {
      fieldFocused.value = false
      return
    }
    const next = event.relatedTarget
    if (next instanceof Node && root.contains(next)) {
      return
    }
    if (blurTimer) {
      clearTimeout(blurTimer)
    }
    blurTimer = setTimeout(() => {
      fieldFocused.value = false
      blurTimer = null
    }, 150)
  }

  onUnmounted(() => {
    if (blurTimer) {
      clearTimeout(blurTimer)
    }
  })

  return { fieldFocused, onFocusIn, onFocusOut }
}
