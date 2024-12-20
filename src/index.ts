import { PluginAPI } from 'tailwindcss/types/config'
import { StyleManager } from './StyleManager'
import { Node } from './types'
import { PLUGIN } from './const'

export type StyleMergeProps = {
  prefix?: string
  node?: string
}

export type TwStyleMerge = (props?: StyleMergeProps) => (api: PluginAPI) => void

export default function TwStyleMerge(
  props?: StyleMergeProps
): (api: PluginAPI) => void {
  const node = props?.node ? props.node : PLUGIN.node
  const prefix = props?.prefix

  return ({ addUtilities, theme: getTheme }: PluginAPI) => {
    const NODE = getTheme(node) as Node | undefined

    if (NODE) {
      const styleManager = new StyleManager(NODE, getTheme, prefix)
      styleManager.buildStyle()
      const CSSClasses = styleManager.getCSS()
      addUtilities(CSSClasses)
    }
  }
}
