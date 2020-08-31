import React, { useEffect, useRef } from 'react'
import { AutoSizer, MultiGrid } from 'react-virtualized'
import { useCellRenderer } from './useCellRenderer'
import { DetailsListProps } from './types'

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

  const cellRenderer = useCellRenderer({
    cols,
    rows,
    onClickHeader,
    sort,
    onClickCell,
    refGrid
  })

  useEffect(() => {
    if (!refGrid.current) return
    refGrid.current.recomputeGridSize()
    refGrid.current.forceUpdateGrids()
  }, [width])

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
