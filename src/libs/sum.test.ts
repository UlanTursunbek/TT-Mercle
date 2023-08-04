import { expect, it } from 'vitest'
import { sum } from './sum'

it('should return sum of two numbers', () => {
  expect(sum(2, 3)).toEqual(5)
})
