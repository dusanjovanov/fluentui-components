import React, { useState, useEffect, CSSProperties } from 'react'
import {
  SearchBox,
  Callout,
  DirectionalHint,
  DefaultButton,
  Checkbox
} from 'office-ui-fabric-react'
import { Option as OptionType } from '../types'
import { Option } from './Option'
import styles from './styles.module.css'

export type CheckboxSelectProps = {
  options: { value: any; label: string }[]
  value: OptionType[]
  onChange: (value: OptionType[]) => void
  label?: string
  oneSelectedLabel?: string
  mulitpleSelectedLabel?: string
  searchPlaceholder?: string
  className?: string
  style?: CSSProperties
}

export const CheckboxSelect = ({
  options,
  value,
  onChange,
  label = 'Select options',
  oneSelectedLabel,
  mulitpleSelectedLabel,
  searchPlaceholder,
  className,
  style
}: CheckboxSelectProps) => {
  const [search, setSearch] = useState('')
  const [shownOptions, setShownOptions] = useState(options)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    setShownOptions(
      options.filter((o) => {
        return o.label.toLowerCase().indexOf(search.toLowerCase()) !== -1
      })
    )
  }, [search, options])

  let buttonText = label

  if (value.length === 1) {
    buttonText = oneSelectedLabel || value[0].label
  }

  if (value.length > 1) {
    buttonText = mulitpleSelectedLabel || `${value.length} selected`
  }

  const areAllSelected = value.length === options.length

  return (
    <div className={className} style={style}>
      <DefaultButton
        className='button'
        iconProps={{
          iconName: 'ChevronDown',
          style: { fontSize: 12 }
        }}
        id='fabricCheckboxSelectButton'
        text={buttonText}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen)
        }}
        styles={{
          root: {
            width: '100%',
            paddingRight: 5
          },
          flexContainer: {
            flexDirection: 'row-reverse'
          },
          textContainer: {
            display: 'flex'
          },
          label: {
            overflow: 'hidden',
            flex: 1,
            width: 0,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }
        }}
      />
      <Callout
        className='dropdown'
        isBeakVisible={false}
        target={document.querySelector('#fabricCheckboxSelectButton')}
        directionalHint={DirectionalHint.bottomLeftEdge}
        styles={{
          calloutMain: {
            overflowY: 'hidden',
            width: document
              .querySelector('#fabricCheckboxSelectButton')
              ?.getBoundingClientRect().width,
            minWidth: 250
          }
        }}
        onDismiss={() => setIsDropdownOpen(false)}
        hidden={!isDropdownOpen}
      >
        <div className={'search-container' + ' ' + styles.searchContainer}>
          <div className={styles.selectAllContainer}>
            <Checkbox
              className='checkbox'
              checked={areAllSelected}
              onChange={() => {
                if (areAllSelected) {
                  onChange([])
                } else {
                  onChange([...options])
                }
              }}
            />
          </div>
          <SearchBox
            className='search'
            value={search}
            onChange={(_, value) => setSearch(value || '')}
            placeholder={searchPlaceholder || 'Search options...'}
            styles={{
              root: {
                flex: 1,
                border: 0
              }
            }}
          />
        </div>
        <div className={'options-container' + ' ' + styles.optionsContainer}>
          {shownOptions.map((o) => {
            const _isChecked = !!value.find((_o) => _o.value === o.value)
            return (
              <Option
                key={o.value}
                option={o}
                isChecked={_isChecked}
                toggleOption={() => {
                  if (_isChecked) {
                    onChange(value.filter((_o) => _o.value !== o.value))
                  } else {
                    onChange([...value, o])
                  }
                }}
              />
            )
          })}
        </div>
      </Callout>
    </div>
  )
}
