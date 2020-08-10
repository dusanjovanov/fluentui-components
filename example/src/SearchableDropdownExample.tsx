import React, { useState } from 'react'
import { SearchableDropdown, OptionType } from 'fluentui-components'
import faker from 'faker'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const SearchableDropdownExample = () => {
  const [value, setValue] = useState<OptionType | null>(null)

  return (
    <div
      style={{
        paddingLeft: 20
      }}
    >
      <h1>SearchableDropdown</h1>
      <SearchableDropdown
        value={value}
        onChange={(value) => setValue(value)}
        options={options}
        style={{
          width: 500
        }}
        searchPlaceholder='Search options...'
      />
    </div>
  )
}
