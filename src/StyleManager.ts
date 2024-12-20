import { PLUGIN } from './const'
import {
  Attribute,
  CSSRuleObject,
  KeyValue,
  Node,
  ThemeFunction,
} from './types'

export class StyleManager {
  private prefix: string | undefined
  private css: CSSRuleObject = {}
  private node: Node
  private getTheme: ThemeFunction

  constructor(node: Node, getTheme: ThemeFunction, prefix?: string) {
    this.node = node
    this.prefix = prefix
    this.getTheme = getTheme
  }

  public createTheme(name: string) {
    this.css = {
      ...this.css,
      [name]: {},
    }
  }

  public addThemeAttribute(className: string, { key, value }: KeyValue) {
    this.css[className][key] = value
  }

  public getCSS() {
    return this.css
  }

  public buildStyle() {
    const themeStyleList = Object.entries(this.node)

    themeStyleList.forEach(([theme, attributes]) => {
      const classname = this.getClassName(theme)
      this.createTheme(classname)
      const themeAttributes: Attribute[] = Object.entries(attributes)
      this.defineThemeAttributes(classname, themeAttributes)
    })
  }

  private isVariable(value: string) {
    return value.startsWith(PLUGIN.symbol)
  }

  private getVariableValue(key: string, value: string) {
    const variableName = value.slice(1)
    const variableValue = this.getTheme(`${key}.${variableName}`)
    return variableValue || ''
  }

  private defineThemeAttributes(theme: string, attributes: Attribute[]) {
    attributes.forEach(([key, rawValue]) => {
      let value: string = rawValue

      if (this.isVariable(rawValue)) {
        value = this.getVariableValue(key, rawValue)
      }

      const attribute = { key, value }

      this.addThemeAttribute(theme, attribute)
    })
  }

  private getClassName(name: string) {
    if (this.prefix) {
      return `.${this.prefix}-${name}`
    }

    return `.${name}`
  }
}
