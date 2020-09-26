import clsx from 'clsx'
import { Spinner } from 'office-ui-fabric-react'
import React, { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { MultiGrid } from 'react-virtualized'
import styled from 'styled-components'
import { CustomDragLayer } from './CustomDragLayer'
import { DetailsListProps } from './types'
import { useCellRenderer } from './useCellRenderer'

export const dragTypes = {
  DETAILS_LIST_COLUMN_RESIZE: 'DETAILS_LIST_COLUMN_RESIZE'
}

export const DetailsList = ({
  cols,
  rows,
  width,
  height,
  sort,
  onClickHeader,
  onClickCell,
  bodyCellRenderer,
  headerCellRenderer,
  refMultiGrid,
  id,
  isLoading,
  noDataMessage,
  onResizeCol,
  ...props
}: DetailsListProps) => {
  const refGrid = useRef<MultiGrid | null>()
  const [{ item }, drop] = useDrop({
    canDrop: (item: any, monitor) => {
      const colWidth = item.col.width
      const diffClientOffset = monitor.getDifferenceFromInitialOffset()
      if (!diffClientOffset) return true
      const newWidth = colWidth + diffClientOffset.x
      if (newWidth < 20) return false
      return true
    },
    accept: dragTypes.DETAILS_LIST_COLUMN_RESIZE,
    collect: (monitor) => {
      return {
        item: monitor.getItem()
      }
    },
    drop: (item: any, monitor) => {
      const diffOffset = monitor.getDifferenceFromInitialOffset()
      if (!diffOffset) return
      onResizeCol &&
        onResizeCol({ col: item.col, colIndex: item.colIndex, ...diffOffset })
    }
  })

  const isDragging = item && item.type === dragTypes.DETAILS_LIST_COLUMN_RESIZE

  const cellRenderer = useCellRenderer({
    cols,
    rows,
    onClickHeader,
    sort,
    onClickCell,
    refGrid,
    onResizeCol
  })

  useEffect(() => {
    if (!refGrid.current) return
    refGrid.current.recomputeGridSize()
    refGrid.current.forceUpdateGrids()
  }, [width])

  useEffect(() => {
    if (!refGrid.current) return
    refGrid.current.recomputeGridSize()
    refGrid.current.forceUpdateGrids()
  }, [cols])

  return (
    <Root
      ref={drop}
      className={clsx({
        isDragging
      })}
    >
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
        height={height}
        columnCount={cols.length}
        rowCount={rows.length + 1}
        rowHeight={42}
        fixedRowCount={1}
        enableFixedColumnScroll
        hideBottomLeftGridScrollbar
        cellRenderer={cellRenderer}
        classNameTopLeftGrid='dl-top-left-grid'
        classNameTopRightGrid='dl-top-right-grid'
        classNameBottomRightGrid='dl-bottom-right-grid'
        classNameBottomLeftGrid='dl-bottom-left-grid'
        noContentRenderer={() => {
          if (isLoading) {
            return <StyledSpinner />
          }
          if (!isLoading) {
            return <NoRowsMessage>{noDataMessage}</NoRowsMessage>
          }
          return null
        }}
      />
      <CustomDragLayer />
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  &.isDragging {
    /* outline: 1px solid green; */
  }
`

const StyledSpinner = styled(Spinner)`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  .ms-Spinner-circle {
    width: 30px;
    height: 30px;
    border-width: 2.5px;
  }
`

const NoRowsMessage = styled.div`
  top: 50%;
  position: relative;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`
