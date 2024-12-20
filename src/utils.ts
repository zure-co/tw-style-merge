import { PluginAPI } from 'tailwindcss/types/config'
import { StyleManager } from './StyleManager'
import { Node } from './types'
import { PLUGIN } from './const'

export function getResolvedNode(node?: string): string {
  return node || PLUGIN.node
}

export function initializeStyleManager(
  nodeConfig: Node,
  getTheme: PluginAPI['theme'],
  prefix?: string
) {
  const styleManager = new StyleManager(nodeConfig, getTheme, prefix)
  styleManager.buildStyle()
  return styleManager.getCSS()
}

type ThemeMapping = {
  [key: string]: string | string[]
}

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

export function getThemeAttributeByCss(cssValue: string): string[] {
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
