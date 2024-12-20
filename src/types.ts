export type CSSRuleObject = {
  [key: string]: Record<string, string>
}

export type KeyValue = {
  key: string
  value: string
}

export type Node = Record<string, Record<string, string>>
export type Attribute = [string, string]
export type AttributeWithDefault = {
  DEFAULT?: string
}
