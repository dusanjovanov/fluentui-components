import React from 'react'
import ReactSelect, { mergeStyles, Props } from 'react-select'
import FluentReactSelect from '../fluent-react-select'

export const Select = (
  props: Props<{ label: string; value: any; [key: string]: any }>
) => {
  let mergedStyles = FluentReactSelect.styles

  if (props.styles) {
    mergedStyles = mergeStyles(FluentReactSelect.styles, props.styles)
  }

  let mergedComponents = FluentReactSelect.components

  if (props.components) {
    mergedComponents = {
      ...mergedComponents,
      ...props.components
    }
  }

  return (
    <ReactSelect
      {...props}
      {...FluentReactSelect}
      styles={mergedStyles}
      theme={(theme) => {
        let mergedTheme = FluentReactSelect.theme(theme)
        if (props.theme) {
          if (typeof props.theme === 'function') {
            mergedTheme = {
              ...mergedTheme,
              ...props.theme(theme)
            }
          }
          //
          else {
            mergedTheme = {
              ...mergedTheme,
              ...props.theme
            }
          }
        }
        return mergedTheme
      }}
      components={mergedComponents}
    />
  )
}
