export function useCartUi() {
  const router = useRouter()
  const drawer = useCartDrawer()
  const { close: closeMobileNav } = useMobileNav()

  function openCart() {
    if (!import.meta.client) {
      return
    }
    closeMobileNav()
    drawer.open()
  }

  function viewCartAction() {
    return {
      label: 'VIEW CART',
      onClick: () => {
        drawer.close()
        router.push('/cart')
      },
    }
  }

  return { openCart, viewCartAction, drawer }
}
