import { CSSRuleObject, KeyValue } from './types'

export class TwStyleMerge {
  private css: CSSRuleObject = {}

  constructor() {}

  public createStyleClass(name: string) {
    this.css = {
      ...this.css,
      [name]: {},
    }
  }

  public defineStyleClass(className: string, value: Record<string, string>) {
    this.css[className] = value
  }

  public addAttributeToStyleClass(className: string, { key, value }: KeyValue) {
    this.css[className][key] = value
  }

  public getCSS() {
    return this.css
  }
}
