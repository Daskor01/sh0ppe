<template>
  <article class="product-card">
    <div class="product-card__media">
      <NuxtLink :to="productTo" class="product-card__image-link">
        <img
          class="product-card__image"
          :src="product.image"
          :alt="product.imageAlt"
          width="400"
          height="400"
          loading="lazy"
        />
      </NuxtLink>

      <span v-if="product.soldOut" class="product-card__badge">Sold out</span>
      <span v-else-if="discount != null" class="product-card__badge">-{{ discount }}%</span>

      <div class="product-card__hover" :class="hoverOverlayClass">
        <template v-if="hoverVariant === 'icons'">
          <button
            type="button"
            class="product-card__action"
            aria-label="Add to cart"
            @click="addToCart"
          >
            <ShoppingCart :size="20" aria-hidden="true" />
          </button>
          <NuxtLink
            :to="productTo"
            class="product-card__action"
            aria-label="Quick view"
          >
            <Eye :size="20" aria-hidden="true" />
          </NuxtLink>
          <UiFavoriteButton :product-id="product.id" variant="circle" />
        </template>
        <BaseButton
          v-else
          variant="solid-dark"
          class="product-card__add-bar"
          @click="addToCart"
        >
          Add to cart
        </BaseButton>
      </div>
    </div>

    <div class="product-card__body">
      <h3 class="product-card__name">
        <NuxtLink :to="productTo">{{ product.name }}</NuxtLink>
      </h3>
      <div class="product-card__prices">
        <span v-if="comparePriceLabel" class="product-card__compare">
          {{ comparePriceLabel }}
        </span>
        <span class="product-card__price">{{ formatPrice(product.price) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Eye, ShoppingCart } from '@lucide/vue'
import type { Product } from '~/types/product'
import { getEffectiveDiscount, hasSale } from '~/utils/productPrice'
import { productPath } from '~/utils/routes'

const props = defineProps<{
  product: Product
  /** Desktop hover: icon row vs bottom bar */
  hoverVariant?: 'icons' | 'add-to-cart'
}>()

const cart = useCartStore()
const { formatPrice } = useFormatPrice()

const productTo = computed(() => productPath(props.product.slug))

const discount = computed(() => getEffectiveDiscount(props.product))
const onSale = computed(() => hasSale(props.product))

const hoverVariant = computed(() => props.hoverVariant ?? 'icons')

const hoverOverlayClass = computed(() => `product-card__hover--${hoverVariant.value}`)

const comparePriceLabel = computed(() => {
  if (!onSale.value || props.product.compareAtPrice == null) {
    return null
  }
  return formatPrice(props.product.compareAtPrice)
})

function addToCart() {
  cart.addProduct(props.product)
}
</script>

<style scoped lang="scss">
.product-card {
  &__media {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--color-surface-muted);
    aspect-ratio: 1 / 1;
  }

  &__image-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &__badge {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--light-colors-white---light);
    background: var(--color-accent);
    border-radius: var(--radius-sm);
  }

  &__hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base);

    &--add-to-cart {
      align-items: flex-end;
      padding: 0;
    }
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: var(--light-colors-white---light);
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
    transition: transform var(--transition-base);

    &:hover {
      transform: scale(1.05);
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__add-bar {
    width: 100%;
    border-radius: 0;
  }

  &__body {
    padding-top: 12px;
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

  &__prices {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
  }

  &__compare {
    font-size: 14px;
    color: var(--color-error);
    text-decoration: line-through;
  }

  &__price {
    font-size: 16px;
    color: var(--color-accent);
  }

  @include mixins.respond-to(lg) {
    &:hover &__image {
      transform: scale(1.03);
    }

    &:hover &__hover {
      opacity: 1;
      pointer-events: auto;
    }

    &__hover--icons {
      background: rgb(255 255 255 / 35%);
    }

    &__hover--add-to-cart {
      background: linear-gradient(transparent 55%, rgb(255 255 255 / 75%) 100%);
    }
  }
}
</style>
