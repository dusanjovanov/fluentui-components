import clsx from 'clsx'
import { Icon } from 'office-ui-fabric-react'
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { GridCellRenderer, MultiGrid } from 'react-virtualized'
import styled from 'styled-components'
import {
  DetailsListColumn,
  DetailsListProps,
  DetailsListHoverState
} from './types'

type Props = {
  cols: DetailsListColumn[]
  rows: any[]
  sort: DetailsListProps['sort']
  onClickHeader: DetailsListProps['onClickHeader']
  onClickCell: DetailsListProps['onClickCell']
  refGrid: React.MutableRefObject<MultiGrid | null | undefined>
}

export const useCellRenderer = ({
  cols,
  rows,
  sort,
  onClickHeader,
  onClickCell,
  refGrid
}: Props) => {
  const [hover, setHover] = useState<DetailsListHoverState>({
    col: null,
    row: null,
    rowIndex: null,
    colIndex: null
  })

  useEffect(() => {
    refGrid.current?.recomputeGridSize()
  }, [hover])

  const cellRenderer: GridCellRenderer = (gridCellProps) => {
    const { columnIndex, rowIndex, key, style } = gridCellProps
    const col = cols[columnIndex]
    const row = rows[rowIndex - 1]
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

    if (rowIndex === 0) {
      return (
        <HeaderCell
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
          data-issortable={
            col.isSortable === undefined ? 'false' : col.isSortable
          }
          justifyContent={align}
        >
          {headerContent}
        </HeaderCell>
      )
    } else {
      const customCellProps = {
        col,
        row,
        colIndex: columnIndex,
        rowIndex: rowIndex - 1
      }

      const truncateProps = col.truncateProps
        ? col.truncateProps(customCellProps)
        : undefined

      let toRender: ReactNode = (
        <Truncate {...truncateProps}>{row[col.key]}</Truncate>
      )

      if (col.render) {
        const customRender = col.render(customCellProps)
        toRender = customRender
      } else if (col.transform) {
        toRender = (
          <Truncate {...truncateProps}>
            {col.transform(customCellProps)}
          </Truncate>
        )
      }

      const className = clsx('cell', {
        odd: (rowIndex - 1) % 2 !== 0,
        even: (rowIndex - 1) % 2 === 0,
        hover: hover.rowIndex === rowIndex,
        ['default-render']: !col.render
      })

      const cellProps = col.cellProps
        ? col.cellProps(customCellProps)
        : undefined

      return (
        <Cell
          {...cellProps}
          key={key}
          style={style}
          className={className}
          data-columnindex={columnIndex}
          data-rowindex={rowIndex}
          data-columnkey={col.key}
          onMouseEnter={() => {
            setHover({ col, row, colIndex: columnIndex, rowIndex })
          }}
          onMouseLeave={() => {
            setHover({ col: null, row: null, colIndex: null, rowIndex: null })
          }}
          onClick={() =>
            onClickCell &&
            onClickCell({ col, row, colIndex: columnIndex, rowIndex })
          }
          justifyContent={align}
        >
          {toRender}
        </Cell>
      )
    }
  }

  return cellRenderer
}

const Cell = styled.div<{ justifyContent: string }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  border-bottom: 1px solid #f3f2f1;
  box-sizing: border-box;
  &.hover {
    background-color: #f3f2f1;
  }
  &.default-render {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    justify-content: ${(p) => p.justifyContent};
  }
`

const HeaderCell = styled.div<{ justifyContent: string }>`
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

const Truncate = styled.div.attrs({ className: 'truncate' })`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
