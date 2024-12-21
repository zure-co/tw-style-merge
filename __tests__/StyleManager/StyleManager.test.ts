import { describe, test, expect, vi, Mock } from 'vitest'
import { StyleManager } from '../../src/StyleManager'
import { Node } from '../../src/types'
import { getThemePropertyByCss } from '../../src/utils'

vi.mock('../../src/const', () => ({
  PLUGIN: {
    symbol: '$',
  },
}))

vi.mock('../../src/utils', () => ({
  getThemePropertyByCss: vi.fn(),
}))

describe('StyleManager', () => {
  const mockGetTheme: any = vi.fn((path: string) => {
    const mockTheme: any = {
      colors: {
        primary: '#3490dc',
      },
      fontFamily: {
        sans: 'Arial, sans-serif',
      },
      spacing: {
        4: '1rem',
      },
    }
    const [themeKey, variable] = path.split('.')
    return mockTheme[themeKey]?.[variable] || ''
  })

  const mockNode: Node = {
    button: {
      color: '$primary',
      padding: '$4',
    },
    heading: {
      fontFamily: '$sans',
    },
  }

  describe('generateCSS', () => {
    test('should generate the correct CSS rule object', () => {
      ;(getThemePropertyByCss as Mock).mockImplementation(
        (cssValue: string) => {
          const themeMappings: Record<string, string[]> = {
            color: ['colors'],
            padding: ['spacing'],
            fontFamily: ['fontFamily'],
          }
          return themeMappings[cssValue] || []
        }
      )

      const manager = new StyleManager(mockNode, mockGetTheme, 'tw')
      const result = manager.generateCSS()

      expect(result).toEqual({
        '.tw-button': {
          color: '#3490dc',
          padding: '1rem',
        },
        '.tw-heading': {
          fontFamily: 'Arial, sans-serif',
        },
      })
    })

    test('should return empty object if no node is provided', () => {
      const manager = new StyleManager({}, mockGetTheme)
      const result = manager.generateCSS()

      expect(result).toEqual({})
    })
  })

  describe('resolveVariableValue', () => {
    test('should resolve variables correctly using getTheme', () => {
      ;(getThemePropertyByCss as Mock).mockReturnValueOnce(['colors'])

      const manager = new StyleManager(mockNode, mockGetTheme)
      const result = manager.generateCSS()

      expect(mockGetTheme).toHaveBeenCalledWith('colors.primary')
      expect(result['.button']).toHaveProperty('color', '#3490dc')
    })
  })

  describe('mapAttributesToCSS', () => {
    test('should handle raw values without variables', () => {
      const node: Node = {
        container: {
          margin: '10px',
        },
      }

      const manager = new StyleManager(node, mockGetTheme)
      const result = manager.generateCSS()

      expect(result).toEqual({
        '.container': {
          margin: '10px',
        },
      })
    })
  })
})
