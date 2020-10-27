import faker from 'faker'
import { FluentReactSelect, Select } from 'fluentui-components'
import React, { useState, useEffect } from 'react'
import ReactSelect from 'react-select'
import styled from 'styled-components'
import { Checkbox } from 'office-ui-fabric-react'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const FluentReactSelectExample = () => {
  const [value, setValue] = useState<any>([])
  const [isMulti, setIsMulti] = useState(false)

  useEffect(() => {
    if (!isMulti) {
      setValue([])
    }
  }, [isMulti])

  return (
    <Root>
      <h1>Select</h1>
      <h2>With FluentReactSelect props</h2>
      <div style={{ display: 'flex' }}>
        <Checkbox
          checked={isMulti}
          onChange={() => setIsMulti(!isMulti)}
          label='Is multi'
          styles={{
            root: {
              marginRight: 5
            }
          }}
        />
      </div>
      <br />
      <SelectContainer>
        <ReactSelect
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
          isClearable
          isMulti={isMulti}
          {...FluentReactSelect}
        />
      </SelectContainer>
      <h2>Standalone component</h2>
      <SelectContainer>
        <Select
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
          isClearable
          isMulti={isMulti}
        />
      </SelectContainer>
    </Root>
  )
}

const Root = styled.div`
  /* padding-left: 20px; */
`
const SelectContainer = styled.div`
  width: 500px;
`
