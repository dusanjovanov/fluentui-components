import clsx from 'clsx'
import { Icon } from 'office-ui-fabric-react'
import React, { ReactNode, useEffect, useState } from 'react'
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

  const cellRenderer: GridCellRenderer = (cellProps) => {
    const { columnIndex, rowIndex, key, style } = cellProps
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

    let align = 'flex-start'
    if (col.align) align = col.align
    if (col.align === 'right') align = 'flex-end'

    if (col.renderHeader) {
      headerContent = col.renderHeader({ col, colIndex: columnIndex })
    }
    //
    else {
      headerContent = (
        <DefaultHeaderCell key={key} justifyContent={align}>
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
        </DefaultHeaderCell>
      )
    }

    if (rowIndex === 0) {
      return (
        <HeaderCell
          key={key}
          style={style}
          onClick={() => {
            onClickHeader && onClickHeader({ col, colIndex: columnIndex })
          }}
          className='header-cell'
          data-columnindex={columnIndex}
          data-columnkey={col.key}
          data-issortable={
            col.isSortable === undefined ? 'false' : col.isSortable
          }
        >
          {headerContent}
        </HeaderCell>
      )
    } else {
      let toRender: ReactNode = (
        <DefaultCell textAlign={col.align || 'left'}>
          {row[col.key]}
        </DefaultCell>
      )

      if (col.render) {
        const customRender = col.render({
          col,
          row,
          colIndex: columnIndex,
          rowIndex: rowIndex - 1
        })
        toRender = customRender
      } else if (col.transform) {
        toRender = (
          <DefaultCell key={key} textAlign={col.align || 'left'}>
            {col.transform({
              col,
              row,
              colIndex: columnIndex,
              rowIndex: rowIndex - 1
            })}
          </DefaultCell>
        )
      }

      const className = clsx('cell', {
        odd: (rowIndex - 1) % 2 !== 0,
        even: (rowIndex - 1) % 2 === 0,
        hover: hover.rowIndex === rowIndex
      })

      return (
        <Cell
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
        >
          {toRender}
        </Cell>
      )
    }
  }

  return cellRenderer
}

const Cell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  border-bottom: 1px solid #f3f2f1;
  box-sizing: border-box;
  &.hover {
    background-color: #f3f2f1;
  }
`

export const DefaultHeaderCell = styled.div<{ justifyContent: string }>`
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  justify-content: ${(p) => p.justifyContent};
`

export const DefaultCell = styled.div<{ textAlign: string }>`
  padding: 0 12px;
  height: 100%;
  line-height: 41px;
  text-align: ${(p) => p.textAlign};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const HeaderCell = styled.div`
  font-size: 14px;
  height: 100%;
  font-weight: 600;
  border-top: 1px solid rgb(237, 235, 233);
  border-bottom: 1px solid rgb(237, 235, 233);
  user-select: none;
  box-sizing: border-box;
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
