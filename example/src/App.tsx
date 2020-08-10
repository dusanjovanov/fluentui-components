import { FluentComponentsProvider, Theme } from 'fluentui-components'
import 'fluentui-components/dist/index.css'
import { Toggle } from 'office-ui-fabric-react'
import React, { useState } from 'react'
import { CheckboxDropdownExample } from './CheckboxDropdownExample'
import { DetailsListExample } from './DetailsListExample'
import { SearchableDropdownExample } from './SearchableDropdownExample'

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
      <CheckboxDropdownExample />
      <SearchableDropdownExample />
      <DetailsListExample />
    </FluentComponentsProvider>
  )
}

export default App
