import clsx from 'clsx'
import React, { ReactNode, useEffect, useState } from 'react'
import { GridCellRenderer, MultiGrid } from 'react-virtualized'
import styled from 'styled-components'
import { HeaderCell } from './HeaderCell'
import {
  DetailsListColumn,
  DetailsListHoverState,
  DetailsListProps
} from './types'

type Props = {
  cols: DetailsListColumn[]
  rows: any[]
  sort: DetailsListProps['sort']
  onClickHeader: DetailsListProps['onClickHeader']
  onClickCell: DetailsListProps['onClickCell']
  refGrid: React.MutableRefObject<MultiGrid | null | undefined>
  onResizeCol?: DetailsListProps['onResizeCol']
}

export const useCellRenderer = ({
  cols,
  rows,
  sort,
  onClickHeader,
  onClickCell,
  refGrid,
  onResizeCol
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

    let align = 'flex-start'
    if (col.align) align = col.align
    if (col.align === 'right') align = 'flex-end'

    if (rowIndex === 0) {
      return (
        <HeaderCell
          key={key}
          col={col}
          sort={sort}
          onClickHeader={onClickHeader}
          gridCellProps={gridCellProps}
          columnIndex={columnIndex}
          onResizeCol={onResizeCol}
        />
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

const Truncate = styled.div.attrs({ className: 'truncate' })`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

// const Line = styled.div`
//   width: 2px;
//   height: 100%;
//   background-color: transparent;
// `

// const Resizer = styled.div`
//   width: 16px;
//   height: 100%;
//   position: absolute;
//   right: -8px;
//   z-index: 2;
//   cursor: col-resize;
//   display: flex;
//   justify-content: center;
//   &:hover {
//     ${Line} {
//       background-color: #0078d4;
//     }
//   }
//   &.react-draggable-dragging {
//     ${Line} {
//       background-color: #0078d4;
//     }
//   }
// `
