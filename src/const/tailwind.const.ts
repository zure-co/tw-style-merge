type ThemeMapping = {
  [key: string]: string | string[]
}

/**
 * Maps Tailwind theme keys to corresponding CSS properties.
 * This mapping is used to convert a CSS property into a Tailwind-compatible theme key.
 */
export const themeMappings: ThemeMapping = {
  colors: 'color',
  spacing: [
    'padding',
    'margin',
    'width',
    'height',
    'maxWidth',
    'maxHeight',
    'minWidth',
    'minHeight',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
  ],
  gap: 'gap',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  borderRadius: 'borderRadius',
  boxShadow: 'boxShadow',
  opacity: 'opacity',
  zIndex: 'zIndex',
  lineHeight: 'lineHeight',
  letterSpacing: 'letterSpacing',
  transitionDuration: 'transitionDuration',
  textDecorationColor: 'textDecorationColor',
  textDecorationThickness: 'textDecorationThickness',
  textUnderlineOffset: 'textUnderlineOffset',
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor',
  borderWidth: 'borderWidth',
  transformOrigin: 'transformOrigin',
  animation: 'animation',
  transitionProperty: 'transitionProperty',
  transitionTimingFunction: 'transitionTimingFunction',
  transitionDelay: 'transitionDelay',
}
