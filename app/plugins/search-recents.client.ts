import { loadRecentSearches } from '~/utils/recentSearches'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const recents = useState<string[]>('search-recent-queries', () => [])
    if (recents.value.length === 0) {
      recents.value = loadRecentSearches()
    }
  })
})
