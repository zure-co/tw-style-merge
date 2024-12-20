import { PluginAPI } from 'tailwindcss/types/config'
import { PLUGIN } from './const'
import {
  Attribute,
  AttributeWithDefault,
  CSSRuleObject,
  KeyValue,
  Node,
} from './types'
import { getThemeAttributeByCss } from './utils'

/**** STRUCTURE ****************************************************

  NODE (tailwind.config.js { theme: { "tw-style.merge": .... } })
    -> CLASS (ex: heading-1, modal-container)
      -> ATTRIBUTE ({ color: 'black' })
      -> ATTRIBUTE ({ fontFamily: 'Arial' })

********************************************************************/

/**
 * In the `tailwind.config.js`, we use what is referred to as a `node`,
 * which is defined by default as `"tw-style-merge"` (but can be customized in the plugin settings).
 * The `node` is essentially a key in the `theme` object within `tailwind.config.js`.
 * Inside this `node`, we define several `classes`. Each `class` contains one or more `attributes`
 * that represent the applied styles, such as `{ color: "black" }`. These attributes
 * correspond directly to the CSS properties that will be generated.
 * `Theme` is each styling attribute, example: color, fontFamily, etc...
 */

export class StyleManager {
  private prefix: string | undefined
  private css: CSSRuleObject = {}
  private node: Node
  private getTheme: PluginAPI['theme']

  constructor(node: Node, getTheme: PluginAPI['theme'], prefix?: string) {
    this.node = node
    this.prefix = prefix
    this.getTheme = getTheme
  }

  public createClass(name: string) {
    this.css = {
      ...this.css,
      [name]: {},
    }
  }

  public addClassAttribute(className: string, { key, value }: KeyValue) {
    this.css[className][key] = value
  }

  public getCSS() {
    return this.css
  }

  public buildStyle() {
    const classesStyleList = Object.entries(this.node)

    classesStyleList.forEach(([currentClass, attributes]) => {
      const classname = this.getClassName(currentClass)
      this.createClass(classname)
      const classAttributes: Attribute[] = Object.entries(attributes)
      this.defineClassAttributes(classname, classAttributes)
    })
  }

  private isVariable(value: string) {
    return value.startsWith(PLUGIN.symbol)
  }

  private getVariableValue(key: string, value: string) {
    const variableName = value.slice(1)
    const safeKey = getThemeAttributeByCss(key)

    const variableValue = this.getTheme(`${safeKey}.${variableName}`) as
      | string
      | AttributeWithDefault

    if (typeof variableValue === 'string') {
      return variableValue
    }

    return variableValue?.DEFAULT || ''
  }

  private defineClassAttributes(className: string, attributes: Attribute[]) {
    attributes.forEach(([key, rawValue]) => {
      let value: string = rawValue

      if (this.isVariable(rawValue)) {
        value = this.getVariableValue(key, rawValue)
      }

      const attribute = { key, value }

      this.addClassAttribute(className, attribute)
    })
  }

  private getClassName(name: string) {
    if (this.prefix) {
      return `.${this.prefix}-${name}`
    }

    return `.${name}`
  }
}
