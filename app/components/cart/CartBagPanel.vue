<template>
  <div class="cart-bag" :class="bagLayoutClass">
    <header class="cart-bag__head">
      <p class="cart-bag__title">Shopping bag</p>
      <p v-if="showItemCount" class="cart-bag__count">{{ itemsLabel }}</p>
    </header>

    <div v-if="isCartEmpty" class="cart-bag__empty">
      <p>Your bag is empty.</p>
      <button type="button" class="cart-bag__shop-link" @click="onContinueShopping()">
        Continue shopping
      </button>
    </div>

    <ul v-else class="cart-bag__list">
      <li v-for="line in lines" :key="line.productId">
        <CartLineItem :line="line" />
      </li>
    </ul>

    <footer v-if="hasCartLines" class="cart-bag__foot">
      <div class="cart-bag__subtotal">
        <span>Subtotal ({{ totalItems }} items)</span>
        <span>{{ formatPrice(subtotal) }}</span>
      </div>
      <UiBaseButton variant="outline-dark" @click="onViewCart()">VIEW CART</UiBaseButton>
    </footer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    layout?: 'page' | 'drawer'
  }>(),
  {
    layout: 'drawer',
  },
)

const { lines, totalItems, subtotal, itemsLabel, formatPrice } = useCartSummary()
const route = useRoute()
const router = useRouter()
const { close: closeDrawer } = useCartDrawer()

function isShopRoute() {
  return route.path === '/shop' || route.path.startsWith('/shop/')
}

function onViewCart() {
  if (props.layout === 'drawer') {
    closeDrawer()
    router.push('/cart')
  }
}

const bagLayoutClass = computed(() => `cart-bag--${props.layout}`)

const isCartEmpty = computed(() => lines.value.length === 0)
const hasCartLines = computed(() => lines.value.length > 0)

const showItemCount = computed(() => totalItems.value > 0)

function onContinueShopping() {
  if (props.layout === 'drawer' && isShopRoute()) {
    closeDrawer()
    return
  }

  if (props.layout === 'drawer') {
    closeDrawer()
    router.push('/shop')
    return
  }

  router.push('/shop')
}
</script>

<style scoped lang="scss">
.cart-bag {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &--drawer {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    height: 100%;
  }

  &--drawer &__list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &--drawer &__foot {
    @media (max-width: 1023px) {
      flex-shrink: 0;
      margin-top: auto;
      padding-bottom: max(8px, env(safe-area-inset-bottom));
      background: var(--color-surface);
      box-shadow: 0 -8px 24px rgb(0 0 0 / 4%);
    }
  }

  &__head {
    padding-bottom: 16px;

    @media (max-width: 1023px) {
      display: none;
    }
  }

  &__title {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 500;
    color: var(--color-text);
  }

  &__count {
    margin: 0;
    font-size: 14px;
    color: var(--color-text-muted);
  }

  &__list {
    flex: 1;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
  }

  &__empty {
    flex: 1;
    padding: 40px 0;
    font-size: 16px;
    color: var(--color-text-muted);
  }

  &__shop-link {
    @include mixins.link-accent;
    display: inline-block;
    margin-top: 12px;
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__foot {
    flex-shrink: 0;
    padding-top: 20px;
    margin-top: auto;
    border-top: 1px solid var(--color-border);
  }

  &__subtotal {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }

}
</style>
