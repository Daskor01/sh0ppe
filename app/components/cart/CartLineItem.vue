<template>
  <article class="cart-line" :class="lineVariantClass">
    <NuxtLink :to="productTo" class="cart-line__media">
      <img
        :src="line.product.image"
        :alt="line.product.imageAlt"
        width="120"
        height="120"
        loading="lazy"
      />
    </NuxtLink>

    <div class="cart-line__body">
      <button
        type="button"
        class="cart-line__remove"
        aria-label="Remove from cart"
        @click="cart.removeProduct(line.productId)"
      >
        <X :size="18" aria-hidden="true" />
      </button>

      <h2 class="cart-line__name">
        <NuxtLink :to="productTo">{{ line.product.name }}</NuxtLink>
      </h2>
      <p class="cart-line__variant">{{ variantLabel }}</p>
      <p class="cart-line__price">{{ formatPrice(line.product.price) }}</p>

      <ProductQuantity v-model="quantity" class="cart-line__qty" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import { X } from '@lucide/vue'
  import type { CartLineView } from '~/composables/useCartSummary'
  import { getCartVariantLabel } from '~/utils/cartDisplay'
  import { productPath } from '~/utils/routes'

  const props = withDefaults(
    defineProps<{
      line: CartLineView
      variant?: 'bag' | 'checkout'
    }>(),
    {
      variant: 'bag',
    },
  )

  const cart = useCartStore()
  const { formatPrice } = useFormatPrice()

  const quantity = computed({
    get: () => props.line.quantity,
    set: (value: number) => cart.setQuantity(props.line.productId, value),
  })

  const variantLabel = computed(() => getCartVariantLabel(props.line.product))

  const lineVariantClass = computed(() => `cart-line--${props.variant}`)

  const productTo = computed(() => productPath(props.line.product.slug))
</script>

<style scoped lang="scss">
  .cart-line {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 16px;
    padding-block: 20px;
    border-bottom: 1px solid var(--color-border);

    @include mixins.respond-to(lg) {
      grid-template-columns: 120px minmax(0, 1fr);
      gap: 20px;
    }

    &__media {
      display: block;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--color-surface-muted);
      aspect-ratio: 1 / 1;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      padding-right: 28px;
    }

    &__remove {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      padding: 4px;
      border: none;
      background: transparent;
      color: var(--color-text-muted);
      cursor: pointer;

      &:hover {
        color: var(--color-text);
      }

      &:focus-visible {
        @include mixins.focus-ring;
      }
    }

    &__name {
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 500;

      a {
        color: var(--color-text);
        text-decoration: none;

        &:hover {
          color: var(--color-accent);
        }
      }
    }

    &__variant {
      margin: 0 0 6px;
      font-size: 14px;
      color: var(--color-text-muted);
    }

    &__price {
      margin: 0 0 auto;
      font-size: 14px;
      color: var(--color-accent);
    }

    &__qty {
      margin-top: 16px;
    }

    &--checkout {
      @media (max-width: 1023px) {
        grid-template-columns: 88px minmax(0, 1fr);

        .cart-line__body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-rows: auto auto auto;
          column-gap: 12px;
          align-items: start;
          padding-right: 24px;
        }

        .cart-line__remove {
          grid-column: 2;
          grid-row: 1;
          justify-self: end;
        }

        .cart-line__name {
          grid-column: 1;
          grid-row: 1;
          margin-bottom: 2px;
        }

        .cart-line__variant {
          grid-column: 1;
          grid-row: 2;
          margin-bottom: 4px;
        }

        .cart-line__price {
          grid-column: 1;
          grid-row: 3;
          margin-bottom: 0;
        }

        .cart-line__qty {
          grid-column: 2;
          grid-row: 2 / span 2;
          align-self: end;
          margin-top: 0;
          justify-self: end;
        }
      }

      @include mixins.respond-to(lg) {
        grid-template-columns: 120px minmax(0, 1fr) auto;
        align-items: center;

        .cart-line__body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-rows: auto auto auto;
          column-gap: 24px;
          align-items: center;
          padding-right: 36px;
        }

        .cart-line__remove {
          grid-column: 2;
          grid-row: 1;
        }

        .cart-line__name {
          grid-column: 1;
          grid-row: 1;
        }

        .cart-line__variant {
          grid-column: 1;
          grid-row: 2;
        }

        .cart-line__price {
          grid-column: 1;
          grid-row: 3;
          margin-bottom: 0;
        }

        .cart-line__qty {
          grid-column: 2;
          grid-row: 2 / span 2;
          margin-top: 0;
          justify-self: end;
        }
      }
    }
  }
</style>
