import { describe, expect, it } from 'vitest'
import { parsePlacedOrdersRecord, parseStringArray } from '~/utils/storageParse'

describe('storageParse', () => {
  it('parseStringArray filters invalid entries', () => {
    expect(parseStringArray([' a ', 1, null, 'b'], 10)).toEqual(['a', 'b'])
  })

  it('parsePlacedOrdersRecord rejects invalid orders', () => {
    expect(parsePlacedOrdersRecord({ bad: { foo: 1 } })).toEqual({})
  })
})
