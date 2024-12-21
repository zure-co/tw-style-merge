import { PLUGIN } from '../const'

/**
 * Resolves the node name to be used in the Tailwind configuration.
 * If a node is provided, it returns the provided value; otherwise, it defaults to `PLUGIN.node`.
 *
 * @param {string} [node] - The optional node name.
 * @returns {string} The resolved node name.
 */
export function getResolvedNode(node?: string): string {
  return node || PLUGIN.node
}

type ThemeMapping = {
  [key: string]: string | string[]
}

/**
 * Maps Tailwind theme keys to corresponding CSS properties.
 * This mapping is used to convert a CSS property into a Tailwind-compatible theme key.
 */
const themeMappings: ThemeMapping = {
  colors: 'color',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  spacing: [
    'padding',
    'margin',
    'width',
    'height',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
  ],
  borderRadius: 'borderRadius',
  boxShadow: 'boxShadow',
  opacity: 'opacity',
  zIndex: 'zIndex',
  lineHeight: 'lineHeight',
  letterSpacing: 'letterSpacing',
  maxWidth: 'maxWidth',
  maxHeight: 'maxHeight',
  minWidth: 'minWidth',
  minHeight: 'minHeight',
  transitionDuration: 'transitionDuration',
}

/**
 * Retrieves the Tailwind theme key(s) associated with a given CSS property.
 *
 * @param {string} cssValue - The CSS property to map.
 * @returns {string[]} An array of corresponding Tailwind theme keys.
 */
export function getThemePropertyByCss(cssValue: string): string[] {
  const result: string[] = []

  for (const [themeKey, cssKeys] of Object.entries(themeMappings)) {
    if (Array.isArray(cssKeys)) {
      if (cssKeys.includes(cssValue)) {
        result.push(themeKey)
      }
    } else if (cssKeys === cssValue) {
      result.push(themeKey)
    }
  }

  return result
}
