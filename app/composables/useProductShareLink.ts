import { copyTextToClipboard } from '~/utils/copyToClipboard'

export function useProductShareLink(slug: string) {
  const requestURL = useRequestURL()

  const productPageUrl = computed(() => `${requestURL.origin}/product/${slug}`)

  async function copyProductLink() {
    const copied = await copyTextToClipboard(productPageUrl.value)
    const toast = useToastStore()
    if (copied) {
      toast.show({ message: 'Product link copied.' })
      return
    }
    toast.show({ message: 'Could not copy the link. Try again.' })
  }

  return { productPageUrl, copyProductLink }
}