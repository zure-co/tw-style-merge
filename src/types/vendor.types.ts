import { CSSProperties } from 'react'

/**
 * List of attributes shared between ThemeConfig and CSSProperties.
 */
type SharedProperties = Pick<
  CSSProperties,
  | 'width'
  | 'height'
  | 'maxWidth'
  | 'maxHeight'
  | 'minWidth'
  | 'minHeight'
  | 'margin'
  | 'padding'
  | 'gap'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'color'
  | 'textDecorationColor'
  | 'textDecorationThickness'
  | 'textUnderlineOffset'
  | 'backgroundColor'
  | 'borderColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'opacity'
  | 'boxShadow'
  | 'transformOrigin'
  | 'zIndex'
  | 'animation'
  | 'transitionProperty'
  | 'transitionTimingFunction'
  | 'transitionDuration'
  | 'transitionDelay'
>

export interface ThemeCSSProperties extends SharedProperties {}
