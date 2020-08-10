import React from 'react'
import styled from 'styled-components'
import { ThemeExpanded } from '../../FluentComponentsContext'
import { StyledComponentProps, OptionType } from '../../types'

type OptionProps = {
  option: OptionType
  onClick: () => void
  fabricTheme: ThemeExpanded
}

export const Option = ({ option, fabricTheme, onClick }: OptionProps) => {
  return (
    <Root
      className='option'
      fabricTheme={fabricTheme}
      onClick={onClick}
      tabIndex={0}
    >
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
