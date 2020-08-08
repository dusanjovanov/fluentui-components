import React, { useState } from 'react'
import { CheckboxSelect, OptionType } from 'fluentui-components'
import faker from 'faker'
import styled from 'styled-components'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const CheckboxSelectExample = () => {
  const [value, setValue] = useState<OptionType[]>([])

  return (
    <Root>
      <h1>CheckboxSelect</h1>
      <CheckboxSelect
        value={value}
        onChange={(value) => setValue(value)}
        options={options}
        label='People'
        style={{
          width: 150,
          marginLeft: 20
        }}
      />
    </Root>
  )
}

const Root = styled.div`
  /* padding-left: 20px; */
`
