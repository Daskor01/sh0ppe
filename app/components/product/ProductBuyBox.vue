<template>
  <div class="product-buy">
    <h1 class="product-buy__title">{{ product.name }}</h1>

    <div class="product-buy__price-row">
      <div class="product-buy__prices">
        <span v-if="comparePriceLabel" class="product-buy__compare">
          {{ comparePriceLabel }}
        </span>
        <span class="product-buy__price">{{ formatPrice(product.price) }}</span>
        <span v-if="discount != null" class="product-buy__badge">-{{ discount }}%</span>
      </div>
      <button type="button" class="product-buy__share-mobile" aria-label="Share product">
        <Share2 :size="20" aria-hidden="true" />
      </button>
    </div>

    <ProductRating
      class="product-buy__rating product-buy__rating--desktop"
      :rating="detail.rating"
      :review-count="detail.reviewCount"
    />

    <p class="product-buy__short product-buy__short--desktop">
      {{ detail.shortDescription }}
    </p>

    <p class="product-buy__short product-buy__short--mobile">
      {{ detail.shortDescription }}
    </p>
    <button type="button" class="product-buy__view-more" @click="emit('viewMore')">
      View more
      <span aria-hidden="true">&gt;</span>
    </button>

    <div class="product-buy__actions">
      <ProductQuantity v-model="quantity" class="product-buy__quantity" />
      <BaseButton
        variant="outline-dark"
        class="product-buy__cart-btn"
        :disabled="product.soldOut"
        @click="addToCart()"
      >
        {{ addToCartLabel }}
      </BaseButton>
    </div>

    <ProductShareRow :product-id="product.id" :product-name="product.name" />

    <dl class="product-buy__meta product-buy__meta--desktop">
      <div class="product-buy__meta-row">
        <dt>SKU:</dt>
        <dd>{{ detail.sku }}</dd>
      </div>
      <div class="product-buy__meta-row">
        <dt>Categories:</dt>
        <dd>{{ detail.categoryLabels.join(', ') }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { Share2 } from '@lucide/vue'
import type { Product, ProductPageContent } from '~/types/product'
import { getEffectiveDiscount, hasSale } from '~/utils/productPrice'

const props = defineProps<{
  product: Product
  detail: ProductPageContent
}>()

const quantity = defineModel<number>('quantity', { default: 1 })

const emit = defineEmits<{
  viewMore: []
}>()

const cart = useCartStore()
const { formatPrice } = useFormatPrice()

const onSale = computed(() => hasSale(props.product))
const discount = computed(() => getEffectiveDiscount(props.product))

const addToCartLabel = computed(() => (props.product.soldOut ? 'Sold out' : 'Add to cart'))

const comparePriceLabel = computed(() => {
  if (!onSale.value || props.product.compareAtPrice == null) {
    return null
  }
  return formatPrice(props.product.compareAtPrice)
})

function addToCart() {
  if (props.product.soldOut) {
    return
  }
  cart.addProduct(props.product, quantity.value)
  quantity.value = 1
}
</script>

<style scoped lang="scss">
.product-buy {
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 12px;
    font-size: clamp(26px, 4vw, 33px);
    font-weight: 500;
    line-height: 1.2;
  }

  &__price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;

    @include mixins.respond-to(lg) {
      justify-content: flex-start;
      margin-bottom: 16px;
    }
  }

  &__prices {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 12px;
  }

  &__price {
    font-size: 20px;
    color: var(--color-accent);
  }

  &__compare {
    font-size: 16px;
    color: var(--color-error);
    text-decoration: line-through;
  }

  &__badge {
    padding: 2px 6px;
    font-size: 12px;
    color: var(--light-colors-white---light);
    background: var(--color-accent);
    border-radius: var(--radius-sm);
  }

  &__share-mobile {
    display: inline-flex;
    padding: 4px;
    border: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;

    @include mixins.respond-to(lg) {
      display: none;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__rating {
    margin-bottom: 20px;

    &--desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: flex;
      }
    }
  }

  &__short {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-muted);

    &--desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: block;
        margin-bottom: 24px;
      }
    }

    &--mobile {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @include mixins.respond-to(lg) {
        display: none;
      }
    }
  }

  &__view-more {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 20px;
    padding: 0;
    border: none;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--color-accent);
    background: transparent;
    cursor: pointer;

    @include mixins.respond-to(lg) {
      display: none;
    }

    &:focus-visible {
      @include mixins.focus-ring;
    }
  }

  &__short--desktop {
    @include mixins.respond-to(lg) {
      order: unset;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    order: 3;
    margin-bottom: 24px;

    @include mixins.respond-to(lg) {
      flex-direction: row;
      align-items: stretch;
      gap: 16px;
      order: unset;
      margin-bottom: 28px;
    }
  }

  &__short--mobile {
    order: 4;

    @include mixins.respond-to(lg) {
      order: unset;
    }
  }

  &__view-more {
    order: 5;

    @include mixins.respond-to(lg) {
      order: unset;
    }
  }

  &__quantity {
    @include mixins.respond-to(lg) {
      flex-shrink: 0;
    }
  }

  &__cart-btn {
    flex: 1;
  }

  &__meta {
    margin: 24px 0 0;
    font-size: 14px;
    color: var(--color-text-muted);

    &--desktop {
      display: none;

      @include mixins.respond-to(lg) {
        display: block;
      }
    }
  }

  &__meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
    margin-bottom: 8px;

    dt {
      margin: 0;
      font-weight: 500;
      color: var(--color-text);
    }

    dd {
      margin: 0;
    }
  }
}
</style>
