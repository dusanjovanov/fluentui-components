# fabric-checkbox-select

> Checkbox select component for Fabric (Fluent) UI

[![NPM](https://img.shields.io/npm/v/fabric-checkbox-select.svg)](https://www.npmjs.com/package/fabric-checkbox-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fabric-checkbox-select
```

or

```bash
yarn add fabric-checkbox-select
```

## Usage

```tsx
import React, { useState } from 'react'
import { CheckboxSelect, Option } from 'fabric-checkbox-select'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' }
]

const App = () => {
  const [value, setValue] = useState<Option[]>([])

  return (
    <CheckboxSelect
      value={value}
      onChange={(value) => setValue(value)}
      options={options}
      label='Fruits'
      oneSelectedLabel='One selected'
      mulitpleSelectedLabel={`${value.length} fruits selected`}
    />
  )
}

export default App
```

## License

MIT © [dusanjovanov](https://github.com/dusanjovanov)
