import faker from 'faker'
import { FluentReactSelect } from 'fluentui-components'
import React, { useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const FluentReactSelectExample = () => {
  const [value, setValue] = useState<any>([])

  return (
    <Root>
      <h1>Fluent React Select</h1>
      <SelectContainer>
        <Select
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
          isClearable
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
