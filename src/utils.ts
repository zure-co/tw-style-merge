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
