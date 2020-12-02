import React from 'react'
import { mergeStyles } from 'react-select'
import FluentReactSelect from '../fluent-react-select'
import AsyncReactSelect, { Props as ReactSelectProps } from 'react-select/async'

type Props = ReactSelectProps<any> & {
  selectRef?: any
}

export const AsyncSelect = (props: Props) => {
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
    <AsyncReactSelect
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
      ref={props.selectRef}
    />
  )
}
