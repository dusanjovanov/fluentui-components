import React, { createContext, ReactNode } from 'react'
import tinycolor from 'tinycolor2'

export const FluentComponentsContext = createContext({} as ThemeExpanded)

export type Theme = {
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
  detailsList: {
    oddRow: {
      background: string
      text: string
    }
    evenRow: {
      background: string
      text: string
    }
    hoverRow: {
      background: string
      text: string
    }
  }
}

type Props = {
  children: ReactNode
  theme: Theme
}

window.tinycolor = tinycolor

export const FluentComponentsProvider = ({ children, theme }: Props) => {
  const tinyColorBackground = tinycolor(theme.background)
  const tinyColorPrimary = tinycolor(theme.primary)
  // const tinyColorText = tinycolor(theme.fabric.text)
  const hoverBackground = tinyColorBackground.isDark()
    ? tinyColorBackground.lighten(5).toHexString()
    : tinyColorBackground.darken(5).toHexString()

  const value: ThemeExpanded = {
    ...theme,
    hoverBackground,
    primaryDark: tinyColorPrimary.darken().toHexString(),
    detailsList: {
      evenRow: {
        background:
          theme.detailsList?.evenRow?.background || theme.background || '#fff',
        text: theme.detailsList?.evenRow?.text || theme.text || '#000'
      },
      oddRow: {
        background:
          theme.detailsList?.oddRow?.background || theme.background || '#fff',
        text: theme.detailsList?.oddRow?.text || theme.text || '#000'
      },
      hoverRow: {
        background:
          theme.detailsList?.hoverRow?.background || hoverBackground || '#fff',
        text: theme.detailsList?.hoverRow?.text || theme.text || '#000'
      }
    }
  }

  return (
    <FluentComponentsContext.Provider value={value}>
      {children}
    </FluentComponentsContext.Provider>
  )
}
