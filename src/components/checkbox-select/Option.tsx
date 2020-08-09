import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react'
import React from 'react'
import styled from 'styled-components'
import { OptionType } from './types'

type OptionProps = {
  option: OptionType
  isChecked: boolean
  toggleOption: (isChecked: boolean) => void
  checkboxStyles: Partial<ICheckboxStyles>
}

export const Option = ({
  option,
  isChecked,
  toggleOption,
  checkboxStyles
}: OptionProps) => {
  return (
    <Root className='option'>
      <Checkbox
        className='checkbox'
        checked={isChecked}
        onChange={(_, checked) => {
          toggleOption(checked || false)
        }}
        styles={checkboxStyles}
      />
      <Label className='option-label'>{option.label}</Label>
    </Root>
  )
}

const Root = styled.div`
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.background};
  &:hover {
    background-color: ${(p) => p.theme.hoverBackground};
  }
`

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  width: 0;
  color: ${(p) => p.theme.text};
`
