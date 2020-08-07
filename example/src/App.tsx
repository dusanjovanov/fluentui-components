import React, { useState } from 'react'

import { CheckboxSelect, Option } from 'fabric-checkbox-select'
import 'fabric-checkbox-select/dist/index.css'
import faker from 'faker'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

const App = () => {
  const [value, setValue] = useState<Option[]>([])

  return (
    <CheckboxSelect
      value={value}
      onChange={(value) => setValue(value)}
      options={options}
      label='People'
      style={{
        width: 200
      }}
    />
  )
}

export default App
