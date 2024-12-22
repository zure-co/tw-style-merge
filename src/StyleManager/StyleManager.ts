import { PluginAPI } from 'tailwindcss/types/config'
import { PLUGIN } from '../const'
import { getThemePropertyByCss } from '../utils'
import { Property, PropertyWithDefault, CSSRuleObject, Node } from '../types'
import { Logger } from '../Logger'

export class StyleManager {
  private prefix: string | undefined
  private css: CSSRuleObject = {}
  private node: Node
  private getTheme: PluginAPI['theme']
  private log: Logger

  constructor(node: Node, getTheme: PluginAPI['theme'], prefix?: string) {
    this.node = node
    this.prefix = prefix
    this.log = new Logger()
    this.getTheme = getTheme
  }

  /**
   * Generates the complete CSS rule object based on the node definitions.
   * @returns {CSSRuleObject} A map of class names and their corresponding styles.
   */
  public generateCSS(): CSSRuleObject {
    this.build()
    return this.css
  }

  /**
   * Iterates through the node to build the CSS structure.
   */
  private build(): void {
    this.log.breakline()

    // get styles defined in tailwind.config.js
    const classes = Object.entries(this.node)

    classes.forEach(([className, properties]) => {
      const formattedClassName = this.formatClassName(className)
      const mappedAttributes = this.mapAttributesToCSS(
        Object.entries(properties)
      )
      this.css[formattedClassName] = mappedAttributes
    })

    this.log.finally()
    this.log.breakline()
  }

  /**
   * Maps a list of properties, resolving variables and formatting the data.
   * @param properties List of attributes to map.
   * @returns {Record<string, string>} Mapped attributes as key-value pairs.
   */
  private mapAttributesToCSS(properties: Property[]): Record<string, string> {
    return properties.reduce((mapped, [key, rawValue]) => {
      const value = this.isVariable(rawValue)
        ? this.resolveVariableValue(key, rawValue)
        : rawValue
      return { ...mapped, [key]: value }
    }, {})
  }

  /**
   * Checks if a given value is a variable.
   * @param value The value to check.
   * @returns {boolean} True if the value is a variable; false otherwise.
   */
  private isVariable(value: string): boolean {
    return value.startsWith(PLUGIN.symbol)
  }

  /**
   * Resolves the value of a variable.
   * @param key The CSS property key.
   * @param variable The variable to resolve.
   * @returns {string} The resolved value of the variable.
   */
  private resolveVariableValue(key: string, variable: string): string {
    const variableName = variable.slice(1) // Removes PLUGIN.symbol

    /**
     * Some CSS properties have different names in the tailwind.config.js file.
     * This method does the necessary conversion, returning the name of the corresponding
     * property in Tailwind that will be used to fetch the variable value.
     */
    const themeKey = getThemePropertyByCss(key)
    const variablePath = `${themeKey}.${variableName}`

    const resolvedValue = this.getTheme(variablePath) as
      | PropertyWithDefault
      | string

    if (!resolvedValue) {
      this.log.variableNotFound(variableName, key)
    }

    return typeof resolvedValue === 'string'
      ? resolvedValue
      : resolvedValue?.DEFAULT || ''
  }

  /**
   * Formats the class name, applying a prefix if specified.
   * @param name The base class name.
   * @returns {string} The formatted class name.
   */
  private formatClassName(name: string): string {
    return this.prefix ? `.${this.prefix}-${name}` : `.${name}`
  }
}
