import { PLUGIN } from '../const'
import { themeMappings } from '../const/tailwind.const'

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
