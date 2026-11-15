/**
 * Formats price as in mockup: "$ 68,00"
 */
export function useFormatPrice() {
  function formatPrice(value: number): string {
    const [whole, fraction = '00'] = value.toFixed(2).split('.')
    return `$ ${whole},${fraction}`
  }

  return { formatPrice }
}
