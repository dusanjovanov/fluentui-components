import { Icon } from 'office-ui-fabric-react'
import React, { ReactNode } from 'react'
import { GridCellProps } from 'react-virtualized'
import styled from 'styled-components'
import { ThemeExpanded } from '../../FluentComponentsContext'
import { StyledComponentProps } from '../../types'
import { DetailsListColumn, DetailsListSortProp } from './types'

type Props = {
  cellProps: GridCellProps
  col: DetailsListColumn
  sort?: DetailsListSortProp
  isLoading: boolean
  onClick?: (col: DetailsListColumn) => void
  fabricTheme: ThemeExpanded
}

export const HeaderCell = ({
  cellProps,
  col,
  sort,
  isLoading,
  onClick,
  fabricTheme
}: Props) => {
  const { style, columnIndex } = cellProps

  let label: ReactNode = <Label fabricTheme={fabricTheme}>{col.label}</Label>

  if (col.renderLabel) {
    label = col.renderLabel({ col, colIndex: columnIndex })
  }

  let headerContent

  let align = 'flex-start'
  if (col.align) align = col.align
  if (col.align === 'right') align = 'flex-end'

  if (col.renderHeader) {
    headerContent = col.renderHeader({ col, colIndex: columnIndex })
  }
  //
  else {
    headerContent = (
      <DefaultCell style={{ justifyContent: align }}>
        {sort && col.isSortable && (
          <StyledIcon
            iconName={
              sort.key === col.key
                ? sort.dir === 'asc'
                  ? 'SortUp'
                  : 'SortDown'
                : 'Sort'
            }
          />
        )}
        {label}
      </DefaultCell>
    )
  }

  return (
    <Root
      fabricTheme={fabricTheme}
      style={{
        ...style,
        cursor: isLoading ? 'wait' : 'pointer'
      }}
      onClick={() => {
        onClick && onClick(col)
      }}
      className='header-cell'
      data-columnindex={columnIndex}
      data-columnkey={col.key}
      data-issortable={col.isSortable === undefined ? 'false' : col.isSortable}
    >
      {headerContent}
    </Root>
  )
}

const Root = styled.div<StyledComponentProps>`
  font-size: 14px;
  height: 100%;
  font-weight: 600;
  border-top: 1px solid rgb(237, 235, 233);
  border-bottom: 1px solid rgb(237, 235, 233);
  user-select: none;
  background-color: ${(p) => p.fabricTheme.background};
  color: ${(p) => p.fabricTheme.text};
  box-sizing: border-box;
  &:hover {
    background-color: ${(p) => p.fabricTheme.hoverBackground};
  }
  &:focus {
    outline: none;
  }
`

const DefaultCell = styled.div`
  padding: 0 12px 0 12px;
  display: flex;
  align-items: center;
  height: 100%;
`

const Label = styled.div<StyledComponentProps>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(p) => p.fabricTheme.text};
`

const StyledIcon = styled(Icon)`
  margin-right: 5px;
`
