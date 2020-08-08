import React, { createContext, ReactNode, useEffect } from 'react'
import tinycolor from 'tinycolor2'
import { ThemeProvider } from 'styled-components'
import { loadTheme } from 'office-ui-fabric-react'
// import { loadTheme } from 'office-ui-fabric-react'

export const FluentComponentsContext = createContext({} as ThemeExpanded)

type Theme = { background: string; primary: string; textColor: string }

export type ThemeExpanded = Theme & {
  hoverBackground: string
  primaryDark: string
  primaryLight: string
  textColorLight: string
  detailsListOddBackground: string
}

type Props = {
  children: ReactNode
  theme: Theme
}

window.tinycolor = tinycolor

export const FluentComponentsProvider = ({ children, theme }: Props) => {
  const tinyColorBackground = tinycolor(theme.background)
  const tinyColorPrimary = tinycolor(theme.primary)
  const tinyColorText = tinycolor(theme.textColor)

  const value: ThemeExpanded = {
    ...theme,
    hoverBackground: tinyColorBackground.isDark()
      ? tinyColorBackground.lighten().toHexString()
      : tinyColorBackground.darken().toHexString(),
    primaryDark: tinyColorPrimary.darken().toHexString(),
    primaryLight: tinyColorPrimary.lighten(40).toHexString(),
    textColorLight: tinyColorText.lighten().toHexString(),
    detailsListOddBackground: tinyColorBackground.lighten(5).toHexString()
  }

  useEffect(() => {
    loadTheme({
      palette: {
        themePrimary: value.primary,
        themeDark: tinyColorPrimary.darken(1).toHexString()
        // neutralPrimary: 'white',
        // neutralDark: 'red',
        // neutralLight: 'yellow'
      }
    })
  }, [value])

  return (
    <FluentComponentsContext.Provider value={value}>
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </FluentComponentsContext.Provider>
  )
}
