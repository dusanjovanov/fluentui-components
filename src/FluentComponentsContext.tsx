import React, { createContext, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import tinycolor from 'tinycolor2'

export const FluentComponentsContext = createContext({} as ThemeExpanded)

type Theme = {
  background?: string
  primary?: string
  text?: string
  detailsList?: {
    oddRow?: {
      background?: string
      text?: string
    }
    evenRow?: {
      background?: string
      text?: string
    }
    hoverRow?: {
      background?: string
      text?: string
    }
  }
}

export type ThemeExpanded = Theme & {
  hoverBackground: string
  primaryDark: string
  // textLight: string
}

type Props = {
  children: ReactNode
  theme: Theme
}

window.tinycolor = tinycolor

export const FluentComponentsProvider = ({ children, theme }: Props) => {
  const tinyColorBackground = tinycolor(theme.background)
  const tinyColorPrimary = tinycolor(theme.primary)
  // const tinyColorText = tinycolor(theme.text)
  const hoverBackground = tinyColorBackground.isDark()
    ? tinyColorBackground.lighten().toHexString()
    : tinyColorBackground.darken().toHexString()

  const value: ThemeExpanded = {
    ...theme,
    hoverBackground,
    primaryDark: tinyColorPrimary.darken().toHexString(),
    detailsList: {
      evenRow: {
        background: theme.detailsList?.evenRow?.background || theme.background,
        text: theme.detailsList?.evenRow?.text || theme.text
      },
      oddRow: {
        background: theme.detailsList?.oddRow?.background || theme.background,
        text: theme.detailsList?.oddRow?.text || theme.text
      },
      hoverRow: {
        background: theme.detailsList?.hoverRow?.background || hoverBackground,
        text: theme.detailsList?.hoverRow?.text || theme.text
      }
    }
  }

  return (
    <FluentComponentsContext.Provider value={value}>
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </FluentComponentsContext.Provider>
  )
}
