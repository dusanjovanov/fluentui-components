import {
  Callout,
  Checkbox,
  DefaultButton,
  DirectionalHint,
  SearchBox
} from 'office-ui-fabric-react'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FluentComponentsContext } from '../../FluentComponentsContext'
import { Option } from './Option'
import { getCheckboxStyles } from './styles'
import { OptionType } from './types'

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
  const theme = useContext(FluentComponentsContext)

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
            paddingRight: 5,
            background: theme.background,
            color: theme.text
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
          },
          rootChecked: {
            backgroundColor: theme.hoverBackground,
            color: theme.text
          },
          rootFocused: {
            backgroundColor: theme.hoverBackground,
            color: theme.text
          },
          rootHovered: {
            backgroundColor: theme.hoverBackground,
            color: theme.text
          },
          rootPressed: {
            backgroundColor: theme.hoverBackground,
            color: theme.text
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
        <SearchContainer className='search-container'>
          <SelectAllContainer>
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
              styles={getCheckboxStyles(theme)}
            />
          </SelectAllContainer>
          <SearchBox
            className='search'
            value={search}
            onChange={(_, value) => setSearch(value || '')}
            placeholder={searchPlaceholder || 'Search options...'}
            styles={{
              root: {
                flex: 1,
                border: 0,
                backgroundColor: theme.background
              },
              field: {
                color: theme.text,
                selectors: {
                  '&::-webkit-input-placeholder': {
                    color: theme.text
                  }
                }
              },
              icon: {
                color: theme.primary
              },
              clearButton: {
                selectors: {
                  '&:hover .ms-Button': {
                    backgroundColor: theme.hoverBackground
                  },
                  '&:hover .ms-Button-icon': {
                    color: theme.text
                  },
                  '.ms-Button-icon': {
                    color: theme.text
                  }
                }
              }
            }}
          />
        </SearchContainer>
        <OptionsContainer className='options-container'>
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
                checkboxStyles={getCheckboxStyles(theme)}
              />
            )
          })}
        </OptionsContainer>
      </Callout>
    </div>
  )
}

export const OptionsContainer = styled.div`
  overflow-y: auto;
  max-height: 300px;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #8a8886;
  background-color: ${(p) => p.theme.background};
`

export const SelectAllContainer = styled.div`
  padding-left: 8px;
`
