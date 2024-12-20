export function styleMerge(prefix = 'merge') {
  return ({ addUtilities, theme }: any) => {
    const themeStyles = theme('merge')
    const symbolStart = '$'

    const parseValue = (value: any, resolver: any) =>
      typeof value === 'string' && value.startsWith(symbolStart)
        ? resolver(value.slice(1))
        : value

    const resolveAttributes = (style: any) =>
      Object.fromEntries(
        Object.entries(style).map(([key, value]) => {
          const themeKey = key === 'color' ? 'colors' : key
          return [
            key,
            parseValue(value, (resolvedKey: any) =>
              theme(`${themeKey}.${resolvedKey}`)
            ),
          ]
        })
      )

    const generateStyles = (styles: any) =>
      Object.fromEntries(
        Object.entries(styles).map(([name, style]) => [
          `.${prefix}-${name}`,
          resolveAttributes(style),
        ])
      )

    addUtilities(generateStyles(themeStyles), ['responsive', 'hover'])
  }
}
