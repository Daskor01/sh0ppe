import { getBlogTotalPages } from '~/data/blog'

function parsePageQuery(raw: unknown): number {
  const value = Array.isArray(raw) ? raw[0] : raw
  const parsed = Number.parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }
  return parsed
}

export function useBlogPage() {
  const route = useRoute()
  const router = useRouter()

  const totalPages = computed(() => getBlogTotalPages())

  const currentPage = computed(() => {
    const parsed = parsePageQuery(route.query.page)
    return Math.min(parsed, totalPages.value)
  })

  let syncing = false

  function goToPage(page: number) {
    const next = Math.min(Math.max(1, page), totalPages.value)
    const query = next === 1 ? {} : { page: String(next) }

    syncing = true
    router.replace({ path: '/blog', query }).finally(() => {
      syncing = false
    })
  }

  watch(
    () => route.query.page,
    () => {
      if (syncing) {
        return
      }
      const parsed = parsePageQuery(route.query.page)
      if (parsed > totalPages.value) {
        goToPage(totalPages.value)
      }
    },
  )

  return {
    currentPage,
    totalPages,
    goToPage,
  }
}
