import faker from 'faker'
import { FluentReactSelect } from 'fluentui-components'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import styled from 'styled-components'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const FluentReactSelectAsyncExample = () => {
  const [value, setValue] = useState<any>([])

  return (
    <Root>
      <h1>Fluent React Select Async</h1>
      <SelectContainer>
        <AsyncSelect
          loadOptions={async (input) => {
            return await new Promise((r) => {
              setTimeout(() => {
                r(
                  options.filter((o) => {
                    return (
                      o.label.toLowerCase().indexOf(input.toLowerCase()) !== -1
                    )
                  })
                )
              }, 500)
            })
          }}
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
