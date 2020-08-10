import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import {
  AutoSizer,
  GridCellRenderer,
  MultiGrid,
  MultiGridProps
} from 'react-virtualized'
import { FluentComponentsContext } from '../../FluentComponentsContext'
import { Cell, DefaultCell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { DetailsListColumn, DetailsListSortProp } from './types'

export type DetailsListProps = {
  cols: DetailsListColumn[]
  rows: any[]
  sort?: DetailsListSortProp
  onClickHeader?: (props: { col: DetailsListColumn; colIndex: number }) => void
  onClickCell?: (props: {
    col: DetailsListColumn
    row: any
    colIndex: number
    rowIndex: number
  }) => void
  bodyCellRenderer?: GridCellRenderer
  headerCellRenderer?: GridCellRenderer
  id: string
  refMultiGrid?: (ref: MultiGrid | null) => void
} & MultiGridProps

export const DetailsList = ({
  cols,
  rows,
  width,
  sort,
  onClickHeader,
  onClickCell,
  bodyCellRenderer,
  headerCellRenderer,
  refMultiGrid,
  id,
  ...props
}: DetailsListProps) => {
  const refGrid = useRef<MultiGrid | null>()
  const fabricTheme = useContext(FluentComponentsContext)

  useEffect(() => {
    if (!refGrid.current) return
    refGrid.current.recomputeGridSize()
    refGrid.current.forceUpdateGrids()
  }, [width])

  const cellRenderer: GridCellRenderer = (cellProps) => {
    const { columnIndex, rowIndex, key } = cellProps
    const col = cols[columnIndex]
    const row = rows[rowIndex - 1]

    if (rowIndex === 0) {
      return (
        <HeaderCell
          fabricTheme={fabricTheme}
          key={key}
          cellProps={cellProps}
          col={col}
          isLoading={false}
          sort={sort}
          onClick={() => {
            onClickHeader && onClickHeader({ col, colIndex: columnIndex })
          }}
        />
      )
    } else {
      let justifyContent = col.align || 'flex-start'
      if (col.align === 'right') {
        justifyContent = 'flex-end'
      }
      let toRender: ReactNode = (
        <DefaultCell justifyContent={justifyContent}>
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
          <DefaultCell justifyContent={justifyContent}>
            {col.transform({
              col,
              row,
              colIndex: columnIndex,
              rowIndex: rowIndex - 1
            })}
          </DefaultCell>
        )
      }
      return (
        <Cell
          fabricTheme={fabricTheme}
          key={key}
          cellProps={cellProps}
          onClick={() => {
            onClickCell &&
              onClickCell({ col, row, colIndex: columnIndex, rowIndex })
          }}
          col={col}
        >
          {toRender}
        </Cell>
      )
    }
  }

  return (
    <AutoSizer>
      {() => (
        <MultiGrid
          {...props}
          ref={(ref) => {
            refGrid.current = ref
            if (refMultiGrid) {
              refMultiGrid(ref)
            }
          }}
          id={id}
          width={width}
          columnCount={cols.length}
          rowCount={rows.length + 1}
          rowHeight={42}
          fixedRowCount={1}
          enableFixedColumnScroll
          hideBottomLeftGridScrollbar
          cellRenderer={cellRenderer}
        />
      )}
    </AutoSizer>
  )
}
