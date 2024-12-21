export type CSSRuleObject = {
  [key: string]: Record<string, string>
}

export type KeyValue = {
  key: string
  value: string
}

export type Node = Record<string, Record<string, string>>
export type Property = [string, string]
export type PropertyWithDefault = {
  DEFAULT?: string
}
