import { FluentComponentsProvider } from 'fluentui-components'
import 'fluentui-components/dist/index.css'
import React, { useState } from 'react'
import { DetailsListExample } from './DetailsListExample'
import { CheckboxSelectExample } from './CheckboxSelectExample'
import { Toggle } from 'office-ui-fabric-react'

const lightTheme = { background: '#fff', primary: '#005aa1', textColor: '#000' }

const darkTheme = { background: '#333', primary: '#005aa1', textColor: '#fff' }

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <FluentComponentsProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
