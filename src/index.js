module.exports = function StyleMerge(prefix = 'merge') {
    return ({ addUtilities, theme }) => {
      const themeStyles = theme('merge');
      const symbolStart = '$';
  
      const parseValue = (value, resolver) =>
        typeof value === 'string' && value.startsWith(symbolStart)
          ? resolver(value.slice(1))
          : value;
  
      const resolveAttributes = (style) =>
        Object.fromEntries(
          Object.entries(style).map(([key, value]) => {
            const themeKey = key === 'color' ? 'colors' : key;
            return [
              key,
              parseValue(value, (resolvedKey) =>
                theme(`${themeKey}.${resolvedKey}`)
              ),
            ];
          })
        );
  
      const generateStyles = (styles) =>
        Object.fromEntries(
          Object.entries(styles).map(([name, style]) => [
            `.${prefix}-${name}`,
            resolveAttributes(style),
          ])
        );
  
      addUtilities(generateStyles(themeStyles), ['responsive', 'hover']);
    };
  };