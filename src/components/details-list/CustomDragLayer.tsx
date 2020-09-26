import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDragLayer } from 'react-dnd'
import styled from 'styled-components'
import { dragTypes } from './DetailsList'

export const CustomDragLayer = () => {
  const {
    clientOffset,
    initialClientOffset,
    isDragging,
    canDrop,
    item
  } = useDragLayer((monitor) => {
    let canDrop = true
    const item = monitor.getItem()
    if (item && item.col) {
      const colWidth = item.col.width
      const diffClientOffset = monitor.getDifferenceFromInitialOffset()
      if (diffClientOffset) {
        const newWidth = colWidth + diffClientOffset.x
        if (newWidth < 20) canDrop = false
      }
    }
    return {
      clientOffset: monitor.getClientOffset(),
      initialClientOffset: monitor.getInitialClientOffset(),
      isDragging: monitor.isDragging(),
      canDrop,
      item
    }
  })

  let isDraggingColumnResize =
    isDragging && item && item.type === dragTypes.DETAILS_LIST_COLUMN_RESIZE

  useEffect(() => {
    if (isDraggingColumnResize) {
      document.body.style.cursor = 'col-resize'
    }
    //
    else {
      document.body.style.cursor = 'unset'
    }
  }, [isDraggingColumnResize])

  if (!isDraggingColumnResize) {
    return null
  }

  let firstLineLeft = 0

  if (initialClientOffset && initialClientOffset.x && item && item.col) {
    firstLineLeft = initialClientOffset.x - item.col.width
  }

  return (
    <Root>
      <Line style={{ left: firstLineLeft }} />
      <Line
        style={{ left: clientOffset?.x }}
        className={clsx({ cantDrop: !canDrop })}
      />
    </Root>
  )
}

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`

export const Line = styled.div`
  width: 2px;
  height: 100%;
  background-color: #0078d4;
  position: absolute;
  cursor: col-resize;
  &.cantDrop {
    background: red;
  }
`
