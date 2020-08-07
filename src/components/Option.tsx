import React from 'react'
import { Option as OptionType } from '../types'
import styles from './styles.module.css'
import { Checkbox } from 'office-ui-fabric-react'

type OptionProps = {
  option: OptionType
  isChecked: boolean
  toggleOption: (isChecked: boolean) => void
}

export const Option = ({ option, isChecked, toggleOption }: OptionProps) => {
  return (
    <div className={'option' + ' ' + styles.option}>
      <Checkbox
        className='checkbox'
        checked={isChecked}
        onChange={(_, checked) => {
          toggleOption(checked || false)
        }}
      />
      <div className='option-label'>{option.label}</div>
    </div>
  )
}
