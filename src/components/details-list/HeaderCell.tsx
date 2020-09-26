import clsx from 'clsx'
import { Icon } from 'office-ui-fabric-react'
import React, { Fragment, ReactNode } from 'react'
import { GridCellProps } from 'react-virtualized'
import styled from 'styled-components'
import { ResizeHandle } from './ResizeHandle'
import { DetailsListColumn, DetailsListProps } from './types'

type Props = {
  col: DetailsListColumn
  sort: DetailsListProps['sort']
  onClickHeader: DetailsListProps['onClickHeader']
  columnIndex: number
  gridCellProps: GridCellProps
  onResizeCol: DetailsListProps['onResizeCol']
}

export const HeaderCell = ({
  col,
  sort,
  onClickHeader,
  columnIndex,
  gridCellProps,
  onResizeCol
}: Props) => {
  const { style, key } = gridCellProps

  const isSortable = sort && col.isSortable

  let label: ReactNode

  if (col.renderLabel) {
    label = col.renderLabel({ col, colIndex: columnIndex })
  }
  //
  else {
    label =
      col.label.length > 0 ? (
        <Label className={clsx({ isSortable })}>{col.label}</Label>
      ) : null
  }

  let headerContent

  if (col.renderHeader) {
    headerContent = col.renderHeader({ col, colIndex: columnIndex })
  }
  //
  else {
    headerContent = (
      <Fragment>
        {isSortable && (
          <Icon
            iconName={
              sort!.key === col.key
                ? sort!.dir === 'asc'
                  ? 'SortUp'
                  : 'SortDown'
                : 'Sort'
            }
          />
        )}
        {label}
      </Fragment>
    )
  }

  let align = 'flex-start'
  if (col.align) align = col.align
  if (col.align === 'right') align = 'flex-end'

  return (
    <Root
      key={key}
      style={style}
      onClick={() => {
        onClickHeader && onClickHeader({ col, colIndex: columnIndex })
      }}
      className={clsx('header-cell', {
        ['default-render']: !col.renderHeader
      })}
      data-columnindex={columnIndex}
      data-columnkey={col.key}
      data-issortable={col.isSortable === undefined ? 'false' : col.isSortable}
      justifyContent={align}
    >
      {headerContent}
      {onResizeCol && <ResizeHandle col={col} colIndex={columnIndex} />}
    </Root>
  )
}

const Root = styled.div<{ justifyContent: string }>`
  font-size: 14px;
  height: 100%;
  font-weight: 600;
  border-top: 1px solid rgb(237, 235, 233);
  border-bottom: 1px solid rgb(237, 235, 233);
  user-select: none;
  box-sizing: border-box;
  &.default-render {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    justify-content: ${(p) => p.justifyContent};
  }
  &:hover {
    background-color: #f3f2f1;
  }
  &:focus {
    outline: none;
  }
  &.isDragging {
    /* background: #dff6dd; */
    border-top: 1px solid green;
    border-bottom: 1px solid green;
  }
  &.isResized {
    border-top: 1px solid #0078d4;
    border-bottom: 1px solid #0078d4;
    background-color: #0078d4;
  }
`

const Label = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 0;
  &.isSortable {
    padding-left: 5px;
  }
`
