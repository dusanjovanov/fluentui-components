import React from 'react'
import styled from 'styled-components'
import { OptionType } from '../../types'

type OptionProps = {
  option: OptionType
  onClick: () => void
}

export const Option = ({ option, onClick }: OptionProps) => {
  return (
    <Root className='option' onClick={onClick} tabIndex={0}>
      <Label className='label'>{option.label}</Label>
    </Root>
  )
}

const Root = styled.div`
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f2f2f2;
  }
`

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  width: 0;
`
