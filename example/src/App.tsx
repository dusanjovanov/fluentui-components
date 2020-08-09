import { FluentComponentsProvider } from 'fluentui-components'
import 'fluentui-components/dist/index.css'
import { Toggle } from 'office-ui-fabric-react'
import React, { useState } from 'react'
import { CheckboxSelectExample } from './CheckboxSelectExample'
import { DetailsListExample } from './DetailsListExample'

const lightTheme = { background: '#fff', primary: '#005aa1', text: '#000' }

const darkTheme = { background: '#333', primary: '#005aa1', text: '#fff' }

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
      <CheckboxSelectExample />
      <DetailsListExample />
    </FluentComponentsProvider>
  )
}

export default App
