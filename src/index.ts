import { PluginAPI } from 'tailwindcss/types/config'
import { Node } from './types'
import { getResolvedNode, initializeStyleManager } from './utils'

export type StyleMergeProps = {
  prefix?: string
  node?: string
}

export type TailwindPlugin = (api: PluginAPI) => void
export type TwStyleMerge = (props?: StyleMergeProps) => TailwindPlugin

export default function TwStyleMerge({
  prefix,
  node,
}: StyleMergeProps = {}): TailwindPlugin {
  const resolvedNode = getResolvedNode(node)

  return ({ addUtilities, theme: getTheme }: PluginAPI) => {
    const nodeConfig = getTheme(resolvedNode) as Node | undefined

    if (nodeConfig) {
      const generatedUtilities = initializeStyleManager(
        nodeConfig,
        getTheme,
        prefix
      )

      console.log('---', generatedUtilities)

      addUtilities(generatedUtilities)
    }
  }
}
