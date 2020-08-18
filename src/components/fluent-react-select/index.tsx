import { Icon, Spinner, SpinnerSize } from 'office-ui-fabric-react'
import React from 'react'
import { Props, Theme } from 'react-select'
import styled from 'styled-components'

const ChevronIcon = styled(Icon)`
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  font-family: FabricMDL2Icons;
  color: #605e5c;
  font-size: 12px;
  pointer-events: none;
  margin: 0px 10px;
`

const ClearIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  i {
    font-size: 11px;
    color: #ababab;
  }
`

const theme: Props['theme'] = (theme) => {
  return {
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary50: '#f2f2f2',
      primary25: '#f3f2f1',
      primary: '#edebe9',
      neutral30: '#323130',
      neutral20: '#8a8886'
    }
  }
}

const components: Props['components'] = {
  DropdownIndicator: () => <ChevronIcon iconName='ChevronDown' />,
  ClearIndicator: ({ innerProps }: { innerProps: any }) => {
    return (
      <ClearIcon>
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
const styles: Props['styles'] = {
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
      outline: s.isFocused && !s.menuIsOpen ? `2px solid #0078d4` : 'none',
      outlineOffset: -1,
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
      backgroundColor: '#ccc',
      width: 0.8
    }
  },
  singleValue: (p) => {
    return {
      ...p,
      fontSize: 14
    }
  },
  option: (p) => {
    return {
      ...p,
      fontSize: 14,
      color: '#323130',
      '&:hover': {
        backgroundColor: '#f3f2f1'
      }
    }
  },
  input: (p) => {
    return {
      ...p,
      fontSize: 14
    }
  },
  noOptionsMessage: (p) => {
    return {
      ...p,
      fontSize: 14
    }
  },
  loadingMessage: (p) => {
    return {
      ...p,
      fontSize: 14
    }
  }
}

export default { styles, theme, components }
