import { PluginAPI } from 'tailwindcss/types/config'

export function StyleMerge(prefix: string = 'merge') {
  return ({ addUtilities, theme }: PluginAPI) => {
    const STYLE_MERGE_THEME = theme('merge') as Record<
      string,
      Record<string, string>
    >

    const parseValue = (
      value: string | any,
      resolver: (key: string) => string | undefined
    ): any =>
      typeof value === 'string' && value.startsWith('$')
        ? resolver(value.slice(1))
        : value

    const resolveAttributes = (
      style: Record<string, any>
    ): Record<string, any> =>
      Object.fromEntries(
        Object.entries(style).map(([key, value]) => {
          const themeKey = key === 'color' ? 'colors' : key
          return [
            key,
            parseValue(value, (resolvedKey: string) =>
              theme(`${themeKey}.${resolvedKey}`)
            ),
          ]
        })
      )

    const generateStyles = (
      styles: Record<string, Record<string, any>>
    ): Record<string, Record<string, any>> =>
      Object.fromEntries(
        Object.entries(styles).map(([name, style]) => [
          `.${prefix}-${name}`,
          resolveAttributes(style),
        ])
      )

    addUtilities(generateStyles(STYLE_MERGE_THEME))
  }
}
