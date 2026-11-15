import { defineStore } from 'pinia'
import { parseStringArray } from '~/utils/storageParse'

const STORAGE_KEY = 'shoppe-favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<string[]>([])
  const isHydrated = ref(false)

  function hydrate() {
    if (isHydrated.value || !import.meta.client) {
      return
    }
    isHydrated.value = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        favoriteIds.value = parseStringArray(JSON.parse(raw) as unknown, 200)
      }
    } catch {
      favoriteIds.value = []
    }
  }

  function persist() {
    if (!import.meta.client) {
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds.value))
  }

  const favoriteSet = computed(() => new Set(favoriteIds.value))

  function isFavorite(productId: string) {
    if (!isHydrated.value) {
      return false
    }
    return favoriteSet.value.has(productId)
  }

  function toggle(productId: string) {
    hydrate()
    const index = favoriteIds.value.indexOf(productId)
    if (index >= 0) {
      favoriteIds.value.splice(index, 1)
      persist()
      return false
    }

    favoriteIds.value.push(productId)
    persist()

    useToastStore().show({
      message: 'The item added to your wishlist.',
    })

    return true
  }

  function remove(productId: string) {
    hydrate()
    favoriteIds.value = favoriteIds.value.filter((id) => id !== productId)
    persist()
  }

  return {
    favoriteIds,
    isHydrated,
    isFavorite,
    toggle,
    remove,
    hydrate,
  }
})
