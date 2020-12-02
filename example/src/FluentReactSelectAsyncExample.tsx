import faker from 'faker'
import { FluentReactSelect, AsyncSelect } from 'fluentui-components'
import React, { useRef, useState } from 'react'
import ReactAsyncSelect from 'react-select/async'
import styled from 'styled-components'

const options = Array(100)
  .fill(0)
  .map(() => ({
    label: faker.name.firstName() + ' ' + faker.name.lastName(),
    value: faker.random.uuid()
  }))

export const FluentReactSelectAsyncExample = () => {
  const [value, setValue] = useState<any>([])
  const selectRef = useRef<ReactAsyncSelect<any>>()

  return (
    <Root>
      <h1>Async select</h1>
      <h2>With FluentReactSelect props</h2>
      <SelectContainer>
        <ReactAsyncSelect
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
      <h2>Standalone component</h2>
      <button
        onClick={() => {
          if (selectRef.current) {
            selectRef.current!.focus()
          }
        }}
      >
        Focus
      </button>
      <br /> <br />
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
          selectRef={selectRef}
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
