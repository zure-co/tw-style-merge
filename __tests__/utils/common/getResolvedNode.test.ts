import { describe, test, expect, vi } from 'vitest'
import { getResolvedNode } from '../../../src/utils'

vi.mock('../../../src/const', () => ({
  PLUGIN: {
    node: 'mocked-node',
  },
}))

describe('getResolvedNode', () => {
  test('should return the provided node if it exists', () => {
    const node = 'custom-node'
    const result = getResolvedNode(node)
    expect(result).toBe(node)
  })

  test('should return PLUGIN.node if no node is provided', () => {
    const result = getResolvedNode()
    expect(result).toBe('mocked-node')
  })
})
