import { describe, test, expect } from 'vitest'
import { getThemePropertyByCss } from '../../../src/utils'

describe('getThemePropertyByCss', () => {
  test('should return the correct theme key for a single-value mapping', () => {
    const result = getThemePropertyByCss('color')
    expect(result).toEqual(['colors'])
  })

  test('should return the correct theme key for an array-value mapping', () => {
    const result = getThemePropertyByCss('padding')
    expect(result).toEqual(['spacing'])
  })

  test('should return multiple keys if multiple matches exist', () => {
    const result = getThemePropertyByCss('paddingLeft')
    expect(result).toEqual(['spacing'])
  })

  test('should return an empty array for a non-matching value', () => {
    const result = getThemePropertyByCss('non-existent-css-property')
    expect(result).toEqual([])
  })

  test('should handle case sensitivity correctly', () => {
    const result = getThemePropertyByCss('Color')
    expect(result).toEqual([])
  })
})
