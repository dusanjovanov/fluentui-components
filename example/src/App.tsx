import { FluentComponentsProvider, Theme } from 'fluentui-components'
import { Toggle, Pivot, PivotItem } from 'office-ui-fabric-react'
import React, { useState } from 'react'
import { DetailsListExample } from './DetailsListExample'
import { FluentReactSelectAsyncExample } from './FluentReactSelectAsyncExample'
import { FluentReactSelectExample } from './FluentReactSelectExample'
import { InfiniteDetailsListExample } from './InfiniteDetailsListExample'

const lightTheme: Theme = {
  background: '#fff',
  primary: 'rebeccapurple',
  text: '#000',
  detailsList: {
    oddRow: {
      text: '#605e5c'
    },
    evenRow: {
      background: '#f3f9fd',
      text: '#605e5c'
    },
    hoverRow: {
      background: '#d0e7f8',
      text: '#605e5c'
    }
  }
}

const darkTheme: Theme = {
  background: '#333',
  primary: 'rebeccapurple',
  text: '#fff'
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <FluentComponentsProvider theme={theme}>
      <Toggle
        label='Dark mode'
        onChange={() => setIsDarkMode(!isDarkMode)}
        checked={isDarkMode}
      />
      <FluentReactSelectExample />
      <FluentReactSelectAsyncExample />
      <Pivot>
        <PivotItem headerText='Details List'>
          <DetailsListExample />
        </PivotItem>{' '}
        <PivotItem headerText='Infinite Details List'>
          <InfiniteDetailsListExample />
        </PivotItem>
      </Pivot>
    </FluentComponentsProvider>
  )
}

export default App
