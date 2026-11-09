import { describe, expect, test } from 'vitest'

import { classNames } from './classNames'

describe('classNames', () => {
  test('joins classes from strings, objects and arrays', () => {
    expect(classNames('p-2', { hidden: false, 'text-sm': true }, ['flex'])).toBe('p-2 text-sm flex')
  })

  test('skips falsy values', () => {
    expect(classNames('p-2', undefined, null, false, '')).toBe('p-2')
  })

  test('keeps the last of conflicting Tailwind classes', () => {
    expect(classNames('text-sm p-2', 'p-4')).toBe('text-sm p-4')
  })
})
