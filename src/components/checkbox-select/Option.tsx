import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react'
import React from 'react'
import styled from 'styled-components'
import { OptionType } from './types'
import { StyledComponentProps } from '../../types'
import { ThemeExpanded } from '../../FluentComponentsContext'

type OptionProps = {
  option: OptionType
  isChecked: boolean
  toggleOption: (isChecked: boolean) => void
  checkboxStyles: Partial<ICheckboxStyles>
  fabricTheme: ThemeExpanded
}

export const Option = ({
  option,
  isChecked,
  toggleOption,
  checkboxStyles,
  fabricTheme
}: OptionProps) => {
  return (
    <Root className='option' fabricTheme={fabricTheme}>
      <Checkbox
        className='checkbox'
        checked={isChecked}
        onChange={(_, checked) => {
          toggleOption(checked || false)
        }}
        styles={checkboxStyles}
      />
      <Label className='label' fabricTheme={fabricTheme}>
        {option.label}
      </Label>
    </Root>
  )
}

const Root = styled.div<StyledComponentProps>`
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.fabricTheme.background};
  &:hover {
    background-color: ${(p) => p.fabricTheme.hoverBackground};
  }
`

const Label = styled.div<StyledComponentProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  width: 0;
  color: ${(p) => p.fabricTheme.text};
`
