export function useDismissOnEscape(isActive: () => boolean, onDismiss: () => void) {
  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !isActive()) {
      return
    }
    onDismiss()
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
  })
}
