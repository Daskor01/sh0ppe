import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoritesStore } from '~/stores/useFavoritesStore'

describe('favorites store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('toggles favorite state', () => {
    const favorites = useFavoritesStore()

    expect(favorites.isFavorite('p1')).toBe(false)
    favorites.toggle('p1')
    expect(favorites.isFavorite('p1')).toBe(true)
    favorites.toggle('p1')
    expect(favorites.isFavorite('p1')).toBe(false)
  })
})
