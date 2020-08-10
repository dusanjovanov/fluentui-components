import {
  Callout,
  DirectionalHint,
  IconButton,
  ITextField,
  TextField
} from 'office-ui-fabric-react'
import React, {
  CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import { FluentComponentsContext } from '../../FluentComponentsContext'
import { OptionType } from '../../types'
import { Option } from './Option'

export type CheckboxDropdownProps = {
  options: { value: any; label: string }[]
  value: OptionType | null
  onChange: (value: OptionType | null) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  style?: CSSProperties
}

export const SearchableDropdown = ({
  options,
  value,
  onChange,
  searchPlaceholder,
  className,
  style
}: CheckboxDropdownProps) => {
  const [search, setSearch] = useState('')
  const [shownOptions, setShownOptions] = useState(options)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const theme = useContext(FluentComponentsContext)
  const refTextField = useRef<ITextField>(null)

  useEffect(() => {
    setShownOptions(
      options.filter((o) => {
        return o.label.toLowerCase().indexOf(search.toLowerCase()) !== -1
      })
    )
  }, [search, options])

  useEffect(() => {
    if (!isDropdownOpen) {
      setSearch('')
    }
  }, [isDropdownOpen])

  const textFieldValue = isDropdownOpen ? search : value?.label || ''
  const textFieldPlaceholder = value ? value?.label : searchPlaceholder

  return (
    <div className={className} style={style}>
      <SearchContainer id='fabricSearchableDropdownTextField'>
        <TextField
          value={textFieldValue}
          placeholder={textFieldPlaceholder}
          onFocus={() => {
            setIsDropdownOpen(true)
          }}
          onChange={(_, value) => setSearch(value || '')}
          onRenderSuffix={() => {
            return (
              <div>
                {value && (
                  <IconButton
                    tabIndex={-1}
                    iconProps={{ iconName: 'Cancel' }}
                    styles={{
                      root: {
                        color: '#605e5c',
                        paddingRight: 0
                      },
                      rootHovered: {
                        backgroundColor: 'transparent',
                        color: '#605e5c'
                      },
                      rootPressed: {
                        backgroundColor: 'transparent',
                        color: '#605e5c'
                      }
                    }}
                    onClick={() => {
                      onChange(null)
                      setSearch('')
                    }}
                  />
                )}
                <IconButton
                  tabIndex={-1}
                  iconProps={{ iconName: 'ChevronDown' }}
                  styles={{
                    root: {
                      color: '#605e5c'
                    },
                    rootHovered: {
                      backgroundColor: 'transparent',
                      color: '#605e5c'
                    },
                    rootPressed: {
                      backgroundColor: 'transparent',
                      color: '#605e5c'
                    }
                  }}
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                />
              </div>
            )
          }}
          styles={{
            root: {
              width: '100%'
            },
            icon: {
              fonSize: 12
            },
            suffix: {
              paddingRight: 0,
              backgroundColor: 'transparent',
              selectors: {
                '& i': {
                  fontSize: 12
                }
              }
            }
          }}
          componentRef={refTextField}
        />
      </SearchContainer>
      <Callout
        className='dropdown'
        isBeakVisible={false}
        target={document.querySelector('#fabricSearchableDropdownTextField')}
        directionalHint={DirectionalHint.bottomLeftEdge}
        styles={{
          root: {
            marginTop: 5
          },
          calloutMain: {
            overflowY: 'hidden',
            width: document
              .querySelector('#fabricSearchableDropdownTextField')
              ?.getBoundingClientRect().width,
            minWidth: 250
          }
        }}
        onDismiss={() => {
          setIsDropdownOpen(false)
        }}
        hidden={!isDropdownOpen}
      >
        <OptionsContainer className='options-container'>
          {shownOptions.map((o) => {
            return (
              <Option
                key={o.value}
                option={o}
                onClick={() => {
                  onChange(o)
                  setIsDropdownOpen(false)
                }}
                fabricTheme={theme}
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
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const SelectAllContainer = styled.div`
  padding-left: 8px;
`
