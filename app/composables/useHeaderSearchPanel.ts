export function useHeaderSearchPanel() {
  const isOpen = useState('header-desktop-search-open', () => false)
  const { inputQuery, submitSearch: submitSiteSearch } = useSiteSearch()

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function submitSearch() {
    submitSiteSearch()
    close()
  }

  return {
    isOpen,
    searchQuery: inputQuery,
    open,
    close,
    toggle,
    submitSearch,
  }
}
