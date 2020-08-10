import styled from 'styled-components'
import { Icon, Spinner, SpinnerSize } from 'office-ui-fabric-react'
import { Styles, Theme } from 'react-select'
import React from 'react'
import { SelectComponents } from 'react-select/src/components'
import { useFluentTheme } from '../..'
import { StyledComponentProps } from '../../types'

const ChevronIcon = styled(Icon)<StyledComponentProps>`
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  font-family: FabricMDL2Icons;
  color: ${(p) => p.fabricTheme.select.icon};
  font-size: 12px;
  pointer-events: none;
  margin: 0px 10px;
`

const ClearIcon = styled.div<StyledComponentProps>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  i {
    font-size: 11px;
    color: ${(p) => p.fabricTheme.select.icon};
  }
`

export const useFluentReactSelect = () => {
  const fluentTheme = useFluentTheme()

  const theme = (theme: Theme) => {
    return {
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary50: '#f2f2f2',
        primary25: '#f2f2f2',
        primary: '#edebe9',
        neutral30: '#323130',
        neutral20: '#8a8886'
      }
    }
  }

  const components: Partial<SelectComponents<any>> = {
    DropdownIndicator: () => (
      <ChevronIcon fabricTheme={fluentTheme} iconName='ChevronDown' />
    ),
    ClearIndicator: ({ innerProps }: { innerProps: any }) => {
      return (
        <ClearIcon fabricTheme={fluentTheme}>
          <Icon {...innerProps} iconName='ChromeClose' />
        </ClearIcon>
      )
    },
    LoadingIndicator: () => {
      return (
        <Spinner
          size={SpinnerSize.medium}
          styles={{ root: { marginRight: 9 } }}
        />
      )
    }
  }
  const styles: Partial<Styles> = {
    container: (p) => {
      return {
        ...p,
        height: 32
      }
    },
    control: (p, s) => {
      return {
        ...p,
        borderColor: '#605e5c',
        height: 32,
        minHeight: 32,
        boxShadow: 'none',
        backgroundColor: fluentTheme.background,
        outline:
          s.isFocused && !s.menuIsOpen
            ? `1px solid ${fluentTheme.primary}`
            : 'none',
        '&:hover': {
          borderColor: '#605e5c'
        }
      }
    },
    placeholder: (p) => ({
      ...p,
      fontSize: 14
    }),
    valueContainer: (p) => ({
      ...p,
      height: 30,
      padding: '0 8px'
    }),
    menu: (p) => {
      return {
        ...p,
        marginTop: 0,
        border: 0,
        boxShadow:
          'rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px'
      }
    },
    menuList: (p) => {
      return {
        ...p,
        padding: 0,
        border: 0
      }
    },
    indicatorSeparator: (p) => {
      return {
        ...p,
        backgroundColor: '#888',
        width: 0.8
      }
    },
    singleValue: (p) => {
      return {
        ...p,
        fontSize: 14,
        color: fluentTheme.text
      }
    },
    option: (p) => {
      return {
        ...p,
        color: fluentTheme.text,
        fontSize: 14,
        backgroundColor: fluentTheme.background,
        '&:hover': {
          backgroundColor: fluentTheme.hoverBackground
        }
      }
    },
    input: (p) => {
      return {
        ...p,
        color: fluentTheme.text,
        fontSize: 14
      }
    },
    noOptionsMessage: (p) => {
      return {
        ...p,
        fontSize: 14,
        backgroundColor: fluentTheme.background
      }
    },
    loadingMessage: (p) => {
      return {
        ...p,
        fontSize: 14,
        backgroundColor: fluentTheme.background
      }
    }
  }

  return { styles, theme, components }
}