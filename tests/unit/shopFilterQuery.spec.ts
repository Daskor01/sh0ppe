import { describe, expect, it } from 'vitest'
import {
  buildShopFilterQuery,
  parseShopFilterQuery,
  shopFilterQueriesEqual,
} from '~/utils/shopFilterQuery'

const defaults = { min: 20, max: 180 }

describe('shopFilterQuery', () => {
  it('parses shared filter query', () => {
    const state = parseShopFilterQuery(
      {
        q: 'lira',
        category: 'earrings',
        sort: 'price-asc',
        min: '25',
        max: '100',
        sale: '1',
        stock: '1',
      },
      defaults,
    )

    expect(state).toEqual({
      search: 'lira',
      category: 'earrings',
      sortBy: 'price-asc',
      priceMin: 25,
      priceMax: 100,
      onSaleOnly: true,
      inStockOnly: true,
    })
  })

  it('ignores invalid category and sort', () => {
    const state = parseShopFilterQuery(
      {
        category: 'invalid',
        sort: 'newest',
      },
      defaults,
    )

    expect(state.category).toBe('all')
    expect(state.sortBy).toBe('featured')
  })

  it('builds minimal query for defaults', () => {
    const query = buildShopFilterQuery(
      {
        search: '',
        category: 'all',
        sortBy: 'featured',
        priceMin: defaults.min,
        priceMax: defaults.max,
        onSaleOnly: false,
        inStockOnly: false,
      },
      defaults,
    )

    expect(query).toEqual({})
  })

  it('builds shareable query with only active filters', () => {
    const query = buildShopFilterQuery(
      {
        search: 'kaede',
        category: 'hair-pins',
        sortBy: 'name',
        priceMin: 30,
        priceMax: defaults.max,
        onSaleOnly: true,
        inStockOnly: false,
      },
      defaults,
    )

    expect(query).toEqual({
      q: 'kaede',
      category: 'hair-pins',
      sort: 'name',
      min: '30',
      sale: '1',
    })
  })

  it('compares query objects ignoring missing keys', () => {
    expect(shopFilterQueriesEqual({ category: 'earrings' }, { category: 'earrings' })).toBe(true)
    expect(shopFilterQueriesEqual({ category: 'earrings' }, { category: 'necklaces' })).toBe(false)
  })
})
