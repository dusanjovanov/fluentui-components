import React, { useState, useEffect } from 'react'
import { CheckboxDropdown, OptionType } from 'fluentui-components'
import faker from 'faker'
import { Checkbox } from 'office-ui-fabric-react'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const CheckboxDropdownExample = () => {
  const [value, setValue] = useState<OptionType[]>([])
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <div
      style={{
        paddingLeft: 20
      }}
    >
      <h1>Checkbox Dropdown</h1>
      <div style={{ display: 'flex' }}>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable(!isSearchable)}
          label='Is searchable'
          styles={{
            root: {
              marginRight: 5
            }
          }}
        />
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled(!isDisabled)}
          label='Is disabled'
        />
      </div>
      <br />
      <CheckboxDropdown
        value={value}
        onChange={(value) => setValue(value)}
        options={options}
        style={{
          width: 500
        }}
        label='People'
        searchPlaceholder='Search options...'
        isSearchable={isSearchable}
        disabled={isDisabled}
      />
    </div>
  )
}
