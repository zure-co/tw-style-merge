import { PluginAPI } from 'tailwindcss/types/config'
import { Node } from './types'
import { getResolvedNode } from './utils'
import { StyleManager } from './StyleManager/index'

type TailwindPlugin = (api: PluginAPI) => void
type StyleMergeProps = {
  prefix?: string
  node?: string
}

export type TwStyleMerge = (props?: StyleMergeProps) => TailwindPlugin

/**
 * The main function for the `tw-style-merge` plugin.
 * Accepts optional props such as `prefix` (to add a custom prefix to classes)
 * and `node` (to specify a custom node in the Tailwind configuration).
 *
 * @param {StyleMergeProps} props - Configuration options for the plugin.
 * @returns {TailwindPlugin} A function that registers the generated utilities with Tailwind.
 */
export default function TwStyleMerge({
  prefix,
  node,
}: StyleMergeProps = {}): TailwindPlugin {
  const resolvedNode = getResolvedNode(node)

  return ({ addUtilities, theme: getTheme }: PluginAPI) => {
    // Retrieves the node configuration from the Tailwind theme.
    const nodeConfig = getTheme(resolvedNode) as Node | undefined

    if (nodeConfig) {
      const styleManager = new StyleManager(nodeConfig, getTheme, prefix)

      // Adds the generated CSS utilities to Tailwind.
      addUtilities(styleManager.generateCSS())
    }
  }
}
