import faker from 'faker'
import { FluentReactSelect } from 'fluentui-components'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
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
      <h1>Fluent React Select</h1>
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
        <Select
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
          isClearable
          isMulti={isMulti}
          {...FluentReactSelect}
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
