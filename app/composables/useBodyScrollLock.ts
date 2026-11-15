/** Блокирует прокрутку страницы (iOS: position fixed + восстановление scrollY). */
export function useBodyScrollLock(isLocked: () => boolean) {
  let savedScrollY = 0

  function setLocked(locked: boolean) {
    if (!import.meta.client) {
      return
    }

    const { style } = document.body

    if (locked) {
      savedScrollY = window.scrollY
      style.position = 'fixed'
      style.top = `-${savedScrollY}px`
      style.left = '0'
      style.right = '0'
      style.width = '100%'
      style.overflow = 'hidden'
      return
    }

    style.position = ''
    style.top = ''
    style.left = ''
    style.right = ''
    style.width = ''
    style.overflow = ''
    window.scrollTo(0, savedScrollY)
  }

  watch(
    isLocked,
    (locked) => {
      setLocked(locked)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    setLocked(false)
  })
}
